"use client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Button, Card } from "antd";
const { Meta } = Card;
import { doSpace } from "@/app/utils/getSpaceImage";

const CustomMediaPlayer = ({ data }) => {
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

  return (
    <>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="flex justify-end mb-3">
            <Button onClick={goBack}>Back</Button>
          </div>
          {detailInfo?.path && (
            <div className="position-relative h-100 mb-4">
              <ReactPlayer
                url={detailInfo?.path}
                controls={true}
                width="100%"
                height="auto"
              />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomMediaPlayer;
