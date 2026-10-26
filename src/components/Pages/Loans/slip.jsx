import React from 'react';
import { Link, useParams } from 'react-router';
import axios from '../../../Lib/axios.js';
import { money } from '../../../Lib/format.js';
import { ORG_NAME, whatsappUrl } from '../../../Lib/org.js';
import Layout from '../Layout.jsx';

function LoanSlip() {

  let { id } = useParams();

  const [slip, setSlip] = React.useState(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    async function fetchSlip() {
      try {
        const response = await axios.get('loan_installment/slip.php?id=' + id);
        if (response.data.status) {
          setSlip(response.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Error fetching slip:', err);
      }
    }
    fetchSlip();
  }, [id]);

  // Je user login kore ache tar naam (login-er shomoy localStorage e rakha hoy)
  let receivedBy = '';
  try {
    receivedBy = JSON.parse(localStorage.getItem('userdata') || '{}').name || '';
  } catch (err) {
    receivedBy = '';
  }

  // WhatsApp-e Tk likha hoy, karon ৳ kokhono kokhono bhenge jay
  const tk = (value) => money(value).replace('৳', 'Tk');

  function buildMessage() {
    const { installment, loan } = slip;
    const lines = [
      `*${ORG_NAME} - Loan Installment Paid Slip*`,
      `Slip No: ${slip.slip_no}`,
      `Paid Date: ${installment.paid_date}`,
      `Borrower: ${loan.borrower_name}`,
      `Installment: ${installment.installment_no} of ${slip.installment_total} (Due: ${installment.due_date})`,
      `Principal: ${tk(slip.principal_part)}`,
      `Interest: ${tk(slip.interest_part)}`,
    ];
    if (slip.penalty_paid > 0) {
      lines.push(`Late Penalty: ${tk(slip.penalty_paid)}`);
    }
    lines.push(`*Total Paid: ${tk(slip.total_paid)}*`);
    lines.push(`Loan Balance: ${tk(slip.outstanding_after)}`);
    if (slip.next_due_date) {
      lines.push(`Next Due Date: ${slip.next_due_date}`);
    }
    lines.push('', 'Thank you.');
    return lines.join('\n');
  }

  function handleWhatsApp() {
    window.open(whatsappUrl(slip.loan.borrower_phone, buildMessage()), '_blank');
  }

  return (
    <Layout>
    {/* Print korle sidebar, header, footer ar button lukiye shudhu slip print hobe */}
    <style>{`
      @media print {
        .sidebar-menu, .header-area, .footer-area, .no-print { display: none !important; }
        .page-container { padding-left: 0 !important; }
        .main-content, body { background: #fff !important; }
        .receipt-card { box-shadow: none !important; border: 1px solid #000 !important; }
      }
    `}</style>
    <div className="container">
      <div className="page-inner">

        <div className="page-header no-print">
          <h3 className="fw-bold mb-3">Installment Paid Slip</h3>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {!slip && !error && <p>Loading slip...</p>}

        {slip && (
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">

            <div className="no-print mb-3 d-flex gap-2 flex-wrap">
              <button className="btn btn-primary btn-round" onClick={() => window.print()}>
                <i className="fa fa-print"></i> &nbsp; Print
              </button>
              <button className="btn btn-success btn-round" onClick={handleWhatsApp}>
                <i className="fa-brands fa-whatsapp"></i> &nbsp; Share on WhatsApp
              </button>
              <Link to={`/loans/${slip.loan.id}`} className="btn btn-black btn-border btn-round ms-auto">Back</Link>
            </div>

            <div className="card card-round receipt-card">
              <div className="card-body">

                <div className="text-center mb-3">
                  <h3 className="fw-bold mb-1">{ORG_NAME}</h3>
                  <h5 className="text-muted mb-2">Loan Installment Paid Slip</h5>
                  <span className="badge bg-success fs-6">PAID</span>
                  {slip.days_late > 0 && <span className="badge bg-danger fs-6 ms-1">{slip.days_late} din deri-te</span>}
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span><strong>Slip No:</strong> {slip.slip_no}</span>
                  <span><strong>Paid Date:</strong> {slip.installment.paid_date}</span>
                </div>

                <table className="table table-borderless mt-3">
                  <tbody>
                    <tr>
                      <th style={{ width: '40%' }}>Borrower</th>
                      <td>{slip.loan.borrower_name}</td>
                    </tr>
                    {slip.loan.borrower_phone && (
                      <tr>
                        <th>Phone Number</th>
                        <td>{slip.loan.borrower_phone}</td>
                      </tr>
                    )}
                    <tr>
                      <th>Loan Amount</th>
                      <td>{money(slip.loan.principal)} <small className="text-muted">(issued {slip.loan.loan_date})</small></td>
                    </tr>
                    <tr>
                      <th>Installment</th>
                      <td>{slip.installment.installment_no} of {slip.installment_total}</td>
                    </tr>
                    <tr>
                      <th>Due Date</th>
                      <td>{slip.installment.due_date}</td>
                    </tr>
                  </tbody>
                </table>

                <hr />

                <div className="d-flex justify-content-between mb-1">
                  <span>Principal</span>
                  <span>{money(slip.principal_part)}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span>Interest</span>
                  <span>{money(slip.interest_part)}</span>
                </div>
                {slip.penalty_paid > 0 && (
                  <div className="d-flex justify-content-between mb-1 text-danger">
                    <span>Late Penalty</span>
                    <span>{money(slip.penalty_paid)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="fs-5">Total Paid</span>
                  <span className="fs-4 fw-bold text-success">{money(slip.total_paid)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-1">
                  <span>Installments Paid</span>
                  <strong>{slip.installments_paid} / {slip.installment_total}</strong>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span>Loan Balance (after this payment)</span>
                  <strong>{money(slip.outstanding_after)}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Next Due Date</span>
                  <strong>{slip.next_due_date || 'Loan fully paid'}</strong>
                </div>

                <hr />

                <div className="d-flex justify-content-between mt-4 pt-3">
                  <span>{receivedBy && <>Received by: <strong>{receivedBy}</strong></>}</span>
                  <span>Signature: ____________</span>
                </div>

                <p className="text-center text-muted mt-4 mb-0">Thank you.</p>
              </div>
            </div>
          </div>
        </div>
        )}

      </div>
    </div>
  </Layout>
  );
}

export default LoanSlip;
