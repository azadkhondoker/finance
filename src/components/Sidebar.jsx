import { Link, useLocation  } from "react-router";
 function Sidebar({isSidebarOpen}) {

   const location = useLocation();

  const isActive = (path) => path === "/"
      ? location.pathname === "/" ? "active" : ""
      : location.pathname.startsWith(path) ? "active" : "";

  return(

    <div className="sidebar-menu" aria-hidden="false">
            <div className="sidebar-header">
                <div className="logo">
                    <Link to="index.html"><picture><source srcSet="/assets/images/icon/logo.avif" type="image/avif"/><img srcSet="/assets/images/icon/logo.png" alt="logo"/></picture></Link>
                </div>
            </div>
            <div className="main-menu">
                <div className="menu-inner">
                    <nav>
                        <ul className="metismenu" id="menu">
                            <li className={isActive("/")}>
                                <Link to="/" aria-expanded="false"><i className="ti-dashboard"></i><span>dashboard</span></Link>
                            </li>
                            <li className={isActive("/Members")}>
                                <Link to="/Members" aria-expanded="false"><i className="ti-user"></i><span>Member</span></Link>
                            </li>
                            <li className={isActive("/savings")}>
                                <Link to="/savings" aria-expanded="false"><i className="ti-wallet"></i><span>Savings</span></Link>
                            </li>
                            <li className={isActive("/investments") || isActive("/loans") || isActive("/assets")}>
                                <Link to="/investments" aria-expanded="false"><i className="fa-solid fa-chart-line"></i><span>Investments</span></Link>
                            </li>
                            <li className={isActive("/receipts")}>
                                <Link to="/receipts" aria-expanded="false"><i className="fa-solid fa-file-invoice-dollar"></i><span>Receipts</span></Link>
                            </li>
                            <li className={isActive("/expenses")}>
                                <Link to="/expenses" aria-expanded="false"><i className="ti-credit-card"></i><span>Expenses</span></Link>
                            </li>
                            <li className={isActive("/overview")}>
                                <Link to="/overview" aria-expanded="false"><i className="ti-bar-chart"></i><span>Total Overview</span></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div> 
  );
}

 export default Sidebar;