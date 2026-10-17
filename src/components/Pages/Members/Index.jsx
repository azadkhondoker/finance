import React from 'react';
import { Link } from 'react-router';
import axios from '../../../Lib/axios.js';
import Layout from '../Layout.jsx';
function Members() {

  const [members, setMembers] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [filtered, setFiltered] = React.useState([]);

  async function fetchMembers() {
    try {
      const response = await axios.get('member/index.php');
      const data = await response.data;
      setMembers(data.data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  }

  React.useEffect(() => {
    fetchMembers();
  }
, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`member/delete.php?id=${id}`);
        await fetchMembers();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  }

  
  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Members</h3>

          <ul className="breadcrumbs mb-3">
            <li className="nav-home">
              <Link to="/">
                <i className="icon-home"></i>
              </Link>
            </li>

            <li className="separator">
              <i className="icon-arrow-right"></i>
            </li>
            <li className="nav-item">
              <Link to="/members">Members</Link>
            </li>
          </ul>
        </div>

        {/* Table Card */}
        <div className="row">
          <div className="col-md-12">

            <div className="card card-round">

              <div className="card-header">
                <div className="d-flex align-items-center">

                  <h4 className="card-title">All Members</h4>

                  <Link to="/members/create" className="btn btn-primary btn-round ms-auto"><i className="fa fa-plus"></i> &nbsp; Add Member</Link>
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
                        placeholder="Search by ID, name or phone..."
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
                        <th>Member ID</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Date Added</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {members.map((member, index) => (

                        <tr key={member.id}>

                          <td>{index + 1}</td>

                          <td>{member.id}</td>

                          <td>
                            <strong>{member.name}</strong>
                          </td>

                          <td>{member.phone}</td>

                          <td>{member.created_at}</td>

                          <td>

                            <div className="form-button-action">

                              <Link to={`/members/edit/${member.id}`} className="btn btn-link btn-primary" title="Edit">
                                <i className="fa fa-edit"></i>
                              </Link>
                              <button className="btn btn-link btn-danger" title="Delete" onClick={() => handleDelete(member.id)}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center text-muted">No members found.</td>
                        </tr>
                      )}
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

export default Members;
