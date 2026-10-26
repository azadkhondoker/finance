import Header from './components/Header.jsx';
import { useState } from "react";
import PageTitle from './components/Pages/PageTitle.jsx';
import Dashboard from './components/Pages/Dashboard.jsx';
import Sidebar from './components/Sidebar.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Pages/Login.jsx";
import Register from "./components/Pages/Register.jsx";
import Protected from './Auth/Protected.jsx';
import Logout from './Auth/Logout.jsx';
import Members from './components/Pages/Members/Index.jsx';
import MemberCreate from './components/Pages/Members/Create.jsx';
import MemberEdit from './components/Pages/Members/Edit.jsx';
import Savings from './components/Pages/Savings/Index.jsx';
import SavingCreate from './components/Pages/Savings/Create.jsx';
import SavingEdit from './components/Pages/Savings/Edit.jsx';
import SavingMember from './components/Pages/Savings/Member.jsx';
import Receipts from './components/Pages/Receipts/Index.jsx';
import ReceiptMember from './components/Pages/Receipts/Member.jsx';
import SavingReceipt from './components/Pages/Savings/Receipt.jsx';
import Expenses from './components/Pages/Expenses/Index.jsx';
import ExpenseCreate from './components/Pages/Expenses/Create.jsx';
import ExpenseEdit from './components/Pages/Expenses/Edit.jsx';
import Overview from './components/Pages/Overview/Index.jsx';
import Investments from './components/Pages/Investments/Index.jsx';
import Loans from './components/Pages/Loans/Index.jsx';
import LoanCreate from './components/Pages/Loans/Create.jsx';
import LoanEdit from './components/Pages/Loans/Edit.jsx';
import LoanShow from './components/Pages/Loans/Show.jsx';
import Assets from './components/Pages/Assets/Index.jsx';
import AssetCreate from './components/Pages/Assets/Create.jsx';
import AssetEdit from './components/Pages/Assets/Edit.jsx';
import AssetSell from './components/Pages/Assets/Sell.jsx';


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
                        <Route path="logout" element={<Logout />} />

                        <Route path="members">
                            <Route index element={<Members />} />
                            <Route path="create" element={<MemberCreate />} />
                            <Route path="edit/:id" element={<MemberEdit />} />
                        </Route>

                        <Route path="savings">
                            <Route index element={<Savings />} />
                            <Route path="create" element={<SavingCreate />} />
                            <Route path="edit/:id" element={<SavingEdit />} />
                            <Route path="member/:id" element={<SavingMember />} />
                            <Route path="receipt/:id" element={<SavingReceipt />} />
                        </Route>

                        <Route path="receipts">
                            <Route index element={<Receipts />} />
                            <Route path="member/:id" element={<ReceiptMember />} />
                        </Route>

                        <Route path="expenses">
                            <Route index element={<Expenses />} />
                            <Route path="create" element={<ExpenseCreate />} />
                            <Route path="edit/:id" element={<ExpenseEdit />} />
                        </Route>
                        <Route path="overview" element={<Overview />} />
                        <Route path="investments" element={<Investments />} />
                        <Route path="loans">
                            <Route index element={<Loans />} />
                            <Route path="create" element={<LoanCreate />} />
                            <Route path="edit/:id" element={<LoanEdit />} />
                            <Route path=":id" element={<LoanShow />} />
                        </Route>
                        <Route path="assets">
                            <Route index element={<Assets />} />
                            <Route path="create" element={<AssetCreate />} />
                            <Route path="edit/:id" element={<AssetEdit />} />
                            <Route path="sell/:id" element={<AssetSell />} />
                        </Route>

                    </Routes>
        </BrowserRouter> 
    ); 
}

export default App;