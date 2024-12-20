
import axios from 'axios';
import { useEffect, useState } from 'react';

const BooksManagement = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    uniqueId: '',
    title: '',
    author: '',
    genre: '',
    isbn: '',
    availableCopies: '',
  });
  const [showBookList, setShowBookList] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/books1')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  const clearForm = () => {
    setNewBook({
      uniqueId: '',
      title: '',
      author: '',
      genre: '',
      isbn: '',
      availableCopies: '',
    });
  };

  const handleAddBook = () => {
    const { uniqueId, title, author, genre, isbn, availableCopies, _id } = newBook;

    if (!uniqueId || !title || !author || !genre || !isbn || !availableCopies) {
      alert('All fields are required.');
      return;
    }

    const payload = { uniqueId, title, author, genre, isbn, availableCopies: Number(availableCopies) };

    if (_id) {
      axios
        .put(`http://localhost:5000/api/books1/${_id}`, payload)
        .then((response) => {
          setBooks(books.map((book) => (book._id === _id ? response.data : book)));
          clearForm(); 
        })
        .catch((error) => alert('Error updating book: ' + error.message));
    } else {
      axios
        .post('http://localhost:5000/api/books1', payload)
        .then((response) => {
          setBooks([...books, response.data]);
          clearForm(); 
        })
        .catch((error) => alert('Error adding book: ' + error.message));
    }
  };

  const handleRemoveBook = (id) => {
    axios
      .delete(`http://localhost:5000/api/books1/${id}`)
      .then(() => setBooks(books.filter((book) => book._id !== id)))
      .catch((error) => alert('Error deleting book: ' + error.message));
  };

  const handleEditBook = (id) => {
    const bookToEdit = books.find((book) => book._id === id);
    if (bookToEdit) {
      setNewBook({ ...bookToEdit }); 
    }
  };

  const handleIssueBook = (id) => {
    axios
      .post(`http://localhost:5000/api/books1/issue/${id}`)
      .then(() => {
        alert('Book issued successfully!');
        clearForm(); 
      })
      .catch((error) => alert('Error issuing book: ' + error.message));
  };

  const handleReturnBook = (id) => {
    axios
      .post(`http://localhost:5000/api/books1/return/${id}`)
      .then(() => {
        alert('Book returned successfully!');
        clearForm(); 
      })
      .catch((error) => alert('Error returning book: ' + error.message));
  };

  return (
    <div className="container mt-4">
      <h2>Books Management</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h3>{newBook._id ? 'Edit Book' : 'Add Book'}</h3>
          <div className="form-group">
            <input
              type="text"
              className="form-control mb-2"
              value={newBook.uniqueId}
              onChange={(e) => setNewBook({ ...newBook, uniqueId: e.target.value })}
              placeholder="Unique Number"
              disabled={!!newBook._id}
            />
            <input
              type="text"
              className="form-control mb-2"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              placeholder="Title"
            />
            <input
              type="text"
              className="form-control mb-2"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              placeholder="Author"
            />
            <input
              type="text"
              className="form-control mb-2"
              value={newBook.genre}
              onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
              placeholder="Genre"
            />
            <input
              type="text"
              className="form-control mb-2"
              value={newBook.isbn}
              onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
              placeholder="ISBN"
            />
            <input
              type="number"
              className="form-control mb-2"
              value={newBook.availableCopies}
              onChange={(e) => setNewBook({ ...newBook, availableCopies: e.target.value })}
              placeholder="Available Copies"
            />
            <button className="btn btn-primary mb-2" onClick={handleAddBook}>
              {newBook._id ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowBookList(!showBookList)}
        >
          {showBookList ? 'Hide Book List' : 'View Book List'}
        </button>
      </div>

      {showBookList && (
        <div>
          <h3>Books List</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Unique ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Available Copies</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.uniqueId}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.isbn}</td>
                  <td>{book.availableCopies}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mr-2"
                      onClick={() => handleEditBook(book._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveBook(book._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BooksManagement;