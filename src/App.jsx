import Header from './components/Header.jsx';
import PageTitle from './components/Pages/PageTitle.jsx';
import Dashboard from './components/Pages/Dashboard.jsx';
import Table from './components/Pages/Table.jsx';
import Invoice from './components/Pages/Invoice.jsx';
import Sidebar from './components/Sidebar.jsx';
import Footer from './components/Footer.jsx';
import Categories from "./components/Pages/Categories/Index.jsx"; 
import CategoryCreate from "./components/Pages/Categories/Create.jsx";
import CategoryEdit from "./components/Pages/Categories/Edit.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router";


function App() {
    return ( 
        <BrowserRouter> 
           
                    <Routes> 
                        <Route path="/" element={ <> <PageTitle /> <Dashboard /> </> } />
                        <Route path="/table" element={<Table />} />
                        <Route path="/Invoice" element={<Invoice/>} />
                        
                        <Route path="categories">
                            <Route index element={<Categories />} />
                            <Route path="create" element={<CategoryCreate />} />
                            <Route path="edit/:id" element={<CategoryEdit />} />
                        </Route>

                    </Routes>
        </BrowserRouter> 
    ); 
}

export default App;