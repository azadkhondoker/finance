import React from 'react';
import { Link } from 'react-router';
import axios from '../../../Lib/axios.js';
import Layout from '../Layout.jsx';

function Overview() {

  const [overview, setOverview] = React.useState({ total_savings: 0, total_expense: 0, balance: 0 });

  async function fetchOverview() {
    try {
      const response = await axios.get('overview/index.php');
      setOverview(response.data);
    } catch (error) {
      console.error('Error fetching overview:', error);
    }
  }

  React.useEffect(() => {
    fetchOverview();
  }
, []);

  const money = (value) => '৳ ' + Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Total Overview</h3>

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
              <Link to="/overview">Total Overview</Link>
            </li>
          </ul>
        </div>

        {/* Cards */}
        <div className="viewCards">
            <div className="row">
          
          <div className="col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="icon-big text-center bubble-shadow-small text-success me-3">
                    <i className="fas fa-piggy-bank fa-2x"></i>
                  </div>
                  <div>
                    <p className="card-category mb-1">Total Savings</p>
                    <h4 className="card-title mb-0">{money(overview.total_savings)}</h4>
                  </div>
                </div>
                <Link to="/savings" className="btn btn-link ps-0 mt-2">View member savings</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="icon-big text-center bubble-shadow-small text-danger me-3">
                    <i className="fas fa-wallet fa-2x"></i>
                  </div>
                  <div>
                    <p className="card-category mb-1">Total Expense</p>
                    <h4 className="card-title mb-0">{money(overview.total_expense)}</h4>
                  </div>
                </div>
                <Link to="/expenses" className="btn btn-link ps-0 mt-2">View expenses</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="icon-big text-center bubble-shadow-small text-primary me-3">
                    <i className="fas fa-balance-scale fa-2x"></i>
                  </div>
                  <div>
                    <p className="card-category mb-1">Savings After Expense</p>
                    <h4 className={'card-title mb-0 ' + (overview.balance < 0 ? 'text-danger' : '')}>{money(overview.balance)}</h4>
                  </div>
                </div>
                <p className="text-muted mt-2 mb-0">Total Savings - Total Expense</p>
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

export default Overview;
