import { Link, useLocation  } from "react-router";
 function Sidebar() {

   const location = useLocation();

  const isActive = (path) => path === "/"
      ? location.pathname === "/" ? "active" : ""
      : location.pathname.startsWith(path) ? "active" : "";

  return(

    <div className="sidebar-menu" aria-hidden="false">
            <div className="sidebar-header">Members
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
                                <Link to="/Members" aria-expanded="false"><i class="ti-user"></i><span>Member</span></Link>
                            </li>
                            <li className={isActive("/savings")}>
                                <Link to="/savings" aria-expanded="false"><i className="ti-wallet"></i><span>Savings</span></Link>
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
                            <li >
                                <Link to="#" aria-expanded="false"><i className="ti-palette"></i><span>UI Features</span></Link>
                            </li>
                            <li className={isActive("/Table")}>
                                <Link to="/Table" aria-expanded="false"><i className="fa-solid fa-table"></i><span>Tables</span></Link>
                            </li>
                            <li className={isActive("/Categories")}>
                                <Link to="/Categories" aria-expanded="false"><i className="fas fa-pen-square"></i><span>Categories</span></Link>
                            </li>
                            <li className={isActive("/Invoice")}>
                              <Link to="/Invoice"><i className="ti-receipt"></i> <span>Invoice Summary</span></Link>
                            </li>
                            {/* <li className={isActive("/Saving")} >
                                <Link to="/Saving" aria-expanded="true"><i className="fa-solid fa-table"></i>
                                    <span>Saving summary</span></Link>
                                    <ul className="collapse mm-collapse mm-show">
                                    <li><Link to="table-basic.html">basic table</Link></li>
                                    <li><Link to="table-layout.html">table layout</Link></li>
                                    <li><Link to="datatable.html">datatable</Link></li>
                                </ul>
                            </li> */}
                        </ul>
                    </nav>
                </div>
            </div>
        </div> 
  );
  
 }

 export default Sidebar;


 
{/*
import { useState } from 'react';

const menuItems = [
  {
    title: 'dashboard',
    icon: 'ti-dashboard',
    children: [
      { label: 'ICO dashboard', href: '/index' },
      { label: 'Ecommerce dashboard', href: '/index2' },
      { label: 'SEO dashboard', href: '/index3' },
    ],
  },

  {
    title: 'Go Pro',
    icon: 'fa-solid fa-crown',
    href: 'https://dashboardpack.com/?utm_source=srtdash&utm_medium=sidebar&utm_campaign=demo',
  },

  {
    title: 'Sidebar Types',
    icon: 'ti-layout-sidebar-left',
    children:[
      {label: 'Left Sidebar', href: '/index'},
      {label: 'Horizontal Sidebar', href: '/index3-horizontalmenu'},
    ],
  },

  {
    title: 'UI Features',
    icon: 'ti-palette',
    children:[
      {label: 'Accordion', href: '/accordion'},
      {label: 'Alert', href: '/alert'},
      {label: 'Badge', href: 'b//adge'},
      {label: '', href: ''},
    ]
  },

  {
    title: 'Charts',
    icon: 'ti-pie-chart',
    children: [
      { label: 'bar chart', href: '/barchart' },
      { label: 'line Chart', href: '/linechart' },
      { label: 'pie chart', href: '/piechart' },
    ],
  },

  {
    title: 'icons',
    icon: 'ti-slice',
    children:[
      { label: 'fontawesome icons', href: '/fontawesome' },
      { label: 'themify icons', href: '/themify' },
    ],
  },

  {
    title: 'Tables',
    icon: 'fa-solid fa-table',
    children:[
      { label: 'table-basic', href: '' },
    ],
  },

  {
    title: 'Invoice Summary',
    icon: 'ti-receipt',
    children:[
      { label: '', href: '/' },
      { label: '', href: '/' },
    ],
  },

  { title: 'maps', icon: 'ti-map-alt', href: '/maps' },

  { 
    title: 'Apps',
    icon: 'ti-widget',
    href: '/apps'
  },
  
   {
    title: 'Pages',
    icon: 'ti-layers-alt',
    children:[
      { label: '', href: '/' },
      { label: '', href: '/' },
    ],
  },
];

function Sidebar() {
  const [openIndex, setOpenIndex] = useState(0); // kon menu khola ache

  const handleToggle = (e, i) => {
    e.preventDefault();
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="sidebar-menu">
      <div className="sidebar-header">
        <div className="logo">
          <a href="/"><img src="/assets/images/icon/logo.png" alt="logo" /></a>
        </div>
      </div>
      <div className="main-menu">
        <div className="menu-inner">
          <nav>
            <ul className="metismenu" id="menu">
              {menuItems.map((item, i) => (
                <li key={item.title} className={openIndex === i ? 'active' : ''}>
                  {item.children ? (
                    <>
                      <a href="#" onClick={(e) => handleToggle(e, i)} aria-expanded={openIndex === i}>
                        <i className={item.icon}></i><span>{item.title}</span>
                      </a>
                      {openIndex === i && (
                        <ul className="collapse show">
                          {item.children.map((child) => (
                            <li key={child.label}><a href={child.href}>{child.label}</a></li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a href={item.href}><i className={item.icon}></i> <span>{item.title}</span></a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; */}