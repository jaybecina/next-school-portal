"use client";
import React from "react";

const NoRecord = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">No Record Found</h5>
              <p className="card-text">Sorry, there are no record/s.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoRecord;
