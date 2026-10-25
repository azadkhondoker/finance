import React from 'react';
import { useParams } from 'react-router';
import Layout from '../Layout.jsx';
import PageHeader from '../PageHeader.jsx';
import LoanForm from './Form.jsx';
import axios from '../../../Lib/axios.js';

function LoanEdit() {

  let { id } = useParams();

  const [loan, setLoan] = React.useState(null);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    async function fetchLoan() {
      try {
        const response = await axios.get('loan/single.php?id=' + id);
        setLoan(response.data.data[0] || {});
      } catch (error) {
        console.error('Error fetching loan:', error);
      }
    }
    fetchLoan();
  }, [id]);

  async function handleSubmit(values) {
    try {
      const response = await axios.post('loan/update.php?id=' + id, values, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.status === false) {
        setMessage(response.data.message);
        return;
      }
      window.location.href = '/loans/' + id;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">
          <PageHeader title="Edit Loan" crumbs={[{ label: 'Investments', to: '/investments' }, { label: 'Loans', to: '/loans' }, { label: 'Edit' }]} />
          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-body">
                  {loan && <LoanForm initial={loan} submitLabel="Update Loan" onSubmit={handleSubmit} message={message} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoanEdit;
