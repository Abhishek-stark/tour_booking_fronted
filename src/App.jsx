import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import Header from './components/Header';
import TourPageN from './component/TourPageN';
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import Register from './component/Register';
import Useraccount from './component/Useraccount';
import Homepage from './component/Homepage';
import Tourpage from './component/Tourpage';
import axios from 'axios';
import Tourdetailpage from './component/Tourdetailpage';
import Passwordsetting from './component/Passwordsetting';
import Logins from './component/Logins';
import RegisterN from './component/RegisterN';
import ProtectedRouted from './component/ProtectedRouted';
import Nopage from './component/Nopage';
import AdminPage from './component/AdminPage';
import TourDetailsN from './component/TourDetailsN';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Router forceRefresh={true}>
        <Homepage />
        <div className="container">
          <Routes>
            <Route
              path="/dashboard"
              exact
              element={<ProtectedRouted Component={Dashboard} />}
              //  element={<Dashboard />}
            />
            <Route
              path="/updatePassword"
              exact
              element={<ProtectedRouted Component={Passwordsetting} />}
              // element={<Passwordsetting />}
            />{' '}
            <Route
              path="/login"
              exact
              element={<ProtectedRouted Component={Logins} />}
            />
            <Route
              path="/admin"
              exact
              element={<ProtectedRouted Component={AdminPage} />}
            />
            <Route path="/" exact element={<TourPageN />} />
            <Route
              path="/useraccount"
              exact
              element={<ProtectedRouted Component={Useraccount} />}
              // element={<Useraccount />}
            />
            <Route
              path="/register"
              exact
              element={<RegisterN />}
              //  element={<Register />}
            />
            <Route
              path="/tourdetail"
              exact
              element={<ProtectedRouted Component={TourDetailsN} />}
              // element={<Tourdetailpage />}
            />
            <Route path="/*" element={<Nopage />} />
          </Routes>{' '}
        </div>{' '}
      </Router>{' '}
    </>
  );
}

export default App;
