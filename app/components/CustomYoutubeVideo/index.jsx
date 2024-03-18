"use client";
import { Button } from "antd";
import React, { useState } from "react";
import YouTube from "react-youtube";
import ReactPaginate from "react-paginate";
import OverflowText from "@/app/components/OverflowText";

const CustomYoutubeVideo = ({
  data,
  itemsPerPage,
  onClickPurposeData,
  setOnClickPurposeData,
}) => {
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  // const [dispatchId, setIsDispatchId] = useState(null);

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

  return (
    <div>
      <div className="h-fit w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-4 p-4">
        {currentItems?.map((item, index) => (
          <div
            key={index}
            className={`h-full border rounded-lg overflow-hidden shadow-md hover:shadow-lg`}
          >
            <YouTube videoId={item.videoId} opts={opts} />
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

export default CustomYoutubeVideo;
