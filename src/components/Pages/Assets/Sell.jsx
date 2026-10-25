import React from 'react';
import { Link, useParams } from 'react-router';
import Layout from '../Layout.jsx';
import PageHeader from '../PageHeader.jsx';
import axios from '../../../Lib/axios.js';
import { money, today } from '../../../Lib/format.js';

function AssetSell() {

  let { id } = useParams();

  const [asset, setAsset] = React.useState(null);
  const [saleAmount, setSaleAmount] = React.useState('');
  const [saleDate, setSaleDate] = React.useState(today());
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    async function fetchAsset() {
      try {
        const response = await axios.get('asset/single.php?id=' + id);
        setAsset(response.data.data[0] || {});
      } catch (error) {
        console.error('Error fetching asset:', error);
      }
    }
    fetchAsset();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post('asset/sell.php?id=' + id, { sale_amount: saleAmount, sale_date: saleDate }, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.data.status === false) {
      setMessage(response.data.message);
      return;
    }
    window.location.href = '/assets?type=' + asset.asset_type;
  }

  const profit = asset && saleAmount !== '' ? Number(saleAmount) - Number(asset.amount) : null;

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">
          <PageHeader title="Mark as Sold" crumbs={[{ label: 'Investments', to: '/investments' }, { label: 'Land, Business & Gold', to: '/assets' }, { label: 'Sell' }]} />
          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-body">
                  {asset && (
                    <>
                      <p><strong>{asset.title}</strong> - invested {money(asset.amount)} on {asset.invest_date}</p>
                      {message && <div className="alert alert-danger">{message}</div>}
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="saleAmount">Sale Amount (৳)</label>
                          <input type="number" min="0" step="0.01" value={saleAmount} onChange={(e) => setSaleAmount(e.target.value)} className="form-control" id="saleAmount" placeholder="Koto taka-y bikri holo" required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="saleDate">Sale Date</label>
                          <input type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} className="form-control" id="saleDate" required />
                        </div>
                        {profit !== null && (
                          <p className={profit < 0 ? 'text-danger' : 'text-success'}>
                            {profit < 0 ? 'Loss' : 'Profit'}: {money(Math.abs(profit))}
                          </p>
                        )}
                        <button type="submit" className="btn btn-primary mt-3">Mark as Sold</button>
                        <Link to={`/assets?type=${asset.asset_type}`} className="btn btn-black btn-border mt-3 ms-2">Cancel</Link>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AssetSell;
