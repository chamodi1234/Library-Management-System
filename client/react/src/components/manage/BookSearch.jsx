
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const BookSearch = ({ onRequestBook }) => {
  const [searchQuery, setSearchQuery] = useState({
    author: '',
    genre: '',
    title: '',
  });

  const userEmail = localStorage.getItem('userEmail'); 
  const [books, setBooks] = useState([]);
  const [showBookList, setShowBookList] = useState(false);
  const [searchBy, setSearchBy] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const debounceSearch = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  
  const handleSearch = debounceSearch(() => {
    let queryString = `http://localhost:5000/api/books1?`;

    
    if (searchBy === 'author' && searchQuery.author) {
      queryString += `author=${searchQuery.author}`;
    } else if (searchBy === 'genre' && searchQuery.genre) {
      queryString += `genre=${searchQuery.genre}`;
    } else if (searchBy === 'title' && searchQuery.title) {
      queryString += `title=${searchQuery.title}`;
    } else {
      setBooks([]); 
      return;
    }

    setLoading(true); 
    axios
      .get(queryString)
      .then((response) => {
        setBooks(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false); 
      });
  }, 500); 
  useEffect(() => {
    if (showBookList) {
      handleSearch(); 
    } else {
      setBooks([]); 
    }
  }, [showBookList, searchBy, searchQuery]);

 
  const handleButtonClick = (field) => {
    setSearchBy(field);
    setShowBookList(false); 
    setSearchQuery({ ...searchQuery, [field]: '' }); 
  };

 
  const handleBookRequest = (bookId) => {
    const userEmail = localStorage.getItem('userEmail'); 
    const message = 'Please approve my book request';

    if (!userEmail) {
    
      setRequestStatus('User is not logged in.');
      return;
    }

    axios
      .post('http://localhost:5000/api/bookRequests1', { bookId, userEmail, message })
      .then((response) => {
        setRequestStatus('Request sent to the admin successfully!');
        navigate('/request-confirmation');  
      })
      .catch((error) => {
        setRequestStatus('Error sending request to admin.');
        console.error('Error sending request:', error.response || error.message);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Search Books</h1>
      
      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group">
          <button
            className={`btn btn-outline-primary ${searchBy === 'author' ? 'active' : ''}`}
            onClick={() => handleButtonClick('author')}
          >
            Search by Author
          </button>
          <button
            className={`btn btn-outline-primary ${searchBy === 'genre' ? 'active' : ''}`}
            onClick={() => handleButtonClick('genre')}
          >
            Search by Genre
          </button>
          <button
            className={`btn btn-outline-primary ${searchBy === 'title' ? 'active' : ''}`}
            onClick={() => handleButtonClick('title')}
          >
            Search by Title
          </button>
        </div>
      </div>

      <div className="form-group mb-4">
        {searchBy === 'author' && (
          <input
            type="text"
            className="form-control"
            placeholder="Enter Author's Name"
            value={searchQuery.author}
            onChange={(e) =>
              setSearchQuery({ ...searchQuery, author: e.target.value })
            }
          />
        )}
        {searchBy === 'genre' && (
          <input
            type="text"
            className="form-control"
            placeholder="Enter Genre"
            value={searchQuery.genre}
            onChange={(e) =>
              setSearchQuery({ ...searchQuery, genre: e.target.value })
            }
          />
        )}
        {searchBy === 'title' && (
          <input
            type="text"
            className="form-control"
            placeholder="Enter Book Title"
            value={searchQuery.title}
            onChange={(e) =>
              setSearchQuery({ ...searchQuery, title: e.target.value })
            }
          />
        )}
      </div>

      <div className="d-flex justify-content-center mb-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowBookList(!showBookList)}
        >
          {showBookList ? 'Hide Search Results' : 'Show Search Results'}
        </button>
      </div>

      {requestStatus && (
        <div className="alert alert-info text-center">{requestStatus}</div>
      )}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        showBookList && (
          <div className="table-responsive">
            <h3 className="text-center mb-4">Available Books</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleBookRequest(book._id)}
                      >
                        Request Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default BookSearch;