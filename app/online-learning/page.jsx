"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllOnlineLearning,
  fetchOnlineLearningDetails,
} from "../redux/features/onlineLearnings/onlineLearningSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchOnlineLearning } from "../services/onlineLearningService.js";
import NoRecord from "../components/NoRecord/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const OnlineLearningPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [onlineLearningList, setOnlineLearningList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [
    onClickOnlineLearningPurposeData,
    setOnClickOnlineLearningPurposeData,
  ] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    onlineLearnings,
    onlineLearningDetails,
    onlineLearningIsError,
    onlineLearningIsSuccess,
    onlineLearningIsLoading,
    onlineLearningMessage,
  } = useSelector((state) => state.onlineLearnings);

  useEffect(() => {
    // handleGetOnlineLearningAll();

    dispatch(fetchAllOnlineLearning());
  }, []);

  useEffect(() => {
    if (!user?.user) {
      toast.error("Unauthorized access");

      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;
    const { redirect, selectedId } = onClickOnlineLearningPurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchOnlineLearningDetails id: ", selectedId);
      dispatch(
        fetchOnlineLearningDetails(onClickOnlineLearningPurposeData?.selectedId)
      );
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickOnlineLearningPurposeData]);

  useEffect(() => {
    let mounted = true;
    if (onlineLearningDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "onlineLearningDetails",
        JSON.stringify(onlineLearningDetails?.data?.data)
      );

      router.push("/online-learning-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onlineLearningDetails]);

  useEffect(() => {
    const fetchOnlineLearningSearch = async (searchData) => {
      const response = await getSearchOnlineLearning(
        searchData?.keyword,
        searchData?.field
      );

      setOnlineLearningList(response?.data?.data);

      console.log("fetchOnlineLearningSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchOnlineLearningSearch(searchData);
    } else if (
      onlineLearnings?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setOnlineLearningList(onlineLearnings?.data?.data);
    } else {
      setOnlineLearningList([]);
    }
  }, [searchData, onlineLearnings]);

  if (onlineLearningIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "desc"];

  return (
    <div>
      <Jumbotron
        title="OnlineLearning Gallery Page"
        // subtitle="Showcasing the Moments from Our OnlineLearning"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={true}
      />
      <div className="d-flex justify-content-center align-items-center">
        {onlineLearningList?.length > 0 ? (
          <CardGroup
            useImageDefault="https://upload.wikimedia.org/wikipedia/commons/6/63/Video_play_icon.png"
            data={onlineLearningList}
            itemsPerPage={8}
            onClickPurposeData={onClickOnlineLearningPurposeData}
            setOnClickPurposeData={setOnClickOnlineLearningPurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default OnlineLearningPage;
