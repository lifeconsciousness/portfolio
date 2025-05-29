function Footer() {
  return (
    <footer id="footer">
      <div className="title-wrapper" id="footer-util">
        <h2 className="title">
          {/* <span>Let's get in contact :)</span> */}
          <span>Let's work together :)</span>
        </h2>
        <div className="footer-links-text">
          <a href="mailto:nichogo@proton.me">Email - nichogo@proton.me</a>
          <a href="">My CV</a>
          <p>-------------------------</p>
          <a href="https://www.linkedin.com/in/maksym-tovstolis-509597256/" target="_blank">LinkedIn</a>
          <a href="https://github.com/lifeconsciousness" target="_blank">GitHub</a>

        </div>
        {/* <ul className="footer-links">
          <li>
            <a className="contacts-link" href="https://github.com/lifeconsciousness" target="_blank">
              <img src="https://img.icons8.com/?size=100&id=62856&format=png&color=000000" alt="github-icon" />
            </a>
          </li>
          <li>
            <a className="contacts-link" href="https://github.com/lifeconsciousness" target="_blank">
              <img src="https://img.icons8.com/?size=100&id=62856&format=png&color=000000" alt="github-icon" />
            </a>
          </li>
          <li>
            <a className="contacts-link" href="https://github.com/lifeconsciousness" target="_blank">
              <img src="https://img.icons8.com/?size=100&id=62856&format=png&color=000000" alt="github-icon" />
            </a>
          </li>
        </ul> */}
      </div>

      <div className="flower-container">
        <img className="flower" src="flower.svg" alt="flower" />
      </div>
    </footer>

    // <footer>
    //     <div className="footer-content">
    //         <div className="footer-section">
    //             <h3>About Us</h3>
    //             <p>We are a leading company in our industry, committed to providing top-notch services and products to our clients worldwide.</p>
    //         </div>
    //         <div className="footer-section">
    //             <h3>Contact Us</h3>
    //             <p>Email: info@yourcompany.com</p>
    //             <p>Phone: +1 (555) 123-4567</p>
    //             <div className="social-media">
    //                 <a href="https://facebook.com" target="_blank"><i className="fab fa-facebook-f"></i></a>
    //                 <a href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i></a>
    //                 <a href="https://instagram.com" target="_blank"><i className="fab fa-instagram"></i></a>
    //             </div>
    //         </div>
    //     </div>
    //     <div style={{textAlign: "center", marginTop: "20px;"}}>
    //         <p>&copy; <span id="year"></span> Your Company Name. All rights reserved.</p>
    //     </div>
    // </footer>
  );
}

export default Footer;
