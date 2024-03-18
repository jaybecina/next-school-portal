"use client";
import React, { useState, useEffect } from "react";
import { doSpace } from "@/app/utils/getSpaceImage";

const About = ({ data }) => {
  const [aboutDetails, setAboutDetails] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setAboutDetails(data);
    }

    return () => {
      mounted = false;
    };
  }, [data]);
  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: 500 }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 h-100"
                src={
                  aboutDetails?.path
                    ? aboutDetails?.path
                    : "https://photoshopstar.com/tutorials/36/03big.jpg"
                }
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="section-title position-relative mb-4">
              <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                {aboutDetails?.title}
              </h6>
              {/* <h1 className="display-4">
                  First Choice For Online Education Anywhere
                </h1> */}
            </div>
            <p>{aboutDetails?.body}</p>
            {/* <div className="row pt-3 mx-0">
                <div className="col-3 px-0">
                  <div className="bg-success text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">
                      123
                    </h1>
                    <h6 className="text-uppercase text-white">
                      Available<span className="d-block">Subjects</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-primary text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">
                      1234
                    </h1>
                    <h6 className="text-uppercase text-white">
                      Online<span className="d-block">Courses</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-secondary text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">
                      123
                    </h1>
                    <h6 className="text-uppercase text-white">
                      Skilled<span className="d-block">Instructors</span>
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0">
                  <div className="bg-warning text-center p-4">
                    <h1 className="text-white" data-toggle="counter-up">
                      1234
                    </h1>
                    <h6 className="text-uppercase text-white">
                      Happy<span className="d-block">Students</span>
                    </h6>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
