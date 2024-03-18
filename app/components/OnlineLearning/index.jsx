import React from "react";
import CardGroup from "../CardGroup";

const OnlineLearning = ({ data, itemsPerPage }) => {
  return (
    <>
      <div className="container-fluid px-0 py-5">
        <div className="row mx-0 justify-content-center pt-5">
          <div className="col-lg-6">
            <div className="section-title text-center position-relative mb-4">
              <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                Our Online Learning
              </h6>
              <h1 className="display-4">
                Checkout New Releases Of Our Online Learning
              </h1>
            </div>
          </div>
        </div>
        <CardGroup data={data} itemsPerPage={itemsPerPage} />
        <div className="row justify-content-center bg-image mx-0 mb-5">
          <div className="col-lg-6 py-5">
            <div className="bg-white p-5 my-5">
              <h1 className="text-center mb-4">50% Off For New Students</h1>
              <form>
                <div className="form-row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        placeholder="Your Name"
                        style={{ padding: "30px 20px" }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control bg-light border-0"
                        placeholder="Your Email"
                        style={{ padding: "30px 20px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <select
                        className="custom-select bg-light border-0 px-3"
                        style={{ height: 60 }}
                      >
                        <option selected="">Select A courses</option>
                        <option value={1}>courses 1</option>
                        <option value={2}>courses 1</option>
                        <option value={3}>courses 1</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      style={{ height: 60 }}
                    >
                      Sign Up Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineLearning;
