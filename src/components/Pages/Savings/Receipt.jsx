import React from 'react';
import { Link, useParams } from 'react-router';
import axios from '../../../Lib/axios.js';
import Layout from '../Layout.jsx';

// Receipt-er upore je naam dekhabe, eta tomar somitir naam diye bodle nao
const ORG_NAME = 'Finance';

function SavingReceipt() {

  let { id } = useParams();

  const [receipt, setReceipt] = React.useState(null);

  React.useEffect(() => {
    async function fetchReceipt() {
      try {
        const response = await axios.get('saving/receipt.php?id=' + id);
        if (response.data.status) {
          setReceipt(response.data);
        }
      } catch (error) {
        console.error('Error fetching receipt:', error);
      }
    }
    fetchReceipt();
  }, [id]);

  const money = (value) => 'Tk ' + Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Je user login kore ache tar naam (login-er shomoy localStorage e rakha hoy)
  let receivedBy = '';
  try {
    receivedBy = JSON.parse(localStorage.getItem('userdata') || '{}').name || '';
  } catch (error) {
    receivedBy = '';
  }

  function buildMessage() {
    const { saving, member, receipt_no, balance_after } = receipt;
    const lines = [
      `*${ORG_NAME} - Savings Receipt*`,
      `Receipt No: ${receipt_no}`,
      `Date: ${saving.saving_date}`,
      `Member: ${member.name} (ID: ${member.id})`,
      `Amount Deposited: ${money(saving.amount)}`,
      `Total Savings: ${money(balance_after)}`
    ];
    if (saving.note) {
      lines.push(`Note: ${saving.note}`);
    }
    lines.push('', 'Thank you.');
    return lines.join('\n');
  }

  function handleWhatsApp() {
    // Bangladesh number (01XXXXXXXXX) ke 8801XXXXXXXXX banaye member-er number-e shorashori pathano hoy
    let phone = (receipt.member.phone || '').replace(/\D/g, '');
    if (phone.startsWith('01') && phone.length === 11) {
      phone = '88' + phone;
    }
    const base = phone.length >= 11 ? `https://wa.me/${phone}` : 'https://wa.me/';
    window.open(`${base}?text=${encodeURIComponent(buildMessage())}`, '_blank');
  }

  return (
    <Layout>
    {/* Print korle sidebar, header, footer ar button lukiye shudhu receipt print hobe */}
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

        {/* Page Header */}
        <div className="page-header no-print">
          <h3 className="fw-bold mb-3">Savings Receipt</h3>

          <ul className="breadcrumbs mb-3">
            <li className="nav-home">
              <Link to="/dashboard">
                <i className="icon-home"></i>
              </Link>
            </li>

            <li className="separator">
              <i className="icon-arrow-right"></i>
            </li>
            <li className="nav-item">
              <Link to="/savings">Savings</Link>
            </li>
            <li className="separator">
              <i className="icon-arrow-right"></i>
            </li>
            <li className="nav-item">
              <a href="#">Receipt</a>
            </li>
          </ul>
        </div>

        {!receipt && <p>Loading receipt...</p>}

        {receipt && (
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">

            <div className="no-print mb-3 d-flex gap-2 flex-wrap">
              <button className="btn btn-primary btn-round" onClick={() => window.print()}>
                <i className="fa fa-print"></i> &nbsp; Print
              </button>
              <button className="btn btn-success btn-round" onClick={handleWhatsApp}>
                <i className="fa-brands fa-whatsapp"></i> &nbsp; Share on WhatsApp
              </button>
              <Link to={`/receipts/member/${receipt.member.id}`} className="btn btn-black btn-border btn-round ms-auto">Back</Link>
            </div>

            <div className="card card-round receipt-card">
              <div className="card-body">

                <div className="text-center mb-3">
                  <h3 className="fw-bold mb-1">{ORG_NAME}</h3>
                  <h5 className="text-muted mb-0">Savings Receipt</h5>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span><strong>Receipt No:</strong> {receipt.receipt_no}</span>
                  <span><strong>Date:</strong> {receipt.saving.saving_date}</span>
                </div>
                {receipt.saving.created_at && (
                  <div className="mb-2 text-muted">Recorded at: {receipt.saving.created_at}</div>
                )}

                <table className="table table-borderless mt-3">
                  <tbody>
                    <tr>
                      <th style={{ width: '40%' }}>Member Name</th>
                      <td>{receipt.member.name}</td>
                    </tr>
                    <tr>
                      <th>Member ID</th>
                      <td>{receipt.member.id}</td>
                    </tr>
                    <tr>
                      <th>Phone Number</th>
                      <td>{receipt.member.phone}</td>
                    </tr>
                    {receipt.saving.note && (
                      <tr>
                        <th>Note</th>
                        <td>{receipt.saving.note}</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fs-5">Amount Deposited</span>
                  <span className="fs-4 fw-bold text-success">{money(receipt.saving.amount)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Total Savings (after this deposit)</span>
                  <strong>{money(receipt.balance_after)}</strong>
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

export default SavingReceipt;
