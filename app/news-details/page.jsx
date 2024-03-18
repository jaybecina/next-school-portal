"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllNews,
  fetchNewsDetails,
} from "../redux/features/news/newsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchNews } from "../services/newsService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import Details from "../components/Details/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const NewsDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [newsInfo, setNewsInfo] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickNewsPurposeData, setOnClickNewsPurposeData] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    newsDetails,
    newsIsError,
    newsIsSuccess,
    newsIsLoading,
    newsMessage,
  } = useSelector((state) => state.newses);

  useEffect(() => {
    // handleGetNewsAll();

    dispatch(fetchAllNews());
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
      if (newsDetails?.data) {
        getDetailsData = newsDetails?.data?.data;
      } else {
        const newsDetailsLocSto = JSON.parse(
          localStorage.getItem("newsDetails")
        );
        getDetailsData = newsDetailsLocSto;
      }
      setNewsInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [newsDetails]);

  return (
    <div>
      <Jumbotron
        hasSearchInput={false}
        title="News Details"
        // subtitle="Detailed Information of this News"
      />
      <div className="d-flex justify-content-center align-items-center">
        {newsInfo ? <Details data={newsInfo} /> : <NoRecord />}
      </div>
    </div>
  );
};

export default NewsDetailsPage;
