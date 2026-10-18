import React from 'react';
import { Link, useParams } from 'react-router';
import axios from '../../../Lib/axios.js';
import Layout from '../Layout.jsx';

function ReceiptMember() {

  let { id } = useParams();

  const [member, setMember] = React.useState({});
  const [receipts, setReceipts] = React.useState([]);
  const [totalSavings, setTotalSavings] = React.useState(0);

  React.useEffect(() => {
    async function fetchReceipts() {
      try {
        const response = await axios.get('saving/member.php?member_id=' + id);
        setMember(response.data.member || {});
        setReceipts(response.data.data || []);
        setTotalSavings(response.data.total_savings || 0);
      } catch (error) {
        console.error('Error fetching receipts:', error);
      }
    }
    fetchReceipts();
  }, [id]);

  const money = (value) => '৳ ' + Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Receipt number backend-er receipt.php er moto-i RCP-000012 format
  const receiptNo = (savingId) => 'RCP-' + String(savingId).padStart(6, '0');

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">{member.name} - Receipts</h3>

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
              <Link to="/receipts">Receipts</Link>
            </li>
            <li className="separator">
              <i className="icon-arrow-right"></i>
            </li>
            <li className="nav-item">
              <a href="#">{member.name}</a>
            </li>
          </ul>
        </div>

        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">{member.name} ({member.phone}) - Total Savings</p>
                <h4 className="card-title mb-0">{money(totalSavings)}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Receipt Cards */}
        <div className="row">
          {receipts.map((item) => (
            <div className="col-sm-6 col-lg-4" key={item.id}>
              <Link to={`/savings/receipt/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card card-round shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="fw-bold mb-0"><i className="fa fa-receipt text-success"></i> &nbsp; {receiptNo(item.id)}</h5>
                      <span className="text-muted">{item.saving_date}</span>
                    </div>
                    <h4 className="text-success fw-bold mb-2">{money(item.amount)}</h4>
                    <p className="text-muted mb-0">{item.note || 'No note'}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {receipts.length === 0 && <p className="text-muted">No receipts found.</p>}

        <Link to="/receipts" className="btn btn-black btn-border btn-round mt-2">Back</Link>

      </div>
    </div>
  </Layout>
  );
}

export default ReceiptMember;
