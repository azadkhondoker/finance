import React from 'react';
import { Link } from 'react-router';
import Layout from '../Layout.jsx';
import axios from '../../../Lib/axios.js';

function ExpenseCreate() {

  const [message, setMessage] = React.useState('');

  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    let response = await axios.post('expense/create.php', formData);
    if (response.data.status === false) {
      setMessage(response.data.message);
      return;
    }
    window.location.href = '/expenses';
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Add New Expense</h3>

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
              <Link to="/expenses">Expenses</Link>
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
                    <label htmlFor="expenseTitle">Title</label>
                    <input type="text" name="title" className="form-control" id="expenseTitle" placeholder="Enter expense title" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expenseAmount">Amount (৳)</label>
                    <input type="number" name="amount" min="0.01" step="0.01" className="form-control" id="expenseAmount" placeholder="Enter amount" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expenseNote">Note</label>
                    <input type="text" name="note" className="form-control" id="expenseNote" placeholder="Enter note (optional)" />
                  </div>
                  <p className="text-muted">Date and time will be added automatically.</p>
                  <button type="submit" className="btn btn-primary mt-3">Add Expense</button>
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

export default ExpenseCreate;
