
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container">
        <div className="row">
         
          <div className="col-12 col-md-4 text-center">
            <p>"A book is a door that opens to new worlds. Reading lets us walk through, explore ideas, and discover endless possibilities."</p>
          </div>

         
          <div className="col-12 col-md-4 text-center">
            <h5>Contact Information</h5>
            <p>Email: support@library.com</p>
            <p>Phone: (+94)79456-7890</p>
          </div>

          
          <div className="col-12 col-md-4 text-center">
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white">About Us</a></li>
              
              <li><a href="/terms" className="text-white">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center flex-wrap mt-4">
          <p className="m-0 text-center">© 2024 Library Management System. All rights reserved.</p>
          <p className="m-0 text-center">Developed by Chamodi Chethana</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;