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
import Details from "../components/Details/index.jsx";
import CustomMSDocViewer from "../components/CustomMSDocViewer/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const ExamDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [examInfo, setExamInfo] = useState(null);
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

    if (mounted) {
      let getDetailsData = null;
      if (examDetails?.data) {
        getDetailsData = examDetails?.data?.data;
      } else {
        const examDetailsLocSto = JSON.parse(
          localStorage.getItem("examDetails")
        );
        getDetailsData = examDetailsLocSto;
      }
      setExamInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [examDetails]);

  return (
    <div>
      <Jumbotron
        hasSearchInput={false}
        title="Exam Details"
        // subtitle="Detailed Information of this Exam"
      />
      <div className="d-flex justify-content-center align-items-center">
        {examInfo ? <CustomMSDocViewer data={examInfo} /> : <NoRecord />}
      </div>
    </div>
  );
};

export default ExamDetailsPage;
