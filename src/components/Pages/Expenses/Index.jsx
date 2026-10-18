import React from 'react';
import { Link } from 'react-router';
import axios from '../../../Lib/axios.js';
import Layout from '../Layout.jsx';

function Expenses() {

  const [expenses, setExpenses] = React.useState([]);
  const [totalExpense, setTotalExpense] = React.useState(0);
  const [search, setSearch] = React.useState('');

  async function fetchExpenses() {
    try {
      const response = await axios.get('expense/index.php');
      const data = await response.data;
      setExpenses(data.data || []);
      setTotalExpense(data.total_expense || 0);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }

  React.useEffect(() => {
    fetchExpenses();
  }
, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await axios.delete(`expense/delete.php?id=${id}`);
        await fetchExpenses();
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  }

  const money = (value) => '৳ ' + Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const filtered = expenses.filter((item) =>
    (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (item.note || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Expenses</h3>

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
          </ul>
        </div>

        {/* Total Expense */}
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="icon-big text-center bubble-shadow-small text-danger me-3">
                    <i className="fas fa-wallet fa-2x"></i>
                  </div>
                  <div>
                    <p className="card-category mb-1">Total Expense</p>
                    <h4 className="card-title mb-0">{money(totalExpense)}</h4>
                  </div>
                </div>
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

                  <h4 className="card-title">All Expenses</h4>

                  <Link to="/expenses/create" className="btn btn-primary btn-round ms-auto"><i className="fa fa-plus"></i> &nbsp; Add Expense</Link>
                </div>
              </div>

              <div className="card-body">

                {/* Search */}
                <div className="row mb-3">
                  <div className="col-md-4">

                    <div className="input-icon">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search expense..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />

                      <span className="input-icon-addon">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>

                  </div>
                </div>

                {/* Table */}
                <div className="table-responsive">

                  <table className="table table-hover">

                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date &amp; Time</th>
                        <th>Title</th>
                        <th>Note</th>
                        <th className="text-end">Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {filtered.map((expense, index) => (

                        <tr key={expense.id}>

                          <td>{index + 1}</td>

                          <td>{expense.expense_at}</td>

                          <td>
                            <strong>{expense.title}</strong>
                          </td>

                          <td>{expense.note}</td>

                          <td className="text-end"><strong>{money(expense.amount)}</strong></td>

                          <td>

                            <div className="form-button-action">

                              <Link to={`/expenses/edit/${expense.id}`} className="btn btn-link btn-primary" title="Edit">
                                <i className="fa fa-edit"></i>
                              </Link>
                              <button className="btn btn-link btn-danger" title="Delete" onClick={() => handleDelete(expense.id)}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot>
                      <tr>
                        <th colSpan="4" className="text-end">Total Expense</th>
                        <th className="text-end">{money(totalExpense)}</th>
                        <th></th>
                      </tr>
                    </tfoot>
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

export default Expenses;
