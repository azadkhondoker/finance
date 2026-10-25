import React from 'react';
import { Link } from 'react-router';
import axios from '../../../Lib/axios.js';
import { money } from '../../../Lib/format.js';
import Layout from '../Layout.jsx';
import PageHeader from '../PageHeader.jsx';

function Loans() {

  const [loans, setLoans] = React.useState([]);
  const [totalOutstanding, setTotalOutstanding] = React.useState(0);
  const [totalInterest, setTotalInterest] = React.useState(0);
  const [search, setSearch] = React.useState('');

  async function fetchLoans() {
    try {
      const response = await axios.get('loan/index.php');
      const data = await response.data;
      setLoans(data.data || []);
      setTotalOutstanding(data.total_outstanding || 0);
      setTotalInterest(data.total_interest || 0);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  }

  React.useEffect(() => {
    fetchLoans();
  }
, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this loan? Its repayments will be removed too.")) {
      try {
        await axios.delete(`loan/delete.php?id=${id}`);
        await fetchLoans();
      } catch (error) {
        console.error('Error deleting loan:', error);
      }
    }
  }

  const filtered = loans.filter((item) =>
    (item.borrower_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (item.borrower_phone || '').includes(search)
  );

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        <PageHeader title="Loans" crumbs={[{ label: 'Investments', to: '/investments' }, { label: 'Loans', to: '/loans' }]} />

        {/* Totals */}
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Loan Outstanding</p>
                <h4 className="card-title mb-0">{money(totalOutstanding)}</h4>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <p className="card-category mb-1">Interest Received</p>
                <h4 className="card-title mb-0">{money(totalInterest)}</h4>
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

                  <h4 className="card-title">All Loans</h4>

                  <Link to="/loans/create" className="btn btn-primary btn-round ms-auto"><i className="fa fa-plus"></i> &nbsp; Give Loan</Link>
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
                        placeholder="Search borrower..."
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
                        <th>Borrower</th>
                        <th>Loan Date</th>
                        <th>Due Date</th>
                        <th className="text-end">Loan</th>
                        <th className="text-end">Repaid</th>
                        <th className="text-end">Outstanding</th>
                        <th className="text-end">Interest</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {filtered.map((loan, index) => (

                        <tr key={loan.id}>

                          <td>{index + 1}</td>

                          <td>
                            <strong>{loan.borrower_name}</strong><br />
                            <small className="text-muted">{loan.borrower_phone}</small>
                          </td>

                          <td>{loan.loan_date}</td>

                          <td>{loan.due_date || '-'}</td>

                          <td className="text-end">{money(loan.principal)}</td>

                          <td className="text-end">{money(loan.paid_principal)}</td>

                          <td className="text-end"><strong>{money(loan.outstanding)}</strong></td>

                          <td className="text-end">{money(loan.paid_interest)}</td>

                          <td>
                            <span className={'badge ' + (loan.status === 'closed' ? 'bg-success' : 'bg-warning')}>
                              {loan.status === 'closed' ? 'Closed' : 'Active'}
                            </span>
                          </td>

                          <td>

                            <div className="form-button-action">

                              <Link to={`/loans/${loan.id}`} className="btn btn-link btn-success" title="Repayments">
                                <i className="fa fa-eye"></i>
                              </Link>
                              <Link to={`/loans/edit/${loan.id}`} className="btn btn-link btn-primary" title="Edit">
                                <i className="fa fa-edit"></i>
                              </Link>
                              <button className="btn btn-link btn-danger" title="Delete" onClick={() => handleDelete(loan.id)}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
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

export default Loans;
