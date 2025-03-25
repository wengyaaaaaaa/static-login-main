import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Profile from './Profile';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/static-login-main">我的網站</Link>
          <div>
            <Link className="btn btn-outline-light m-2" to="/profile">註冊</Link>
            <Link className="btn btn-outline-light m-2" to="/login">登入</Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/static-login-main" element={<App />} />
        <Route path="/profile" element={<Profile  />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={currentUser ? <Dashboard  /> : <Login />} /> */}
      </Routes>
    </Router>
    {/* < App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

