"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllVirtualTour,
  fetchVirtualTourDetails,
} from "../redux/features/virtualTours/virtualTourSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchVirtualTour } from "../services/virtualTourService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import CustomYoutubeVideo from "../components/CustomYoutubeVideo";

const VirtualTourPage = () => {
  const videoId = "LlCwHnp3kL4";

  const dispatch = useDispatch();
  const router = useRouter();

  const [virtualTourList, setVirtualTourList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickVirtualTourPurposeData, setOnClickVirtualTourPurposeData] =
    useState({
      redirect: "true",
      selectedId: null,
    });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    virtualTours,
    virtualTourDetails,
    virtualTourIsError,
    virtualTourIsSuccess,
    virtualTourIsLoading,
    virtualTourMessage,
  } = useSelector((state) => state.virtualTours);

  useEffect(() => {
    // handleGetVirtualTourAll();

    dispatch(fetchAllVirtualTour());
  }, []);

  // useEffect(() => {
  //   if (!user?.user) {
  //     toast.error("Unauthorized access");

  //     redirect("/");
  //   }
  // }, [user]);

  useEffect(() => {
    let mounted = true;
    const { redirect, selectedId } = onClickVirtualTourPurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchVirtualTourDetails id: ", selectedId);
      dispatch(
        fetchVirtualTourDetails(onClickVirtualTourPurposeData?.selectedId)
      );
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickVirtualTourPurposeData]);

  useEffect(() => {
    let mounted = true;
    if (virtualTourDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "virtualTourDetails",
        JSON.stringify(virtualTourDetails?.data?.data)
      );

      router.push("/virtual-tour-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [virtualTourDetails]);

  useEffect(() => {
    const fetchVirtualTourSearch = async (searchData) => {
      const response = await getSearchVirtualTour(
        searchData?.keyword,
        searchData?.field
      );

      setVirtualTourList(response?.data?.data);

      console.log("fetchVirtualTourSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchVirtualTourSearch(searchData);
    } else if (
      virtualTours?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setVirtualTourList(virtualTours?.data?.data);
    } else {
      setVirtualTourList([]);
    }
  }, [searchData, virtualTours]);

  if (virtualTourIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "desc", "author"];

  return (
    <div>
      <Jumbotron
        title="Virtual Tour"
        // subtitle="Showcasing the Moments from Our VirtualTour"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={true}
      />
      <div className="d-flex justify-content-center align-items-center">
        {virtualTourList?.length > 0 ? (
          <CustomYoutubeVideo
            data={virtualTourList}
            itemsPerPage={8}
            onClickPurposeData={onClickVirtualTourPurposeData}
            setOnClickPurposeData={setOnClickVirtualTourPurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default VirtualTourPage;
