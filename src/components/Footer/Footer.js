import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <div className="footcontent">
    <footer className="footer">
      <nav className="footNavBar">
        <ul>
          <li>&copy; Show Me Stainless :: Built by CDHIPPLE0</li>
          <a href="#" />
          <img src={require('../../Images/instagram.png')} />
          <a href="#" />
          <img src={require('../../Images/facebook.png')} />
        </ul>
      </nav>
    </footer>
  </div>
);

export default Footer;
