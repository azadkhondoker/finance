
import React from 'react';
import { Link } from 'react-router';
import Layout from '../Layout.jsx';
import axios from '../../../Lib/axios.js';

function MemberCreate() {
  let id = null;
  const [error, setError] = React.useState(null);

  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    
    let url = '';
    if(id){
        url = 'member/update.php?id=' + id;
    }else{
        url = 'member/create.php';
    } 
    let response = await axios.post(url, formData);
    window.location.href = '/members';
  }


  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Add New Member</h3>

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
              <Link to="/Members">Members</Link>
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
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="memberName">Name</label>
                    <input type="text" name="name" className="form-control" id="memberName" placeholder="Enter member name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="memberPhone">Phone Number</label>
                    <input type="tel" name="phone" className="form-control" id="memberPhone" placeholder="Enter phone number" required />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Add Member</button>
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

export default MemberCreate;
