import "./HpFooter.css";
import facebook from "../assets/facebook-logo.png";
import instagram from "../assets/instagram-logo.png";
import twitter from "../assets/twitter-logo.png";
import youtube from "../assets/youtube-logo.png";

export function HpFooter() {
  return (
    <footer className="footer">
      <aside className="footer__sidebar">
        <div className="footer__sidebar__text">
          <h2>JuvoStack</h2>
          <h3>One for all!</h3>
        </div>

        <div className="footer__sidebar__socials">
          <h4>Stay connected</h4>

          <div className="socials-container">
            <a href="https://www.facebook.com/" target="_blank">
              <img src={facebook} alt="facebook logo" />
            </a>

            <a href="https://www.instagram.com/" target="_blank">
              <img src={instagram} alt="instagram logo" />
            </a>

            <a href="https://www.twitter.com/" target="_blank">
              <img src={twitter} alt="twitter logo" />
            </a>

            <a href="https://www.youtube.com/" target="_blank">
              <img src={youtube} alt="youtube logo" />
            </a>
          </div>
        </div>
      </aside>

      <div className="footer__navigation-container">
        <div className="footer__nav-menus-section">
          <div className="footer__nav-menu">
            <h3>Explore</h3>
            <nav>
              <ul>
                <a href="#">
                  <li>Home</li>
                </a>
                <a href="#">
                  <li>Services</li>
                </a>
                <a href="">
                  <li>Plans & Pricing</li>
                </a>
              </ul>
            </nav>
          </div>

          <div className="footer__nav-menu">
            <h3>About Us</h3>
            <nav>
              <ul>
                <a href="">
                  <li>Careers</li>
                </a>
                <a href="">
                  <li>Company</li>
                </a>
                <a href="">
                  <li>Founder's Speech</li>
                </a>
              </ul>
            </nav>
          </div>

          <div className="footer__nav-menu">
            <h3>Help Center</h3>
            <nav>
              <ul>
                <a href="">
                  <li>Support</li>
                </a>
                <a href="">
                  <li>Contact Us</li>
                </a>
                <a href="">
                  <li>Activation & Registration</li>
                </a>
              </ul>
            </nav>
          </div>
        </div>
        <div className="footer__bottom-notes">
          <nav className="legal-notes">
            <ul className="legal-notes__items">
              <a href="">
                <li>Terms Of Use</li>
              </a>
              <a href="">
                <li>Privacy</li>
              </a>
              <a href="">
                <li>Cookies</li>
              </a>
              <a href="">
                <li>Refund Policy</li>
              </a>
              <a href="">
                <li>FAQ</li>
              </a>
            </ul>
          </nav>
          <p>&copy; 2022 JuvoStack LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
