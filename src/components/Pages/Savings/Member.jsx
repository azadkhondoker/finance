import React from 'react';
import { Link, useParams } from 'react-router';
import axios from '../../../Lib/axios.js';
import Layout from '../Layout.jsx';

function SavingMember() {

  let { id } = useParams();

  const [member, setMember] = React.useState({});
  const [history, setHistory] = React.useState([]);
  const [totalSavings, setTotalSavings] = React.useState(0);

  async function fetchHistory() {
    try {
      const response = await axios.get('saving/member.php?member_id=' + id);
      const data = await response.data;
      setMember(data.member || {});
      setHistory(data.data || []);
      setTotalSavings(data.total_savings || 0);
    } catch (error) {
      console.error('Error fetching savings history:', error);
    }
  }

  React.useEffect(() => {
    fetchHistory();
  }
, []);

  async function handleDelete(savingId) {
    if (window.confirm("Are you sure you want to delete this deposit?")) {
      try {
        await axios.delete(`saving/delete.php?id=${savingId}`);
        await fetchHistory();
      } catch (error) {
        console.error('Error deleting saving:', error);
      }
    }
  }

  const money = (value) => '৳ ' + Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Savings History</h3>

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
              <a href="#">{member.name}</a>
            </li>
          </ul>
        </div>

        {/* Total Savings */}
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="card card-round">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="icon-big text-center bubble-shadow-small text-success me-3">
                    <i className="fas fa-piggy-bank fa-2x"></i>
                  </div>
                  <div>
                    <p className="card-category mb-1">{member.name} - Total Savings</p>
                    <h4 className="card-title mb-0">{money(totalSavings)}</h4>
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

                  <h4 className="card-title">Deposits - {member.name} ({member.phone})</h4>

                  <Link to={`/savings/create?member_id=${id}`} className="btn btn-primary btn-round ms-auto"><i className="fa fa-plus"></i> &nbsp; Add Savings</Link>
                </div>
              </div>

              <div className="card-body">

                {/* Table */}
                <div className="table-responsive">

                  <table className="table table-hover">

                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Note</th>
                        <th className="text-end">Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {history.map((item, index) => (

                        <tr key={item.id}>

                          <td>{index + 1}</td>

                          <td>{item.saving_date}</td>

                          <td>{item.note}</td>

                          <td className="text-end"><strong>{money(item.amount)}</strong></td>

                          <td>

                            <div className="form-button-action">

                              <Link to={`/savings/receipt/${item.id}`} className="btn btn-link btn-success" title="Receipt">
                                <i className="fa fa-receipt"></i>
                              </Link>
                              <Link to={`/savings/edit/${item.id}`} className="btn btn-link btn-primary" title="Edit">
                                <i className="fa fa-edit"></i>
                              </Link>
                              <button className="btn btn-link btn-danger" title="Delete" onClick={() => handleDelete(item.id)}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot>
                      <tr>
                        <th colSpan="3" className="text-end">Total</th>
                        <th className="text-end">{money(totalSavings)}</th>
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

export default SavingMember;
