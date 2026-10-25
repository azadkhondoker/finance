import React from 'react';
import { Link, useSearchParams } from 'react-router';
import axios from '../../../Lib/axios.js';
import { money } from '../../../Lib/format.js';
import Layout from '../Layout.jsx';
import PageHeader from '../PageHeader.jsx';
import { ASSET_TYPES } from './Form.jsx';

function Assets() {

  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || '';

  const [assets, setAssets] = React.useState([]);
  const [totalActive, setTotalActive] = React.useState(0);
  const [totalProfit, setTotalProfit] = React.useState(0);

  async function fetchAssets() {
    try {
      const response = await axios.get('asset/index.php' + (type ? '?type=' + type : ''));
      const data = await response.data;
      setAssets(data.data || []);
      setTotalActive(data.total_active || 0);
      setTotalProfit(data.total_profit || 0);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  }

  React.useEffect(() => {
    fetchAssets();
  }
, [type]);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this investment?")) {
      try {
        await axios.delete(`asset/delete.php?id=${id}`);
        await fetchAssets();
      } catch (error) {
        console.error('Error deleting asset:', error);
      }
    }
  }

  const typeLabel = (value) => (ASSET_TYPES.find((t) => t.value === value) || { label: value }).label;

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        <PageHeader title="Land, Business & Gold" crumbs={[{ label: 'Investments', to: '/investments' }, { label: 'Land, Business & Gold', to: '/assets' }]} />

        {/* Totals */}
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Currently Invested</p>
                <h4 className="card-title mb-0">{money(totalActive)}</h4>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Profit / Loss (sold)</p>
                <h4 className={'card-title mb-0 ' + (totalProfit < 0 ? 'text-danger' : '')}>{money(totalProfit)}</h4>
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

                  <h4 className="card-title">Investments</h4>

                  <Link to="/assets/create" className="btn btn-primary btn-round ms-auto"><i className="fa fa-plus"></i> &nbsp; Add Investment</Link>
                </div>
              </div>

              <div className="card-body">

                {/* Type filter */}
                <div className="mb-3 d-flex gap-2 flex-wrap">
                  <Link to="/assets" className={'btn btn-round ' + (type === '' ? 'btn-primary' : 'btn-black btn-border')}>All</Link>
                  {ASSET_TYPES.map((t) => (
                    <Link key={t.value} to={`/assets?type=${t.value}`} className={'btn btn-round ' + (type === t.value ? 'btn-primary' : 'btn-black btn-border')}>{t.label}</Link>
                  ))}
                </div>

                {/* Table */}
                <div className="table-responsive">

                  <table className="table table-hover">

                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Details</th>
                        <th>Date</th>
                        <th className="text-end">Invested</th>
                        <th>Status</th>
                        <th className="text-end">Profit / Loss</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {assets.map((asset, index) => {
                        const sold = asset.status === 'sold';
                        const profit = sold ? Number(asset.sale_amount) - Number(asset.amount) : null;
                        return (
                        <tr key={asset.id}>

                          <td>{index + 1}</td>

                          <td>{typeLabel(asset.asset_type)}</td>

                          <td><strong>{asset.title}</strong></td>

                          <td>{asset.details}</td>

                          <td>{asset.invest_date}</td>

                          <td className="text-end"><strong>{money(asset.amount)}</strong></td>

                          <td>
                            <span className={'badge ' + (sold ? 'bg-success' : 'bg-warning')}>{sold ? 'Sold' : 'Active'}</span>
                            {sold && <><br /><small className="text-muted">{asset.sale_date}</small></>}
                          </td>

                          <td className={'text-end ' + (profit !== null && profit < 0 ? 'text-danger' : '')}>
                            {sold ? money(profit) : '-'}
                          </td>

                          <td>

                            <div className="form-button-action">

                              {!sold && (
                                <Link to={`/assets/sell/${asset.id}`} className="btn btn-link btn-success" title="Mark as Sold">
                                  <i className="fa fa-hand-holding-dollar"></i>
                                </Link>
                              )}
                              <Link to={`/assets/edit/${asset.id}`} className="btn btn-link btn-primary" title="Edit">
                                <i className="fa fa-edit"></i>
                              </Link>
                              <button className="btn btn-link btn-danger" title="Delete" onClick={() => handleDelete(asset.id)}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
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

export default Assets;
