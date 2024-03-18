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
import Details from "../components/Details/index.jsx";
import CustomMediaPlayer from "../components/CustomMediaPlayer/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const OnlineLearningDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [onlineLearningInfo, setOnlineLearningInfo] = useState(null);
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

    if (mounted) {
      let getDetailsData = null;
      if (onlineLearningDetails?.data) {
        getDetailsData = onlineLearningDetails?.data?.data;
      } else {
        const onlineLearningDetailsLocSto = JSON.parse(
          localStorage.getItem("onlineLearningDetails")
        );
        getDetailsData = onlineLearningDetailsLocSto;
      }
      setOnlineLearningInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [onlineLearningDetails]);

  return (
    <div>
      <Jumbotron
        hasSearchInput={false}
        title="OnlineLearning Details"
        // subtitle="Detailed Information of this OnlineLearning"
      />
      <div className="d-flex justify-content-center align-items-center">
        {onlineLearningInfo ? (
          <CustomMediaPlayer data={onlineLearningInfo} />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default OnlineLearningDetailsPage;
