"use client";
import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";

const OverflowText = ({ text, textLen = 50 }) => {
  const [spanText, setSpanText] = useState("");

  useEffect(() => {
    const truncatedText =
      text?.length > textLen ? `${text.slice(0, textLen)}...` : text;

    if (truncatedText) {
      setSpanText(truncatedText);
    }
  }, [text]);

  return (
    <>
      <Tooltip title={text}>
        <p>{spanText}</p>
      </Tooltip>
    </>
  );
};

export default OverflowText;
