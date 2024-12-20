
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [userIdToReturn, setUserIdToReturn] = useState('');
  const [activeTab, setActiveTab] = useState('issue');

  useEffect(() => {
    axios.get('http://localhost:5000/api/users1')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));

    axios.get('http://localhost:5000/api/books1')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Error fetching books:', error));

    axios.get('http://localhost:5000/api/issuedBooks1')
      .then((response) => setIssuedBooks(response.data))
      .catch((error) => console.error('Error fetching issued books:', error));
  }, []);

  
  const handleIssueBook = () => {
    if (!selectedUser || !selectedBook || !dueDate || !issueDate) {
      alert('Please fill in all fields.');
      return;
    }

    const issuedBook = { user: selectedUser, bookTitle: selectedBook, issueDate, dueDate };

    axios.post('http://localhost:5000/api/issuedBooks1/issue', issuedBook)
      .then((response) => {
        setIssuedBooks([...issuedBooks, response.data]);
        alert('Book issued successfully!');
        
       
        setSelectedUser('');
        setSelectedBook('');
        setIssueDate('');
        setDueDate('');
      })
      .catch(() => alert('Error issuing book'));
  };

  
  const handleReturnBook = () => {
    if (!userIdToReturn || !selectedBook) {
      alert('Please fill in all fields.');
      return;
    }

    axios.post('http://localhost:5000/api/issuedBooks1/return', { user: userIdToReturn, bookTitle: selectedBook })
      .then(() => {
        setIssuedBooks(issuedBooks.filter((book) => book.bookTitle !== selectedBook));
        alert('Book returned successfully!');
        
       
        setUserIdToReturn('');
        setSelectedBook('');
      })
      .catch(() => alert('Error returning book'));
  };

  return (
    <div className="mt-4">
      <h3 className="text-secondary mb-3">Manage Books - Issue / Return</h3>

      <div className="nav nav-tabs mb-4">
        <a
          className={`nav-item nav-link ${activeTab === 'issue' ? 'active' : ''}`}
          onClick={() => setActiveTab('issue')}
        >
          Issue Book
        </a>
        <a
          className={`nav-item nav-link ${activeTab === 'return' ? 'active' : ''}`}
          onClick={() => setActiveTab('return')}
        >
          Return Book
        </a>
      </div>

      {activeTab === 'issue' && (
        <div>
          <div className="form-group mb-2">
            <label>Select User</label>
            <select
              className="form-control"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-2">
            <label>Select Book</label>
            <select
              className="form-control"
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
            >
              <option value="">-- Select Book --</option>
              {books.map((book) => (
                <option key={book._id} value={book.title}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-2">
            <label>Issue Date</label>
            <input
              type="date"
              className="form-control"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
          </div>

          <div className="form-group mb-2">
            <label>Due Date</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={handleIssueBook}>Issue Book</button>
        </div>
      )}

      {activeTab === 'return' && (
        <div>
          <div className="form-group mb-2">
            <label>Select User</label>
            <select
              className="form-control"
              value={userIdToReturn}
              onChange={(e) => setUserIdToReturn(e.target.value)}
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-2">
            <label>Select Book</label>
            <select
              className="form-control"
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
            >
              <option value="">-- Select Book --</option>
              {books.map((book) => (
                <option key={book._id} value={book.title}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-danger" onClick={handleReturnBook}>Return Book</button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;