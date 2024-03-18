"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllExam,
  fetchExamDetails,
} from "../redux/features/exams/examSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchExam } from "../services/examService.js";
import NoRecord from "../components/NoRecord/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const ExamPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [examList, setExamList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickExamPurposeData, setOnClickExamPurposeData] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    exams,
    examDetails,
    examIsError,
    examIsSuccess,
    examIsLoading,
    examMessage,
  } = useSelector((state) => state.exams);

  useEffect(() => {
    // handleGetExamAll();

    dispatch(fetchAllExam());
  }, []);

  useEffect(() => {
    if (!user?.user) {
      toast.error("Unauthorized access");

      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;
    const { redirect, selectedId } = onClickExamPurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchExamDetails id: ", selectedId);
      dispatch(fetchExamDetails(onClickExamPurposeData?.selectedId));
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickExamPurposeData]);

  useEffect(() => {
    let mounted = true;
    if (examDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "examDetails",
        JSON.stringify(examDetails?.data?.data)
      );

      router.push("/exam-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [examDetails]);

  useEffect(() => {
    const fetchExamSearch = async (searchData) => {
      const response = await getSearchExam(
        searchData?.keyword,
        searchData?.field
      );

      setExamList(response?.data?.data);

      console.log("fetchExamSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchExamSearch(searchData);
    } else if (
      exams?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setExamList(exams?.data?.data);
    } else {
      setExamList([]);
    }
  }, [searchData, exams]);

  if (examIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "desc"];

  return (
    <div>
      <Jumbotron
        title="Exam Page"
        // subtitle="Collection of Exams"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={true}
      />
      <div className="d-flex justify-content-center align-items-center">
        {examList?.length > 0 ? (
          <CardGroup
            useImageDefault="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/.docx_icon.svg/2048px-.docx_icon.svg.png"
            data={examList}
            itemsPerPage={8}
            onClickPurposeData={onClickExamPurposeData}
            setOnClickPurposeData={setOnClickExamPurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default ExamPage;
