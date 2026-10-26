import React from 'react';
import axios from '../../../Lib/axios.js';
import { money, today } from '../../../Lib/format.js';
import { REPAYMENT_TYPES, previewSchedule, monthYear } from '../../../Lib/loanSchedule.js';

// Loan Create ar Edit duto page-ei ei form use kore
// flags.has_schedule / flags.schedule_locked (Edit-er jonno): kisti ekbar paid hole shorto lock hoye jay
function LoanForm({ initial = {}, flags = {}, submitLabel, onSubmit, message }) {

  const [members, setMembers] = React.useState([]);
  const [values, setValues] = React.useState({
    member_id: initial.member_id ?? '',
    borrower_name: initial.borrower_name ?? '',
    borrower_phone: initial.borrower_phone ?? '',
    principal: initial.principal ?? '',
    interest_rate: initial.interest_rate ?? '',
    loan_date: initial.loan_date ?? today(),
    duration_months: initial.duration_months ?? '',
    repayment_type: initial.repayment_type ?? 'monthly',
    penalty_rate: initial.penalty_rate ?? '',
    note: initial.note ?? '',
  });

  // Kisti-wala loan-e kisti paid hole taka, interest, tarikh, mash, dhoron bodlano jay na
  const termsLocked = !!(flags.has_schedule && flags.schedule_locked);
  // Purono (kisti chhara) loan-e ferot thakle notun kore kisti-r schedule jug kora jay na
  const scheduleLocked = !!(flags.schedule_locked && !flags.has_schedule);

  React.useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get('member/index.php');
        setMembers(response.data.data || []);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    }
    fetchMembers();
  }, []);

  const change = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  // Member select korle tar name ar phone automatic boshe jay
  function selectMember(e) {
    const member = members.find((m) => String(m.id) === e.target.value);
    setValues({
      ...values,
      member_id: e.target.value,
      borrower_name: member ? member.name : values.borrower_name,
      borrower_phone: member ? member.phone : values.borrower_phone,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  const preview = previewSchedule(values.principal, values.interest_rate, values.duration_months, values.repayment_type, values.loan_date);
  const typeLabel = (REPAYMENT_TYPES.find((t) => t.value === values.repayment_type) || {}).label;

  return (
    <form onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger">{message}</div>}
      {termsLocked && (
        <div className="alert alert-warning">Kisti paid hoye geche, tai taka, interest, tarikh, mash ar kisti-r dhoron bodlano jabe na. Naam, phone ar note bodlano jabe.</div>
      )}
      <div className="form-group">
        <label htmlFor="loanMember">Member (optional - member hole select koro)</label>
        <select name="member_id" className="form-control" id="loanMember" value={values.member_id} onChange={selectMember}>
          <option value="">Not a member / type below</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>{member.name} ({member.phone})</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="loanName">Borrower Name</label>
        <input type="text" name="borrower_name" value={values.borrower_name} onChange={change} className="form-control" id="loanName" placeholder="Enter borrower name" required />
      </div>
      <div className="form-group">
        <label htmlFor="loanPhone">Borrower Phone</label>
        <input type="tel" name="borrower_phone" value={values.borrower_phone} onChange={change} className="form-control" id="loanPhone" placeholder="Enter phone number" />
      </div>
      <div className="form-group">
        <label htmlFor="loanPrincipal">Loan Amount (৳)</label>
        <input type="number" name="principal" min="0.01" step="0.01" value={values.principal} onChange={change} disabled={termsLocked} className="form-control" id="loanPrincipal" placeholder="Enter loan amount" required />
      </div>
      <div className="form-group">
        <label htmlFor="loanRate">Interest Rate (% per year, simple interest)</label>
        <input type="number" name="interest_rate" min="0" step="0.01" value={values.interest_rate} onChange={change} disabled={termsLocked} className="form-control" id="loanRate" placeholder="0 hole interest nei" />
      </div>
      <div className="form-group">
        <label htmlFor="loanDate">Loan Issue Date</label>
        <input type="date" name="loan_date" value={values.loan_date} onChange={change} disabled={termsLocked} className="form-control" id="loanDate" required />
      </div>
      <div className="form-group">
        <label htmlFor="loanMonths">Loan Duration (months)</label>
        <input type="number" name="duration_months" min="1" step="1" value={values.duration_months} onChange={change} disabled={termsLocked || scheduleLocked} className="form-control" id="loanMonths" placeholder="Koto mash-er jonno loan" required={!termsLocked && !scheduleLocked} />
      </div>
      <div className="form-group">
        <label htmlFor="loanType">Installment Type</label>
        <select name="repayment_type" value={values.repayment_type} onChange={change} disabled={termsLocked || scheduleLocked} className="form-control" id="loanType">
          {REPAYMENT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="loanPenalty">Late Penalty Rate (% per year)</label>
        <input type="number" name="penalty_rate" min="0" step="0.01" value={values.penalty_rate} onChange={change} disabled={termsLocked || scheduleLocked} className="form-control" id="loanPenalty" placeholder="Faka rakhle interest rate-er soman" />
        <small className="text-muted">Kisti-r shomoy ses hoye gele, deri-r protidin-er jonno kisti-r amount-er upor ei har-e jorimana jug hobe.</small>
      </div>
      <div className="form-group">
        <label htmlFor="loanNote">Note</label>
        <input type="text" name="note" value={values.note} onChange={change} className="form-control" id="loanNote" placeholder="Enter note (optional)" />
      </div>

      {/* Auto hishab: koto kisti, kisti-r amount, kon mashe loan shesh */}
      {preview && !scheduleLocked && (
        <div className="card card-round bg-light mt-3">
          <div className="card-body">
            <h5 className="fw-bold">Installment Preview</h5>
            <div className="row">
              <div className="col-md-3"><small className="text-muted">Total Interest</small><br /><strong>{money(preview.totalInterest)}</strong></div>
              <div className="col-md-3"><small className="text-muted">Total Payable</small><br /><strong>{money(preview.totalPayable)}</strong></div>
              <div className="col-md-3"><small className="text-muted">Installments</small><br /><strong>{preview.count} x {money(preview.installment)}</strong><br /><small className="text-muted">{typeLabel}</small></div>
              <div className="col-md-3"><small className="text-muted">Loan Ends</small><br /><strong>{monthYear(preview.payoffDate)}</strong><br /><small className="text-muted">{preview.payoffDate}</small></div>
            </div>
          </div>
        </div>
      )}

      <button type="submit" className="btn btn-primary mt-3">{submitLabel}</button>
    </form>
  );
}

export default LoanForm;
