
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; 
import Header from './manage/Header';
import Footer from './manage/Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      
      
      <section 
        className="hero-section text-center text-white" 
        style={{ 
          backgroundImage: 'url(library-banner.jpg)', 
          backgroundSize: 'cover', 
          padding: '120px 0', 
          position: 'relative' 
        }}
      >
    
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 1 
          }} 
        />
        
        <div 
          className="container" 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 2 
          }}
        >
          <h1 className="display-4 fw-bold mb-4">Welcome to Our Library</h1>
          <p className="lead fs-4 mb-4">Explore books, manage your reading list, and much more!</p>
         
        </div>
      </section>

      
      <section 
        id="about" 
        className="about-section text-center" 
        style={{ backgroundColor: '#f0f8ff', padding: '60px 0' }}
      >
        <div className="container">
          <h2 className="display-4 text-primary mb-4">About Our Library</h2>
          <p className="lead fs-4 mb-4">We offer a wide range of books, journals, and other resources to cater to your reading needs. Our mission is to foster a love for reading and learning.</p>
        </div>
      </section>

     
      <section 
        id="features" 
        className="features-section text-center" 
        style={{ padding: '60px 0' }}
      >
        <div className="container">
          <h2 className="display-4 text-primary mb-5">Our Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-lg border-0 rounded">
                <img src=".\assets\lib1.jpg" className="card-img-top" alt="Feature 1" style={{ height: '300px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">Wide Collection</h5>
                  <p className="card-text">Explore a vast collection of books, journals, and resources in various genres.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-lg border-0 rounded">
                <img src=".\assets\lib2.jpg" className="card-img-top" alt="Feature 2" style={{ height: '300px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">Online Catalog</h5>
                  <p className="card-text">Browse our online catalog anytime to discover new books and resources.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-lg border-0 rounded">
                <img src=".\assets\lib3.PNG" className="card-img-top" alt="Request Book" style={{ height: '300px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">Request a Book</h5>
                  <p className="card-text">You can request a book of your choice anytime, anywhere.
                  </p>
             
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
      ></script>
    </div>
  );
};

export default HomePage;