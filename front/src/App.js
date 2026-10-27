
import './App.css';
import NotFound from './pages/NotFound';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import Terms from './pages/Terms';
import Login from './pages/Login';
import Register from './pages/Register';
import Help from './pages/Help';
import Branch from './pages/Branch';
import Home from './pages/Home';
import Services from './pages/Services';
import CheckApp from './pages/CheckApp';
import SEAppointment from './pages/SEAppointment'
import Date from './pages/Date';
import Summary from './pages/Summary';
import VerifyPhone from './pages/VerifyPhone';
import VerifyCode from './pages/VerifyCode';
import QueueNo from './pages/QueueNo';
import Dashboard from './pages/admin/Dashboard';
import Appointments from './pages/admin/Appointments';
import AdLogin from './pages/admin/AdLogin';
import MainAd from './pages/admin/MainAd';

const ProtectedRoute = ({check, redirectTo, children }) => {
  return check() ? children : <Navigate to={redirectTo} replace/>
}

const isUser=()=>localStorage.getItem('isLoggedIn') == 'true'
const isAdmin = ()=> localStorage.getItem('adminLoggedIn') == 'true'
const isMainAdmin = ()=> localStorage.getItem('mainAdminLoggedIn') == 'true'



function App() {

  return (
    <div className="App">
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='terms' element={<Terms/>} />
      <Route path='help' element={<Help/>}/>

      <Route path='verify' element={<VerifyPhone/>}/>
      <Route path='verifycode' element={<VerifyCode/>}/>
      <Route path='register' element={<Register/>} />
      <Route path='login' element={<Login/>} />
      <Route path='services' element={<ProtectedRoute check={isUser} redirectTo='/login'>
        <Services/>
      </ProtectedRoute>}/>
      <Route path='branches' element={<ProtectedRoute check={isUser} redirectTo='/login'>
        <Branch/>
      </ProtectedRoute>}/>
      <Route path='date' element={<ProtectedRoute check={isUser} redirectTo='/login'>
        <Date/>
      </ProtectedRoute>}/>
      <Route path='checkappointment' element={<ProtectedRoute check={isUser} redirectTo='/login'>
        <CheckApp/>
      </ProtectedRoute>}/>
      <Route path='seappointment' element={<ProtectedRoute check={isUser} redirectTo='/login'>
        <SEAppointment/>
      </ProtectedRoute>}/>
      <Route path='summary' element={<ProtectedRoute check={isUser} redirectTo='/login'>
        <Summary/>
      </ProtectedRoute>}/>
    <Route path='queue' element={<ProtectedRoute check={isUser} redirectTo='/login'>
      <QueueNo/>
    </ProtectedRoute>}/>

    <Route path='admin/login' element={<AdLogin/>}/>
    <Route path='mainadmin' element={<ProtectedRoute check={isMainAdmin} redirectTo='/admin/login'>
      <MainAd/>
    </ProtectedRoute>}/> 
    <Route path='dashboard' element={
      <ProtectedRoute check={isAdmin} redirectTo='/admin/login'>
        <Dashboard/>
      </ProtectedRoute>
    }/>
    <Route path='appointments' element={
      <ProtectedRoute check={isAdmin} redirectTo='/admin/login'>
        <Appointments/>
      </ProtectedRoute>
    }/>

    < Route path='*' element={<NotFound/>}/>
    </Routes>
    
    </div>
  );
}

export default App;
