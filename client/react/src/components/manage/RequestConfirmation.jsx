
import React from 'react';

const RequestConfirmation = ({ message }) => {
  const handleBackToLibrary = () => {
    window.history.back();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow-lg p-4">
            <div className="card-body text-center">
              <h2 className="card-title text-success mb-3">
                <i className="bi bi-check-circle-fill"></i> Request Sent!
              </h2>
              <p className="card-text mb-4 text-muted" style={{ fontSize: '1.2rem' }}>{message}</p>
              <button 
                className="btn btn-primary btn-lg" 
                onClick={handleBackToLibrary} 
                style={{ borderRadius: '25px' }}
              >
                <i className="bi bi-arrow-left-circle"></i> Back to Library
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestConfirmation;