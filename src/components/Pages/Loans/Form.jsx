import React from 'react';
import axios from '../../../Lib/axios.js';
import { today } from '../../../Lib/format.js';

// Loan Create ar Edit duto page-ei ei form use kore
function LoanForm({ initial = {}, submitLabel, onSubmit, message }) {

  const [members, setMembers] = React.useState([]);
  const [values, setValues] = React.useState({
    member_id: initial.member_id ?? '',
    borrower_name: initial.borrower_name ?? '',
    borrower_phone: initial.borrower_phone ?? '',
    principal: initial.principal ?? '',
    interest_rate: initial.interest_rate ?? '',
    loan_date: initial.loan_date ?? today(),
    due_date: initial.due_date ?? '',
    note: initial.note ?? '',
  });

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

  return (
    <form onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger">{message}</div>}
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
        <input type="number" name="principal" min="0.01" step="0.01" value={values.principal} onChange={change} className="form-control" id="loanPrincipal" placeholder="Enter loan amount" required />
      </div>
      <div className="form-group">
        <label htmlFor="loanRate">Interest Rate (% per year, simple interest)</label>
        <input type="number" name="interest_rate" min="0" step="0.01" value={values.interest_rate} onChange={change} className="form-control" id="loanRate" placeholder="0 hole interest nei" />
      </div>
      <div className="form-group">
        <label htmlFor="loanDate">Loan Date</label>
        <input type="date" name="loan_date" value={values.loan_date} onChange={change} className="form-control" id="loanDate" required />
      </div>
      <div className="form-group">
        <label htmlFor="loanDue">Due Date (optional)</label>
        <input type="date" name="due_date" value={values.due_date} onChange={change} className="form-control" id="loanDue" />
      </div>
      <div className="form-group">
        <label htmlFor="loanNote">Note</label>
        <input type="text" name="note" value={values.note} onChange={change} className="form-control" id="loanNote" placeholder="Enter note (optional)" />
      </div>
      <button type="submit" className="btn btn-primary mt-3">{submitLabel}</button>
    </form>
  );
}

export default LoanForm;
