import React from 'react';
import Sidebar from "../Sidebar.jsx";
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
 
function Layout({children}) {
  

  return (
        <div className="page-container"> 
            <Sidebar /> 
            <div className="main-content"> 
                <Header/>
                {children}
                <Footer />
            </div>
        </div> 
     
  );
}

export default Layout;