import { Fragment } from 'react';
import { Link } from 'react-router';

// Page-er upore title + breadcrumb (existing page-header markup-i)
// crumbs = [{ label: 'Loans', to: '/loans' }, { label: 'Add New' }]
function PageHeader({ title, crumbs = [] }) {
  return (
    <div className="page-header">
      <h3 className="fw-bold mb-3">{title}</h3>

      <ul className="breadcrumbs mb-3">
        <li className="nav-home">
          <Link to="/dashboard">
            <i className="icon-home"></i>
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <Fragment key={crumb.label}>
            <li className="separator">
              <i className="icon-arrow-right"></i>
            </li>
            <li className="nav-item">
              {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <a href="#">{crumb.label}</a>}
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default PageHeader;
