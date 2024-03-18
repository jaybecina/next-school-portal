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

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const NewsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [newsList, setNewsList] = useState(null);
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
    newses,
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
    const { redirect, selectedId } = onClickNewsPurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchNewsDetails id: ", selectedId);
      dispatch(fetchNewsDetails(onClickNewsPurposeData?.selectedId));
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickNewsPurposeData]);

  useEffect(() => {
    let mounted = true;
    if (newsDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "newsDetails",
        JSON.stringify(newsDetails?.data?.data)
      );

      router.push("/news-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [newsDetails]);

  useEffect(() => {
    const fetchNewsSearch = async (searchData) => {
      const response = await getSearchNews(
        searchData?.keyword,
        searchData?.field
      );

      setNewsList(response?.data?.data);

      console.log("fetchNewsSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchNewsSearch(searchData);
    } else if (
      newses?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setNewsList(newses?.data?.data);
    } else {
      setNewsList([]);
    }
  }, [searchData, newses]);

  if (newsIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "body", "author"];

  return (
    <div>
      <Jumbotron
        title="News"
        // subtitle="Showcasing the Moments from Our News"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={true}
      />
      <div className="d-flex justify-content-center align-items-center">
        {newsList?.length > 0 ? (
          <CardGroup
            data={newsList}
            itemsPerPage={8}
            onClickPurposeData={onClickNewsPurposeData}
            setOnClickPurposeData={setOnClickNewsPurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default NewsPage;
