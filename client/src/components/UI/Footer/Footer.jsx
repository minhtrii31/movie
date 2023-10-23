import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="row justify-content-center">
        <div className="col-md-9 text-center">
          <div className="footer-site-logo mb-4">
            <Link>Mvie</Link>
          </div>
          <div className="list-unstyled nav-links mb-5">
            <ul className="list-unstyled nav-links mb-5">
              <li>
                <Link>About</Link>
              </li>
              <li>
                <Link>Movie</Link>
              </li>
              <li>
                <Link>Top Movie</Link>
              </li>
              <li>
                <Link>FAQ</Link>
              </li>
              <li>
                <Link>Legal</Link>
              </li>
              <li>
                <Link>Contact</Link>
              </li>
            </ul>
            <div className="social mb-4">
              <h3>Stay in touch</h3>
              <ul className="list-unstyled">
                <li className="in">
                  <Link>
                    <i className="bi bi-instagram"></i>
                  </Link>
                </li>
                <li className="fb">
                  <Link>
                    <i className="bi bi-facebook"></i>
                  </Link>
                </li>
                <li className="tw">
                  <Link>
                    <i className="bi bi-twitter"></i>
                  </Link>
                </li>
                <li className="pin">
                  <Link>
                    <i className="bi bi-pinterest"></i>
                  </Link>
                </li>
                <li className="dr">
                  <Link>
                    <i className="bi bi-dribble"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="copyright">
              <p className="mb-0">
                <small>&copy; Mvie. All Rights Reserved.</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
