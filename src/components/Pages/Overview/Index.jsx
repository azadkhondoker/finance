import React from 'react';
import { Link } from 'react-router';
import axios from '../../../Lib/axios.js';
import { money } from '../../../Lib/format.js';
import Layout from '../Layout.jsx';
import PageHeader from '../PageHeader.jsx';

function Overview() {

  const [overview, setOverview] = React.useState({});

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

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        <PageHeader title="Total Overview" crumbs={[{ label: 'Total Overview', to: '/overview' }]} />

        {/* Savings, Profit, Expense */}
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
                <small className="text-muted">Expense ei taka theke kate na</small><br />
                <Link to="/savings" className="btn btn-link ps-0 mt-2">View member savings</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="icon-big text-center bubble-shadow-small text-info me-3">
                    <i className="fas fa-chart-line fa-2x"></i>
                  </div>
                  <div>
                    <p className="card-category mb-1">Total Profit</p>
                    <h4 className="card-title mb-0">{money(overview.total_profit)}</h4>
                  </div>
                </div>
                <small className="text-muted">Loan interest {money(overview.interest_received)} + Asset profit {money(overview.asset_profit)}</small><br />
                <Link to="/investments" className="btn btn-link ps-0 mt-2">View investments</Link>
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
                <small className="text-muted">Profit theke adjust hoy</small><br />
                <Link to="/expenses" className="btn btn-link ps-0 mt-2">View expenses</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Net profit, Invested, Available */}
        <div className="row">
          <div className="col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="icon-big text-center bubble-shadow-small text-primary me-3">
                    <i className="fas fa-balance-scale fa-2x"></i>
                  </div>
                  <div>
                    <p className="card-category mb-1">Net Profit (After Expense)</p>
                    <h4 className={'card-title mb-0 ' + (overview.net_profit < 0 ? 'text-danger' : '')}>{money(overview.net_profit)}</h4>
                  </div>
                </div>
                <small className="text-muted">Total Profit - Total Expense</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Currently Invested</p>
                <h4 className="card-title mb-0">{money(overview.invested)}</h4>
                <small className="text-muted">Loan outstanding + Land, Business &amp; Gold</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Available Savings</p>
                <h4 className={'card-title mb-0 ' + (overview.available < 0 ? 'text-danger' : 'text-success')}>{money(overview.available)}</h4>
                <small className="text-muted">Total Savings + Net Profit - Invested</small>
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
