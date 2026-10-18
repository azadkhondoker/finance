import React from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import Layout from '../Layout.jsx';
import axios from '../../../Lib/axios.js';

function ExpenseEdit() {

  let { id } = useParams();

  const [expense, setExpense] = React.useState({});
  const [message, setMessage] = React.useState('');

  async function fetchExpense() {
    try {
      const response = await axios.get('expense/single.php?id=' + id);
      setExpense(response.data.data[0] || {});
    } catch (error) {
      console.error('Error fetching expense:', error);
    }
  }

  React.useEffect(() => {
    fetchExpense();
  }
  , []);

  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post('expense/update.php?id=' + expense.id, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.status === false) {
        setMessage(response.data.message);
        return;
      }
      window.location.href = '/expenses';
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
          <h3 className="fw-bold mb-3">Edit Expense</h3>

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
                    <label htmlFor="expenseTitle">Title</label>
                    <input type="text" onChange={(e) => setExpense({...expense, title: e.target.value})} value={expense.title || ''} name="title" className="form-control" id="expenseTitle" placeholder="Enter expense title" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expenseAmount">Amount (৳)</label>
                    <input type="number" min="0.01" step="0.01" onChange={(e) => setExpense({...expense, amount: e.target.value})} value={expense.amount || ''} name="amount" className="form-control" id="expenseAmount" placeholder="Enter amount" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expenseNote">Note</label>
                    <input type="text" onChange={(e) => setExpense({...expense, note: e.target.value})} value={expense.note || ''} name="note" className="form-control" id="expenseNote" placeholder="Enter note (optional)" />
                  </div>
                  <p className="text-muted">Date &amp; time: {expense.expense_at}</p>
                  <button type="submit" className="btn btn-primary mt-3">Update Expense</button>
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

export default ExpenseEdit;
