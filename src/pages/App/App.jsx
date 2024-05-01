// import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import AdminPage from '../AdminPage/AdminPage';
import WorkspaceDetailPage from '../WorkspaceDetailPage/WorkspaceDetailPage';
import CustomerListPage from '../CustomerListPage/CustomerListPage';
import CustomerCreatePage from "../../pages/CustomerCreatePage/CustomerCreatePage"
import CustomerDetailPage from '../CustomerDetailPage/CustomerDetailPage';
import BrokerListPage from '../BrokerListPage/BrokerListPage';
import NavBar from '../../components/NavBar/NavBar';
import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser())
  return (
    <main className="App">
      { user ? 
      <>
        <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/workspaces/:id' element={<WorkspaceDetailPage/>}/>
        <Route path ='/brokers' element={<BrokerListPage user={user}/>} />
        <Route path='/customers' element={<CustomerListPage user={user}/>}/>
        <Route path='/customers/new' element={<CustomerCreatePage user={user}/>} ></Route>
        <Route path='/customers/:id' element={<CustomerDetailPage user={user}/>} ></Route>
      </Routes> </>
        : 
        < AuthPage setUser={setUser}/>}
    </main>
  );
}
