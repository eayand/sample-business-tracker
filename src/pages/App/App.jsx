// import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import AdminPage from '../AdminPage/AdminPage';
import WorkspaceDetailPage from '../WorkspaceDetailPage/WorkspaceDetailPage';
import BrokerListPage from '../BrokerListPage/BrokerListPage';
import BrokerDetailPage from '../BrokerDetailPage/BrokerDetailPage';
import CustomerListPage from '../CustomerListPage/CustomerListPage';
import CustomerDetailPage from '../CustomerDetailPage/CustomerDetailPage';
import NavBar from '../../components/NavBar/NavBar';
import UserActions from '../../components/UserActions/UserActions';
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
          <UserActions user={user} setUser={setUser}/>
          <Routes>
            { user.role === 'admin' ? 
              <>
              <Route path='/' element={<AdminPage user={user}/>}/>
              <Route path='/workspaces/:id' element={<WorkspaceDetailPage user={user}/>}/>
              </>
            : 
            <Route path='/' element={<HomePage user={user}/>} />
          }
            { user.workspace.length > 0 ? 
            <>
            <Route path ='/brokers' element={<BrokerListPage user={user}/>} />
            <Route path ='/brokers/:id' element={<BrokerDetailPage user={user}/>} />
            <Route path='/customers' element={<CustomerListPage user={user}/>}/>
            <Route path='/customers/:id' element={<CustomerDetailPage user={user}/>} />
            </>
            : undefined }
          </Routes> 
        </>
        : 
        < AuthPage setUser={setUser}/>
      }
    <footer></footer>
    </main>
  );
}
