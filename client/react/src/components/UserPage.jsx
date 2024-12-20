
import React from 'react';
import BookSearch from './manage/BookSearch';
import Notifications from './manage/Notifications';
import Header from './manage/Header';
import Footer from './manage/Footer';

const UserPage = () => {
  const userEmail = localStorage.getItem('userEmail'); 

  return (
    <div>
       <Header />
    <div className="container-fluid d-flex flex-column" style={{ minHeight: '70vh', backgroundColor: '#f8f9fa' }}>
     

      <div className="flex-grow-1">
       
        <div className="row justify-content-center g-4">
          <div className="col-12 col-md-6">
            <div className="card shadow-sm border-0" style={{ minHeight: '500px' }}>
              <div className="card-body d-flex flex-column">
                <h2 className="card-title text-primary">Book Search</h2>
                <BookSearch />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card shadow-sm border-0" style={{ minHeight: '500px' }}>
              <div className="card-body d-flex flex-column">
                <h2 className="card-title text-primary">Notifications</h2>
                <Notifications />
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
    <Footer />
    </div>
  );
};

export default UserPage;