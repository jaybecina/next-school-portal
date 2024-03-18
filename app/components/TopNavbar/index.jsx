import React from "react";

const TopNavbar = () => {
  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row py-2 px-lg-4">
          <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0 lg:px-0">
            <div className="d-inline-flex align-items-center text-white lg:px-0">
              <small>
                <i className="fa fa-phone-alt mr-2" />
                +012 345 6789
              </small>
              <small className="px-3">|</small>
              <small>
                <i className="fa fa-envelope mr-2" />
                kllportal@mail.com
              </small>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right lg:px-0">
            <div className="lg:px-0">
              <a className="text-white px-2" href="">
                <i className="fab fa-facebook-f" />
              </a>
              <a className="text-white px-2" href="">
                <i className="fab fa-twitter" />
              </a>
              <a className="text-white px-2" href="">
                <i className="fab fa-linkedin-in" />
              </a>
              <a className="text-white px-2" href="">
                <i className="fab fa-instagram" />
              </a>
              <a className="text-white pl-2 pr-0" href="">
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
