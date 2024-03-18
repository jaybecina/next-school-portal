"use client";
import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import OverflowText from "@/app/components/OverflowText";
import { doSpace } from "@/app/utils/getSpaceImage";

const CardGroup = ({
  useImageDefault = null,
  data,
  itemsPerPage,
  onClickPurposeData,
  setOnClickPurposeData,
}) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  // const [dispatchId, setIsDispatchId] = useState(null);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleOnClick = (id) => {
    console.log(`CardGroup handleOnClick id: ${id}`);
    const { redirect } = onClickPurposeData;
    if (redirect) {
      setOnClickPurposeData((prevState) => ({
        ...prevState,
        selectedId: id,
      }));
    }
  };

  const getImageUrl = async (imageName) => {
    const imageUrl = await getSpaceImage(imageName);
    return imageUrl;
  };

  return (
    <div>
      <div className="h-fit w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-4 p-4">
        {currentItems?.map((item, index) => (
          <div
            key={index}
            className={`${
              item?.path ? "" : "h-full"
            } border rounded-lg bg-white overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105`}
            style={{ width: 340 }}
          >
            <div style={{ width: 340 }}>
              <img
                src={!useImageDefault ? item?.path : useImageDefault}
                alt={item.title || item.name}
                className="w-full h-70 lg:h-80 object-cover"
                style={{ width: "100%" }}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {item.title || item.name}
              </h2>
              <div className="mt-2 text-gray-600">
                <OverflowText
                  text={
                    item.description || item.details || item.body || item.desc
                  }
                />
              </div>
              {item.creditHours && (
                <p className="mt-2 text-gray-600">
                  {item.creditHours} Credit Hour
                  {parseInt(item.creditHours) > 1 && "s"}
                </p>
              )}
              {item.department && (
                <p className="mt-2 text-gray-600">{item.department}</p>
              )}
              {item.author && (
                <p className="mt-2 text-gray-600">By: {item.author}</p>
              )}
              {item?.student_members &&
                item?.student_members?.some(
                  (student) => student.id === user?.user.id
                ) && (
                  <div className="flex items-center">
                    <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs font-semibold mr-2 mb-3">
                      Member
                    </span>
                  </div>
                )}
              <Button
                type="default"
                className="bg-blue-600 hover:bg-blue-800 rounded-md text-white"
                onClick={() => handleOnClick(item.id)}
              >
                Click to Check Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 flex justify-center">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default CardGroup;
