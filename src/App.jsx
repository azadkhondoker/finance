import Header from './components/Header.jsx';
import { useState } from "react";
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
import Login from "./components/Pages/Login.jsx";
import Register from "./components/Pages/Register.jsx";
import Protected from './Auth/Protected.jsx';
import Logout from './Auth/Logout.jsx';



function App() {
    const [ isSignedIn, setIsSignedIn ] = useState(()=> {
    /* if you want, user will be logged in until they logout*/
    return localStorage.getItem("access_token") || false;
    /* if you want, user will be logged when they close the browser*/
    //return sessionStorage.getItem("access_token") || false;
  });
    return ( 
        <BrowserRouter> 
           
                    <Routes> 
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route element={<Protected isSignedIn={isSignedIn} />}></Route>
                        <Route path="/" element={ <> <PageTitle /> <Dashboard /> </> } />
                        <Route path="/dashboard" element={ <> <PageTitle /> <Dashboard /> </> } />
                        <Route path="/table" element={<Table />} />
                        <Route path="/Invoice" element={<Invoice/>} />
                        <Route path="logout" element={<Logout />} />
                        
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