"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllAdmission,
  fetchAdmissionDetails,
} from "../redux/features/admissions/admissionSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchAdmission } from "../services/admissionService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import Details from "../components/Details/index.jsx";
import CustomPDFViewer from "../components/CustomPDFViewer/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const AdmissionDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [admissionInfo, setAdmissionInfo] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickAdmissionPurposeData, setOnClickAdmissionPurposeData] =
    useState({
      redirect: "true",
      selectedId: null,
    });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    admissionDetails,
    admissionIsError,
    admissionIsSuccess,
    admissionIsLoading,
    admissionMessage,
  } = useSelector((state) => state.admissions);

  useEffect(() => {
    // handleGetAdmissionAll();

    dispatch(fetchAllAdmission());
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
      if (admissionDetails?.data) {
        getDetailsData = admissionDetails?.data?.data;
      } else {
        const admissionDetailsLocSto = JSON.parse(
          localStorage.getItem("admissionDetails")
        );
        getDetailsData = admissionDetailsLocSto;
      }
      setAdmissionInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [admissionDetails]);

  return (
    <div>
      <Jumbotron
        hasSearchInput={false}
        title="Admission Details"
        // subtitle="Detailed Information of this Admission"
      />
      <div className="d-flex justify-content-center align-items-center">
        {admissionInfo ? (
          <CustomPDFViewer data={admissionInfo} />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default AdmissionDetailsPage;
