import React from 'react';
import { Link } from 'react-router';
import axios from '../../../Lib/axios.js';
import Layout from '../Layout.jsx';

function Savings() {

  const [savings, setSavings] = React.useState([]);
  const [totalSavings, setTotalSavings] = React.useState(0);
  const [search, setSearch] = React.useState('');

  async function fetchSavings() {
    try {
      const response = await axios.get('saving/index.php');
      const data = await response.data;
      setSavings(data.data || []);
      setTotalSavings(data.total_savings || 0);
    } catch (error) {
      console.error('Error fetching savings:', error);
    }
  }

  React.useEffect(() => {
    fetchSavings();
  }
, []);

  const money = (value) => '৳ ' + Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const filtered = savings.filter((item) =>
    (item.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (item.phone || '').includes(search)
  );

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Savings</h3>

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
          </ul>
        </div>

        {/* Total Savings */}
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="icon-big text-center bubble-shadow-small text-success me-3">
                    <i className="fas fa-piggy-bank fa-2x"></i>
                  </div>
                  <div>
                    <p className="card-category mb-1">Total Savings</p>
                    <h4 className="card-title mb-0">{money(totalSavings)}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="icon-big text-center bubble-shadow-small text-primary me-3">
                    <i className="fas fa-users fa-2x"></i>
                  </div>
                  <div>
                    <p className="card-category mb-1">Total Members</p>
                    <h4 className="card-title mb-0">{savings.length}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="row">
          <div className="col-md-12">

            <div className="card card-round">

              <div className="card-header">
                <div className="d-flex align-items-center">

                  <h4 className="card-title">Member Wise Savings</h4>

                  <Link to="/savings/create" className="btn btn-primary btn-round ms-auto"><i className="fa fa-plus"></i> &nbsp; Add Savings</Link>
                </div>
              </div>

              <div className="card-body">

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

                {/* Table */}
                <div className="table-responsive">

                  <table className="table table-hover">

                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Member ID</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Deposits</th>
                        <th>Last Deposit</th>
                        <th className="text-end">Total Savings</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {filtered.map((item, index) => (

                        <tr key={item.id}>

                          <td>{index + 1}</td>

                          <td>{item.id}</td>

                          <td>
                            <strong>{item.name}</strong>
                          </td>

                          <td>{item.phone}</td>

                          <td>{item.deposit_count}</td>

                          <td>{item.last_saving_date || '-'}</td>

                          <td className="text-end"><strong>{money(item.total_savings)}</strong></td>

                          <td>

                            <div className="form-button-action">

                              <Link to={`/savings/create?member_id=${item.id}`} className="btn btn-link btn-success" title="Add Savings">
                                <i className="fa fa-plus-circle"></i>
                              </Link>
                              <Link to={`/savings/member/${item.id}`} className="btn btn-link btn-primary" title="View History">
                                <i className="fa fa-eye"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot>
                      <tr>
                        <th colSpan="6" className="text-end">Total Savings</th>
                        <th className="text-end">{money(totalSavings)}</th>
                        <th></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
}

export default Savings;
