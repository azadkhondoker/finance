import {useState} from 'react';
import Sidebar from "../Sidebar.jsx";
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
 
function Layout({children}) {
  
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };


  return (
        <div
            className={`page-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed" }`}> 
            <Sidebar isSidebarOpen={isSidebarOpen} /> 
            <div className="main-content"> 
                <Header toggleSidebar={toggleSidebar} />
                {children}
                <Footer />
            </div>
        </div> 
     
  );
}

export default Layout;