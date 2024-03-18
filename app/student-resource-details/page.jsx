"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllStudentResource,
  fetchStudentResourceDetails,
} from "../redux/features/studentResources/studentResourceSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchStudentResource } from "../services/studentResourceService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import Details from "../components/Details/index.jsx";
import CustomPDFViewer from "../components/CustomPDFViewer/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const StudentResourceDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [studentResourceInfo, setStudentResourceInfo] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [
    onClickStudentResourcePurposeData,
    setOnClickStudentResourcePurposeData,
  ] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    studentResourceDetails,
    studentResourceIsError,
    studentResourceIsSuccess,
    studentResourceIsLoading,
    studentResourceMessage,
  } = useSelector((state) => state.studentResources);

  useEffect(() => {
    // handleGetStudentResourceAll();

    dispatch(fetchAllStudentResource());
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
      if (studentResourceDetails?.data) {
        getDetailsData = studentResourceDetails?.data?.data;
      } else {
        const studentResourceDetailsLocSto = JSON.parse(
          localStorage.getItem("studentResourceDetails")
        );
        getDetailsData = studentResourceDetailsLocSto;
      }
      setStudentResourceInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [studentResourceDetails]);

  return (
    <div>
      <Jumbotron
        hasSearchInput={false}
        title="StudentResource Details"
        // subtitle="Detailed Information of this StudentResource"
      />
      <div className="d-flex justify-content-center align-items-center">
        {studentResourceInfo ? (
          <CustomPDFViewer data={studentResourceInfo} />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default StudentResourceDetailsPage;
