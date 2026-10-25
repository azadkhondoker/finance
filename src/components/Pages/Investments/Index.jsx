import React from 'react';
import { Link } from 'react-router';
import axios from '../../../Lib/axios.js';
import { money } from '../../../Lib/format.js';
import Layout from '../Layout.jsx';
import PageHeader from '../PageHeader.jsx';

function Investments() {

  const [data, setData] = React.useState({});

  React.useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await axios.get('invest/index.php');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching investments:', error);
      }
    }
    fetchSummary();
  }, []);

  const assetCards = [
    { key: 'land', label: 'Land (Jomi)', icon: 'fa-mountain-sun', value: data.asset_land },
    { key: 'business', label: 'Business (Beboshay)', icon: 'fa-shop', value: data.asset_business },
    { key: 'gold', label: 'Gold', icon: 'fa-ring', value: data.asset_gold },
  ];

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        <PageHeader title="Investments" crumbs={[{ label: 'Investments', to: '/investments' }]} />

        {/* Summary */}
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Available Savings</p>
                <h4 className={'card-title mb-0 ' + (data.available < 0 ? 'text-danger' : 'text-success')}>{money(data.available)}</h4>
                <small className="text-muted">Savings + Net Profit - Invested</small>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Currently Invested</p>
                <h4 className="card-title mb-0">{money(data.invested)}</h4>
                <small className="text-muted">Loan outstanding + Active assets</small>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Interest Received</p>
                <h4 className="card-title mb-0">{money(data.interest_received)}</h4>
                <small className="text-muted">From loan repayments</small>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Asset Profit / Loss</p>
                <h4 className={'card-title mb-0 ' + (data.asset_profit < 0 ? 'text-danger' : '')}>{money(data.asset_profit)}</h4>
                <small className="text-muted">From sold assets</small>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Loan */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">1. Loan (Loan Deya)</h4>
                  <Link to="/loans/create" className="btn btn-primary btn-round ms-auto"><i className="fa fa-plus"></i> &nbsp; Give Loan</Link>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="card-category mb-1">Loan Outstanding (baki mul taka)</p>
                    <h4 className="card-title mb-0">{money(data.loan_outstanding)}</h4>
                  </div>
                  <Link to="/loans" className="btn btn-black btn-border btn-round">View All Loans</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Land / Business / Gold */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">2. Land, Business &amp; Gold (Jomi, Beboshay, Gold)</h4>
                  <Link to="/assets/create" className="btn btn-primary btn-round ms-auto"><i className="fa fa-plus"></i> &nbsp; Add Investment</Link>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  {assetCards.map((card) => (
                    <div className="col-md-4" key={card.key}>
                      <Link to={`/assets?type=${card.key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card card-round shadow-sm">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="icon-big text-center bubble-shadow-small text-warning me-3">
                                <i className={'fa-solid fa-2x ' + card.icon}></i>
                              </div>
                              <div>
                                <p className="card-category mb-1">{card.label}</p>
                                <h5 className="card-title mb-0">{money(card.value)}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <Link to="/assets" className="btn btn-black btn-border btn-round">View All Investments</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </Layout>
  );
}

export default Investments;
