function Footer() {
  return (
    <footer id="footer">
      <div className="title-wrapper" id="footer-util">
        <h2 className="title">
          {/* <span>Let's get in contact :)</span> */}
          <span>Let's work together :)</span>
        </h2>
        <div className="footer-links-text">
          <a href="">My CV</a>
          <a href="mailto:nichogo@proton.me">Email - nichogo@proton.me</a>
          <p>-------------------------</p>
          <a href="https://www.linkedin.com/in/maksym-tovstolis-509597256/" target="_blank">LinkedIn</a>
          <a href="https://github.com/lifeconsciousness" target="_blank">GitHub</a>

        </div>
      </div>

      <div className="flower-container">
        <img className="flower" src="flower.svg" alt="flower" />
      </div>
    </footer>
  );
}

export default Footer;
