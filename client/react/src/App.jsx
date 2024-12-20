
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';     
import Login from './components/Login';          
import Register from './components/Register';     
import AdminPage from './components/AdminPage';   
import UserPage from './components/UserPage';     
import 'bootstrap/dist/css/bootstrap.min.css';  



import RequestConfirmation from './components/manage/RequestConfirmation';  

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />    
        <Route path="/login" element={<Login />} />  
        <Route path="/register" element={<Register />} />  
        <Route path="/admin" element={<AdminPage />} />  
        <Route path="/user" element={<UserPage />} />  
        <Route path="/request-confirmation" element={<RequestConfirmation />} /> 
      </Routes>
    </Router>
  );
};

export default App;