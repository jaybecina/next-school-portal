"use client";
import React from "react";
import { Card } from "antd";
const { Meta } = Card;
import { doSpace } from "@/app/utils/getSpaceImage";

const CardDetail = ({ title, description, imageUrl }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Card Details</h1>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="example" src={imageUrl} />}
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    </div>
  );
};

export default CardDetail;
