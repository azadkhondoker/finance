import React from 'react';
import Layout from '../Layout.jsx';
import PageHeader from '../PageHeader.jsx';
import LoanForm from './Form.jsx';
import axios from '../../../Lib/axios.js';

function LoanCreate() {

  const [message, setMessage] = React.useState('');

  async function handleSubmit(values) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));
    const response = await axios.post('loan/create.php', formData);
    if (response.data.status === false) {
      setMessage(response.data.message);
      return;
    }
    window.location.href = '/loans/' + response.data.data;
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">
          <PageHeader title="Give Loan" crumbs={[{ label: 'Investments', to: '/investments' }, { label: 'Loans', to: '/loans' }, { label: 'Add New' }]} />
          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-body">
                  <LoanForm submitLabel="Give Loan" onSubmit={handleSubmit} message={message} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoanCreate;
