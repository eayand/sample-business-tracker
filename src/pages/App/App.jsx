// import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import AdminPage from '../AdminPage/AdminPage';
import WorkspaceDetailPage from '../WorkspaceDetailPage/WorkspaceDetailPage';
import BrokerListPage from '../BrokerListPage/BrokerListPage';
import BrokerCreatePage from '../BrokerCreatePage/BrokerCreatePage';
import BrokerDetailPage from '../BrokerDetailPage/BrokerDetailPage';
import CustomerListPage from '../CustomerListPage/CustomerListPage';
import CustomerCreatePage from "../CustomerCreatePage/CustomerCreatePage"
import CustomerDetailPage from '../CustomerDetailPage/CustomerDetailPage';
import NavBar from '../../components/NavBar/NavBar';
import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser())
  return (
    <main className="App">
      { 
        user ? 
        <>
          <NavBar user={user} setUser={setUser}/>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/admin' element={<AdminPage/>}/>
            <Route path='/workspaces/:id' element={<WorkspaceDetailPage/>}/>
            <Route path ='/brokers' element={<BrokerListPage user={user}/>} />
            <Route path ='/brokers/new' element={<BrokerCreatePage user={user}/>} />
            <Route path ='/brokers/:id' element={<BrokerDetailPage user={user}/>} />
            <Route path='/customers' element={<CustomerListPage user={user}/>}/>
            <Route path='/customers/new' element={<CustomerCreatePage user={user}/>} />
            <Route path='/customers/:id' element={<CustomerDetailPage user={user}/>} />
          </Routes> 
        </>
        : 
        < AuthPage setUser={setUser}/>
      }
    </main>
  );
}
