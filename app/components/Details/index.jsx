"use client";
import React, { useState, useEffect } from "react";
import { Button, Card } from "antd";
import YouTube from "react-youtube";
const { Meta } = Card;

const Details = ({ data }) => {
  const [detailInfo, setDetailInfo] = useState(null);

  const goBack = () => {
    window.history.back(); // This will navigate to the previous page in the history stack
  };

  useEffect(() => {
    let mounted = true;

    if (data && mounted) {
      setDetailInfo(data);
    }

    return () => {
      mounted = false;
    };
  }, [data]);

  const opts = {
    height: "500px",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="flex justify-end mb-3">
            <Button onClick={goBack}>Back</Button>
          </div>
          <div className="row">
            {detailInfo?.path && (
              <div className="col-lg-5" style={{ minHeight: "400px" }}>
                <div className="position-relative h-100">
                  <img
                    className="position-absolute w-100 h-100"
                    src={
                      detailInfo?.path
                        ? process.env.NEXT_PUBLIC_API_ROOT_URL +
                          detailInfo?.path
                        : "img/no-image.png"
                    }
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            )}

            {detailInfo?.videoId && (
              <div className="col-lg-10" style={{ minHeight: "600px" }}>
                <div className="position-relative h-100">
                  <YouTube videoId={detailInfo?.videoId} opts={opts} />
                </div>
              </div>
            )}

            <div
              className={`${
                detailInfo?.path ? "col-lg-7" : "col-lg-12"
              } mb-5 mb-lg-0`}
            >
              <div className="section-title position-relative mb-4">
                <h1 className="display-4">
                  {detailInfo?.name || detailInfo?.title}
                </h1>
              </div>
              <p className="mb-4 pb-2">
                {detailInfo?.details || detailInfo?.body || detailInfo?.desc}
              </p>
              {detailInfo?.author && (
                <p className="mb-4 pb-2">By: {detailInfo?.author}</p>
              )}
              {detailInfo?.start_date && (
                <p className="mb-4 pb-2">
                  Start Date: {detailInfo?.start_date}
                </p>
              )}
              {detailInfo?.end_date && (
                <p className="mb-4 pb-2">Start Date: {detailInfo?.end_date}</p>
              )}
              {detailInfo?.speaker_name && (
                <p className="mb-4 pb-2">Speaker: {detailInfo?.speaker_name}</p>
              )}
              {detailInfo?.credits && (
                <p className="mb-4 pb-2">Credits: {detailInfo?.credits}</p>
              )}
              {/* <div className="d-flex mb-3">
                <div className="btn-icon bg-primary mr-4">
                  <i className="fa fa-2x fa-graduation-cap text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Skilled Instructors</h4>
                  <p>
                    Labore rebum duo est Sit dolore eos sit tempor eos stet,
                    vero vero clita magna kasd no nonumy et eos dolor magna
                    ipsum.
                  </p>
                </div>
              </div> */}
              {/* <div className="d-flex mb-3">
                <div className="btn-icon bg-secondary mr-4">
                  <i className="fa fa-2x fa-certificate text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>International Certificate</h4>
                  <p>
                    Labore rebum duo est Sit dolore eos sit tempor eos stet,
                    vero vero clita magna kasd no nonumy et eos dolor magna
                    ipsum.
                  </p>
                </div>
              </div> */}
              {/* <div className="d-flex">
                <div className="btn-icon bg-warning mr-4">
                  <i className="fa fa-2x fa-book-reader text-white"></i>
                </div>
                <div className="mt-n1">
                  <h4>Online Classes</h4>
                  <p className="m-0">
                    Labore rebum duo est Sit dolore eos sit tempor eos stet,
                    vero vero clita magna kasd no nonumy et eos dolor magna
                    ipsum.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
