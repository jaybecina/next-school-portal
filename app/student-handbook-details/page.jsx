"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllStudentHandbook,
  fetchStudentHandbookDetails,
} from "../redux/features/studentHandbooks/studentHandbookSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchStudentHandbook } from "../services/studentHandbookService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import Details from "../components/Details/index.jsx";
import CustomPDFViewer from "../components/CustomPDFViewer/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const StudentHandbookDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [studentHandbookInfo, setStudentHandbookInfo] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [
    onClickStudentHandbookPurposeData,
    setOnClickStudentHandbookPurposeData,
  ] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    studentHandbookDetails,
    studentHandbookIsError,
    studentHandbookIsSuccess,
    studentHandbookIsLoading,
    studentHandbookMessage,
  } = useSelector((state) => state.studentHandbooks);

  useEffect(() => {
    // handleGetStudentHandbookAll();

    dispatch(fetchAllStudentHandbook());
  }, []);

  // useEffect(() => {
  //   if (!user?.user) {
  //     toast.error("Unauthorized access");

  //     redirect("/");
  //   }
  // }, [user]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      let getDetailsData = null;
      if (studentHandbookDetails?.data) {
        getDetailsData = studentHandbookDetails?.data?.data;
      } else {
        const studentHandbookDetailsLocSto = JSON.parse(
          localStorage.getItem("studentHandbookDetails")
        );
        getDetailsData = studentHandbookDetailsLocSto;
      }
      setStudentHandbookInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [studentHandbookDetails]);

  return (
    <div>
      <Jumbotron
        hasSearchInput={false}
        title="StudentHandbook Details"
        // subtitle="Detailed Information of this StudentHandbook"
      />
      <div className="d-flex justify-content-center align-items-center">
        {studentHandbookInfo ? (
          <CustomPDFViewer data={studentHandbookInfo} />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default StudentHandbookDetailsPage;
