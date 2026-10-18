import React from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import Layout from '../Layout.jsx';
import axios from '../../../Lib/axios.js';

function SavingEdit() {

  let { id } = useParams();

  const [saving, setSaving] = React.useState({});
  const [message, setMessage] = React.useState('');

  async function fetchSaving() {
    try {
      const response = await axios.get('saving/single.php?id=' + id);
      setSaving(response.data.data[0] || {});
    } catch (error) {
      console.error('Error fetching saving:', error);
    }
  }

  React.useEffect(() => {
    fetchSaving();
  }
  , []);

  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post('saving/update.php?id=' + saving.id, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.status === false) {
        setMessage(response.data.message);
        return;
      }
      window.location.href = '/savings/member/' + saving.member_id;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Edit Savings</h3>

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
            <li className="separator">
              <i className="icon-arrow-right"></i>
            </li>
            <li className="nav-item">
              <a href="#">Edit</a>
            </li>
          </ul>
        </div>

        {/* Card */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">

              <div className="card-body">
                {message && <div className="alert alert-danger">{message}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="savingAmount">Amount (৳)</label>
                    <input type="number" min="0.01" step="0.01" onChange={(e) => setSaving({...saving, amount: e.target.value})} value={saving.amount || ''} name="amount" className="form-control" id="savingAmount" placeholder="Enter amount" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="savingDate">Date</label>
                    <input type="date" onChange={(e) => setSaving({...saving, saving_date: e.target.value})} value={saving.saving_date || ''} name="saving_date" className="form-control" id="savingDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="savingNote">Note</label>
                    <input type="text" onChange={(e) => setSaving({...saving, note: e.target.value})} value={saving.note || ''} name="note" className="form-control" id="savingNote" placeholder="Enter note (optional)" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Update Savings</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </Layout>
  );
}

export default SavingEdit;
