import React from 'react';
import { Link } from 'react-router';
import axios from '../../../Lib/axios.js';
import Layout from '../Layout.jsx';

function Receipts() {

  const [members, setMembers] = React.useState([]);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get('saving/index.php');
        // Shudhu je member-er kamot ekta joma (receipt) ache
        setMembers((response.data.data || []).filter((item) => Number(item.deposit_count) > 0));
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    }
    fetchMembers();
  }, []);

  const money = (value) => '৳ ' + Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const filtered = members.filter((item) =>
    (item.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (item.phone || '').includes(search)
  );

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Receipts</h3>

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
          </ul>
        </div>

        {/* Search */}
        <div className="row mb-3">
          <div className="col-md-4">
            <div className="input-icon">
              <input
                type="text"
                className="form-control"
                placeholder="Search member..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="input-icon-addon">
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
        </div>

        {/* Member Cards */}
        <div className="row">
          {filtered.map((item) => (
            <div className="col-sm-6 col-lg-4" key={item.id}>
              <Link to={`/receipts/member/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card card-round shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon-big text-center bubble-shadow-small text-primary me-3">
                        <i className="fas fa-user fa-2x"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">{item.name}</h5>
                        <p className="text-muted mb-0">{item.phone}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <span>Receipts</span>
                      <strong>{item.deposit_count}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Total Savings</span>
                      <strong>{money(item.total_savings)}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Last Receipt</span>
                      <strong>{item.last_saving_date || '-'}</strong>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && <p className="text-muted">No receipts found.</p>}

      </div>
    </div>
  </Layout>
  );
}

export default Receipts;
