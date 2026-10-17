import React from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import Layout from '../Layout.jsx';
function MemberEdit() {

  let { id } = useParams();

  const [member, setMember  ] = React.useState([]);
  
    function fetchMember() {
      fetch('http://localhost/finance_api/member/single.php?id=' + id)
        .then(response => response.json())
        .then(data => setMember(data.data[0]))
        .catch(error => console.error('Error fetching member:', error));
    }
  
    React.useEffect(() => {
      fetchMember();
    }
  , []);

 function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
   
    fetch('http://localhost/finance_api/member/update.php?id=' + member.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Optionally, you can redirect the user to another page or show a success message here
        window.location.href = '/members';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Edit Member</h3>

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
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Member ID</label>
                    <input type="text" className="form-control" value={id} disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="memberName">Name</label>
                    <input type="text" onChange={(e) => setMember({...member, name: e.target.value})} value={member.name || ''} name="name" className="form-control" id="memberName" placeholder="Enter member name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="memberPhone">Phone Number</label>
                    <input type="tel" onChange={(e) => setMember({...member, phone: e.target.value})} value={member.phone || ''} name="phone" className="form-control" id="memberPhone" placeholder="Enter phone number" required />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Update Member</button>
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

export default MemberEdit;
