import React from 'react';
import { useParams } from 'react-router';
import Layout from '../Layout.jsx';
import PageHeader from '../PageHeader.jsx';
import AssetForm from './Form.jsx';
import axios from '../../../Lib/axios.js';

function AssetEdit() {

  let { id } = useParams();

  const [asset, setAsset] = React.useState(null);
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

  async function handleSubmit(values) {
    try {
      const response = await axios.post('asset/update.php?id=' + id, values, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.status === false) {
        setMessage(response.data.message);
        return;
      }
      window.location.href = '/assets?type=' + values.asset_type;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">
          <PageHeader title="Edit Investment" crumbs={[{ label: 'Investments', to: '/investments' }, { label: 'Land, Business & Gold', to: '/assets' }, { label: 'Edit' }]} />
          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-body">
                  {asset && <AssetForm initial={asset} submitLabel="Update Investment" onSubmit={handleSubmit} message={message} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AssetEdit;
