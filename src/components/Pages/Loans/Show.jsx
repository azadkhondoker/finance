import React from 'react';
import { Link, useParams } from 'react-router';
import axios from '../../../Lib/axios.js';
import { money, today } from '../../../Lib/format.js';
import { REPAYMENT_TYPES, monthYear } from '../../../Lib/loanSchedule.js';
import Layout from '../Layout.jsx';
import PageHeader from '../PageHeader.jsx';

// Kisti-r status badge: Paid / Due / Out of Time
const STATUS = {
  paid: { label: 'Paid', className: 'bg-success' },
  due: { label: 'Due', className: 'bg-warning' },
  out_of_time: { label: 'Out of Time', className: 'bg-danger' },
};

function LoanShow() {

  let { id } = useParams();

  const [detail, setDetail] = React.useState(null);
  const [message, setMessage] = React.useState('');
  const [form, setForm] = React.useState({ principal_amount: '', interest_amount: '', payment_date: today(), note: '' });

  async function fetchDetail() {
    try {
      const response = await axios.get('loan/detail.php?id=' + id);
      if (response.data.status) {
        setDetail(response.data);
      }
    } catch (error) {
      console.error('Error fetching loan:', error);
    }
  }

  React.useEffect(() => {
    fetchDetail();
  }
, [id]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Purono (kisti chhara) loan-e ferot (repayment) joma kora
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('loan_id', id);
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    const response = await axios.post('loan_payment/create.php', formData);
    if (response.data.status === false) {
      setMessage(response.data.message);
      return;
    }
    setMessage('');
    setForm({ principal_amount: '', interest_amount: '', payment_date: today(), note: '' });
    await fetchDetail();
  }

  async function handleDelete(paymentId) {
    if (window.confirm("Are you sure you want to delete this repayment?")) {
      try {
        await axios.delete(`loan_payment/delete.php?id=${paymentId}`);
        await fetchDetail();
      } catch (error) {
        console.error('Error deleting repayment:', error);
      }
    }
  }

  // Kisti paid kora (deri hole jorimana shoho)
  async function handlePay(installment) {
    const text = installment.penalty > 0
      ? `Installment #${installment.installment_no}: ${money(installment.installment_amount)} + penalty ${money(installment.penalty)} = ${money(installment.payable)}. Mark as paid?`
      : `Installment #${installment.installment_no}: ${money(installment.payable)}. Mark as paid?`;
    if (window.confirm(text)) {
      try {
        const response = await axios.post(`loan_installment/pay.php?id=${installment.id}`);
        if (response.data.status === false) {
          setMessage(response.data.message);
          await fetchDetail();
          return;
        }
        // Paid hoye gele shorashori slip page-e niye jay (print / WhatsApp share-er jonno)
        window.location.href = '/loans/slip/' + installment.id;
      } catch (error) {
        console.error('Error paying installment:', error);
      }
    }
  }

  async function handleUndo(installment) {
    if (window.confirm(`Installment #${installment.installment_no} abar Due kore dibe?`)) {
      try {
        await axios.post(`loan_installment/undo.php?id=${installment.id}`);
        await fetchDetail();
      } catch (error) {
        console.error('Error undoing installment:', error);
      }
    }
  }

  if (!detail) {
    return <Layout><div className="container"><div className="page-inner"><p>Loading...</p></div></div></Layout>;
  }

  const { loan, payments, installments } = detail;
  const closed = detail.outstanding <= 0;
  const typeLabel = (REPAYMENT_TYPES.find((t) => t.value === loan.repayment_type) || {}).label;

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        <PageHeader title="Loan Details" crumbs={[{ label: 'Investments', to: '/investments' }, { label: 'Loans', to: '/loans' }, { label: loan.borrower_name }]} />

        {/* Summary */}
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <div className="card card-round"><div className="card-body">
              <p className="card-category mb-1">Loan Amount</p>
              <h4 className="card-title mb-0">{money(loan.principal)}</h4>
            </div></div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-round"><div className="card-body">
              <p className="card-category mb-1">Repaid (principal)</p>
              <h4 className="card-title mb-0">{money(detail.paid_principal)}</h4>
            </div></div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-round"><div className="card-body">
              <p className="card-category mb-1">Outstanding</p>
              <h4 className="card-title mb-0">{money(detail.outstanding)}</h4>
            </div></div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-round"><div className="card-body">
              <p className="card-category mb-1">Interest &amp; Penalty Received</p>
              <h4 className="card-title mb-0">{money(detail.paid_interest)}</h4>
            </div></div>
          </div>
        </div>

        <div className="row">
          {/* Loan info */}
          <div className="col-md-4">
            <div className="card card-round">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">{loan.borrower_name}</h4>
                  <span className={'badge ms-auto ' + (closed ? 'bg-success' : 'bg-warning')}>{closed ? 'Closed' : 'Active'}</span>
                </div>
              </div>
              <div className="card-body">
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr><th>Phone</th><td>{loan.borrower_phone || '-'}</td></tr>
                    <tr><th>Issue Date</th><td>{loan.loan_date}</td></tr>
                    {detail.has_schedule && (
                      <>
                        <tr><th>Duration</th><td>{loan.duration_months} months</td></tr>
                        <tr><th>Installments</th><td>{detail.installment_count} ({typeLabel})</td></tr>
                        <tr><th>Loan Ends</th><td>{monthYear(loan.due_date)} <small className="text-muted">({loan.due_date})</small></td></tr>
                      </>
                    )}
                    {!detail.has_schedule && <tr><th>Due Date</th><td>{loan.due_date || '-'}</td></tr>}
                    <tr><th>Interest Rate</th><td>{Number(loan.interest_rate)}% per year</td></tr>
                    {detail.has_schedule && <tr><th>Penalty Rate</th><td>{Number(detail.penalty_rate)}% per year</td></tr>}
                    {detail.expected_interest !== null && (
                      <tr><th>Total Interest</th><td>{money(detail.expected_interest)}</td></tr>
                    )}
                    {detail.total_payable !== null && (
                      <tr><th>Total Payable</th><td><strong>{money(detail.total_payable)}</strong></td></tr>
                    )}
                    {loan.note && <tr><th>Note</th><td>{loan.note}</td></tr>}
                  </tbody>
                </table>
                <Link to={`/loans/edit/${loan.id}`} className="btn btn-black btn-border btn-round mt-3">Edit Loan</Link>
              </div>
            </div>

            {/* Kisti chhara purono loan-e ferot add */}
            {!detail.has_schedule && !closed && (
            <div className="card card-round">
              <div className="card-header"><h4 className="card-title">Add Repayment</h4></div>
              <div className="card-body">
                {message && <div className="alert alert-danger">{message}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="payPrincipal">Principal Received (৳)</label>
                    <input type="number" name="principal_amount" min="0" step="0.01" value={form.principal_amount} onChange={change} className="form-control" id="payPrincipal" placeholder="Mul taka ferot" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="payInterest">Interest Received (৳)</label>
                    <input type="number" name="interest_amount" min="0" step="0.01" value={form.interest_amount} onChange={change} className="form-control" id="payInterest" placeholder="Interest hishebe pawa" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="payDate">Date</label>
                    <input type="date" name="payment_date" value={form.payment_date} onChange={change} className="form-control" id="payDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="payNote">Note</label>
                    <input type="text" name="note" value={form.note} onChange={change} className="form-control" id="payNote" placeholder="Enter note (optional)" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Add Repayment</button>
                </form>
              </div>
            </div>
            )}
          </div>

          <div className="col-md-8">

            {/* Installment schedule */}
            {detail.has_schedule && (
            <div className="card card-round">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">Installments ({detail.paid_count}/{detail.installment_count} paid)</h4>
                  {detail.overdue_count > 0 && (
                    <span className="badge bg-danger ms-auto">{detail.overdue_count} Out of Time - penalty {money(detail.overdue_penalty)}</span>
                  )}
                </div>
              </div>
              <div className="card-body">
                {message && <div className="alert alert-danger">{message}</div>}
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Due Date</th>
                        <th className="text-end">Principal</th>
                        <th className="text-end">Interest</th>
                        <th className="text-end">Installment</th>
                        <th className="text-end">Penalty</th>
                        <th className="text-end">Payable</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {installments.map((item) => {
                        const status = STATUS[item.status_label];
                        return (
                        <tr key={item.id}>
                          <td>{item.installment_no}</td>
                          <td>{item.due_date}</td>
                          <td className="text-end">{money(item.principal_part)}</td>
                          <td className="text-end">{money(item.interest_part)}</td>
                          <td className="text-end">{money(item.installment_amount)}</td>
                          <td className={'text-end ' + (item.penalty > 0 ? 'text-danger' : '')}>
                            {item.penalty > 0 ? money(item.penalty) : '-'}
                            {item.status !== 'paid' && item.days_late > 0 && <><br /><small>{item.days_late} din deri</small></>}
                          </td>
                          <td className="text-end"><strong>{money(item.payable)}</strong></td>
                          <td>
                            <span className={'badge ' + status.className}>{status.label}</span>
                            {item.status === 'paid' && <><br /><small className="text-muted">{item.paid_date}</small></>}
                          </td>
                          <td>
                            {item.status !== 'paid' ? (
                              <button className="btn btn-sm btn-success btn-round" onClick={() => handlePay(item)}>Mark Paid</button>
                            ) : (
                              <div className="form-button-action">
                                <Link to={`/loans/slip/${item.id}`} className="btn btn-link btn-success" title="Paid Slip">
                                  <i className="fa fa-receipt"></i>
                                </Link>
                                <button className="btn btn-link btn-danger" title="Undo" onClick={() => handleUndo(item)}>
                                  <i className="fa fa-rotate-left"></i>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            )}

            {/* Repayments */}
            <div className="card card-round">
              <div className="card-header"><h4 className="card-title">Repayments Received</h4></div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th className="text-end">Principal</th>
                        <th className="text-end">Interest</th>
                        <th>Note</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment, index) => (
                        <tr key={payment.id}>
                          <td>{index + 1}</td>
                          <td>{payment.payment_date}</td>
                          <td className="text-end">{money(payment.principal_amount)}</td>
                          <td className="text-end">{money(payment.interest_amount)}</td>
                          <td>{payment.note}</td>
                          <td>
                            {!payment.installment_id && (
                              <div className="form-button-action">
                                <button className="btn btn-link btn-danger" title="Delete" onClick={() => handleDelete(payment.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan="2" className="text-end">Total</th>
                        <th className="text-end">{money(detail.paid_principal)}</th>
                        <th className="text-end">{money(detail.paid_interest)}</th>
                        <th colSpan="2"></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link to="/loans" className="btn btn-black btn-border btn-round mt-2">Back</Link>

      </div>
    </div>
  </Layout>
  );
}

export default LoanShow;
