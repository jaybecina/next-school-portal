"use client";
import React, { useState } from "react";

const Jumbotron = ({
  title,
  subtitle,
  dropdownSearchArr,
  searchData,
  setSearchData,
  hasSearchInput,
}) => {
  const [selectedField, setSelectedField] = useState("all");
  const [keyword, setKeyword] = useState("");

  const handleDropdownChange = (dropdown) => {
    setSelectedField(dropdown);
    console.log("Selected field:", dropdown);
  };

  const handleSearch = () => {
    const newNearchData = {
      keyword,
      field: selectedField,
    };

    setSearchData(newNearchData);

    console.log("New search data:", newNearchData);
  };

  const capitalizeEveryWord = (str) => {
    // Split the string into words, capitalize each word, then join them back together
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  return (
    <>
      <div
        className="jumbotron jumbotron-fluid position-relative overlay-bottom"
        style={{ marginBottom: 90 }}
      >
        <div className="container text-center my-5 py-5">
          {/* <h4 className="text-secondary text-uppercase mt-4 mb-3">
            {subtitle}
          </h4>
          <div className="flex justify-center">
            <div className="flex justify-center">
              <hr className="bg-red-400 h-1 w-10 m-2" />
            </div>
            <div className="flex justify-center">
              <hr className="bg-red-400 h-1 w-10 m-2" />
            </div>
          </div> */}
          <h1 className="text-white text-uppercase display-3 mb-4">{title}</h1>

          {hasSearchInput && (
            <div
              className="mx-auto mb-5"
              style={{ width: "100%", maxWidth: 600 }}
            >
              <div className="input-group">
                <div className="input-group-prepend">
                  <button
                    className="btn btn-outline-light bg-white text-body px-4 dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {selectedField?.toUpperCase() || capitalizeEveryWord(page)}
                  </button>
                  <div className="dropdown-menu">
                    {dropdownSearchArr?.map((dropdown) => (
                      <>
                        <div
                          onClick={() => handleDropdownChange(dropdown)}
                          className={`dropdown-item ${
                            selectedField === dropdown ? " active" : ""
                          }`}
                        >
                          {capitalizeEveryWord(dropdown)}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control border-light"
                  style={{ padding: "30px 25px" }}
                  placeholder="Search Keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    onClick={handleSearch}
                    className="btn btn-secondary px-4 px-lg-5"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Jumbotron;
