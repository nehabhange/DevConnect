import "./App.css";
import { BrowserRouter as Router, Route,Routes,Navigate } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import { Provider } from 'react-redux';
import store from "./store";
import Login from "./components/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode"
import { logoutUser, setCurrentUser } from "./actions/authActions";
import Dashboard from "./components/dashboard/Dashboard";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";


//check for token
if(localStorage.jwtToken){
  //set auth token header auth
  setAuthToken(localStorage.jwtToken)
  //decode token and get user info and exp
  const decoded=jwt_decode(localStorage.jwtToken)
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  //check for expired token
const currentTime=Date.now()/1000;
if(decoded.exp<currentTime){
  //logout user
  store.dispatch(logoutUser());
  //clear current profile and redirect to login
  store.dispatch(clearCurrentProfile())
  window.location.href="/login"
}
}

function App() {
  return (
    <Provider store={store}>
    <Router>
    
        <div className="App">
          <Navbar />
         <Routes>
          <Route exact path="/" element={<Landing/>} />          
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route path="/" element={<PrivateRoute/>}>
         
            <Route path="/" element={<Navigate replace to="dashboard" />}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="create-profile" element={<CreateProfile/>}/>
          
          </Route>
          
         
        
          
          </Routes> 
          <Footer />
        
        </div>
       
      </Router>
      </Provider>
  );
}

export default App;
