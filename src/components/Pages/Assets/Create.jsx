import React from 'react';
import Layout from '../Layout.jsx';
import PageHeader from '../PageHeader.jsx';
import AssetForm from './Form.jsx';
import axios from '../../../Lib/axios.js';

function AssetCreate() {

  const [message, setMessage] = React.useState('');

  async function handleSubmit(values) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));
    const response = await axios.post('asset/create.php', formData);
    if (response.data.status === false) {
      setMessage(response.data.message);
      return;
    }
    window.location.href = '/assets?type=' + values.asset_type;
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">
          <PageHeader title="Add Investment" crumbs={[{ label: 'Investments', to: '/investments' }, { label: 'Land, Business & Gold', to: '/assets' }, { label: 'Add New' }]} />
          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-body">
                  <AssetForm submitLabel="Add Investment" onSubmit={handleSubmit} message={message} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AssetCreate;
