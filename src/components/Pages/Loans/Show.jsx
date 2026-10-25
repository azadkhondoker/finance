import React from 'react';
import { Link, useParams } from 'react-router';
import axios from '../../../Lib/axios.js';
import { money, today } from '../../../Lib/format.js';
import Layout from '../Layout.jsx';
import PageHeader from '../PageHeader.jsx';

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

  // Ferot (repayment) joma kora
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

  if (!detail) {
    return <Layout><div className="container"><div className="page-inner"><p>Loading...</p></div></div></Layout>;
  }

  const { loan, payments } = detail;
  const closed = detail.outstanding <= 0;

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
              <p className="card-category mb-1">Interest Received</p>
              <h4 className="card-title mb-0">{money(detail.paid_interest)}</h4>
            </div></div>
          </div>
        </div>

        <div className="row">
          {/* Loan info */}
          <div className="col-md-5">
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
                    <tr><th>Loan Date</th><td>{loan.loan_date}</td></tr>
                    <tr><th>Due Date</th><td>{loan.due_date || '-'}</td></tr>
                    <tr><th>Interest Rate</th><td>{Number(loan.interest_rate)}% per year</td></tr>
                    {detail.expected_interest !== null && (
                      <tr><th>Expected Interest</th><td>{money(detail.expected_interest)} <small className="text-muted">(till due date)</small></td></tr>
                    )}
                    {loan.note && <tr><th>Note</th><td>{loan.note}</td></tr>}
                  </tbody>
                </table>
                <Link to={`/loans/edit/${loan.id}`} className="btn btn-black btn-border btn-round mt-3">Edit Loan</Link>
              </div>
            </div>

            {/* Add repayment */}
            {!closed && (
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

          {/* Repayments */}
          <div className="col-md-7">
            <div className="card card-round">
              <div className="card-header"><h4 className="card-title">Repayments</h4></div>
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
                            <div className="form-button-action">
                              <button className="btn btn-link btn-danger" title="Delete" onClick={() => handleDelete(payment.id)}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
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
