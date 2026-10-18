import React from 'react';
import { Link, useSearchParams } from 'react-router';
import Layout from '../Layout.jsx';
import axios from '../../../Lib/axios.js';

function SavingCreate() {

  const [searchParams] = useSearchParams();
  const [members, setMembers] = React.useState([]);
  const [memberId, setMemberId] = React.useState(searchParams.get('member_id') || '');
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get('member/index.php');
        setMembers(response.data.data || []);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    }
    fetchMembers();
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    let response = await axios.post('saving/create.php', formData);
    if (response.data.status === false) {
      setMessage(response.data.message);
      return;
    }
    window.location.href = '/savings';
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Add Savings</h3>

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
              <a href="#">Add New</a>
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
                    <label htmlFor="savingMember">Member</label>
                    <select name="member_id" className="form-control" id="savingMember" value={memberId} onChange={(e) => setMemberId(e.target.value)} required>
                      <option value="">Select member</option>
                      {members.map((member) => (
                        <option key={member.id} value={member.id}>{member.name} ({member.phone})</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="savingAmount">Amount (৳)</label>
                    <input type="number" name="amount" min="0.01" step="0.01" className="form-control" id="savingAmount" placeholder="Enter amount" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="savingDate">Date</label>
                    <input type="date" name="saving_date" defaultValue={new Date().toISOString().slice(0, 10)} className="form-control" id="savingDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="savingNote">Note</label>
                    <input type="text" name="note" className="form-control" id="savingNote" placeholder="Enter note (optional)" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Add Savings</button>
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

export default SavingCreate;
