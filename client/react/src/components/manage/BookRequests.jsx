import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookRequests = ({ userEmail }) => {
  const [bookRequests, setBookRequests] = useState([]);


  useEffect(() => {
    const fetchBookRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookRequests1');
        setBookRequests(response.data);
      } catch (error) {
        console.error('Error fetching book requests:', error);
        alert('Failed to fetch book requests. Please check the server.');
      }
    };

    fetchBookRequests();
  }, []);

  const handleConfirmRequest = async (requestId, bookTitle, recipientEmail) => {
    try {
     
      await axios.put(`http://localhost:5000/api/bookRequests1/${requestId}`, { status: 'approved' });

     
      await axios.delete(`http://localhost:5000/api/bookRequests1/${requestId}`);

     
      setBookRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );

      
      const message = `The book "${bookTitle}" has been successfully approved for you!`;

      if (recipientEmail) {
      
        console.log({
          userEmail: 'admin@gmail.com', 
          receivedEmail: recipientEmail, 
          message,
        });

     
        const response = await axios.post('http://localhost:5000/api/notificationRoutes1', {
          userEmail: 'admin@gmail.com', 
          receivedEmail: recipientEmail, 
          message,
        });

        console.log('Notification response:', response);
        alert('Book request confirmed, and user notified.');
      } else {
        alert('User email not found.');
      }
    } catch (error) {
      console.error('Error confirming book request or sending notification:', error.response || error);
      alert('Failed to confirm book request or notify the user.');
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Book Requests</h5>
      </div>
      <div className="card-body">
        {bookRequests.length > 0 ? (
          bookRequests.map((request) => (
            <div
              key={request._id}
              className="alert alert-info d-flex justify-content-between align-items-center mb-3"
            >
              <div>
                <strong>{request.name?.email || 'Unknown User'}</strong> requested the book:{' '}
                <em>{request.bookId?.title || 'Unknown Title'}</em>
                <br />
                Message: {request.message}
                <br />
                <small>Requested on: {new Date(request.createdAt).toLocaleString()}</small>
              </div>
              {request.status !== 'approved' && (
                <button
                  className="btn btn-success"
                  onClick={() =>
                    handleConfirmRequest(
                      request._id,
                      request.bookId?.title,
                      request.name?.email
                    )
                  }
                >
                  Confirm
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No book requests found.</p>
        )}
      </div>
    </div>
  );
};

export default BookRequests;
