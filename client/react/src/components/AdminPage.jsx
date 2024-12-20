
import React from 'react';
import BooksManagement from './manage/BooksManagement';
import UserManagement from './manage/UserManagement';
import BookRequests from './manage/BookRequests';
import Header from './manage/Header';
import Footer from './manage/Footer';
const AdminPage = () => {
  const userEmail = localStorage.getItem('userEmail');

  return (
    <div>
      <Header/>
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      

      
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Books Management</h5>
            </div>
            <div className="card-body">
              <BooksManagement />
            </div>
          </div>
        </div>
      </div>

      
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">User Management</h5>
            </div>
            <div className="card-body">
              <UserManagement />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <BookRequests userEmail={userEmail} />
        </div>
      </div>
      
    </div>
    <Footer/>
    </div>
  );
};

export default AdminPage;