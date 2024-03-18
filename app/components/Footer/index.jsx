import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div
        className="container-fluid position-relative overlay-top bg-dark text-white-50 py-5"
        style={{ marginTop: 90 }}
      >
        <div className="container mt-5 pt-5">
          <div className="row">
            {/* <div className="col-md-6 mb-5">
              <a href="index.html" className="navbar-brand">
                <h4 className="mt-n2 text-uppercase text-white">
                  <i className="fa fa-book-reader mr-3" />
                  KLL Portal
                </h4>
              </a>
              <p className="m-0">
                Address: 9/F, Rockwell Business Center Tower 1, Ortigas Ave.,
                Ortigas Center, Brgy. Ugong, 1604, Pasig City, Philippines ‍
                Contact: support@kll.com.ph
              </p>
            </div> */}
            {/* <div className="col-md-6 mb-5">
              <h3 className="text-white mb-4">Newsletter</h3>
              <div className="w-100">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-light"
                    style={{ padding: 30 }}
                    placeholder="Your Email Address"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary px-4">Sign Up</button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="row">
            <div className="col-md-4 mb-5">
              <h3 className="text-white mb-4">Get In Touch</h3>
              <p>
                <i className="fa fa-map-marker-alt mr-2" />
                Centro Escolar University, Makati Campus, 259 Sen. Gil J. Puyat
                Ave, Makati, 1203 Metro Manila
              </p>
              <p>
                <i className="fa fa-phone-alt mr-2" />
                +012 345 67890
              </p>
              <p>
                <i className="fa fa-envelope mr-2" />
                support@kll.com.ph
              </p>
              {/* <div className="d-flex justify-content-start mt-4">
                <a className="text-white mr-4" href="#">
                  <i className="fab fa-2x fa-twitter" />
                </a>
                <a className="text-white mr-4" href="#">
                  <i className="fab fa-2x fa-facebook-f" />
                </a>
                <a className="text-white mr-4" href="#">
                  <i className="fab fa-2x fa-linkedin-in" />
                </a>
                <a className="text-white" href="#">
                  <i className="fab fa-2x fa-instagram" />
                </a>
              </div> */}
            </div>
            <div className="col-md-8 mb-5 flex justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.6728757721835!2d121.01013407510537!3d14.560689985920954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90845a0dbdf%3A0x7fb8ae12e5782c35!2sCentro%20Escolar%20University%2C%20Makati%20Campus!5e0!3m2!1sen!2sph!4v1702659058128!5m2!1sen!2sph"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            {/* <div className="col-md-4 mb-5">
              <h3 className="text-white mb-4">Our Courses</h3>
              <div className="d-flex flex-column justify-content-start">
                <a className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2" />
                  Web Design
                </a>
                <a className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2" />
                  Apps Design
                </a>
                <a className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2" />
                  Marketing
                </a>
                <a className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2" />
                  Research
                </a>
                <a className="text-white-50" href="#">
                  <i className="fa fa-angle-right mr-2" />
                  SEO
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h3 className="text-white mb-4">Quick Links</h3>
              <div className="d-flex flex-column justify-content-start">
                <a className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2" />
                  Privacy Policy
                </a>
                <a className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2" />
                  Terms &amp; Condition
                </a>
                <a className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2" />
                  Regular FAQs
                </a>
                <a className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2" />
                  Help &amp; Support
                </a>
                <a className="text-white-50" href="#">
                  <i className="fa fa-angle-right mr-2" />
                  Contact
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div
        className="container-fluid bg-dark text-white-50 border-top py-4"
        style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
              <p className="m-0">
                Copyright ©{" "}
                <Link className="text-white" href="/">
                  KLL Portal
                </Link>
                . All Rights Reserved.
              </p>
            </div>
            {/* <div className="col-md-6 text-center text-md-right">
              <p className="m-0">
                Designed by{" "}
                <a className="text-white" href="https://htmlcodex.com">
                  HTML Codex
                </a>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
