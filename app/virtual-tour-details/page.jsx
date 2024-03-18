"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllVirtualTour,
  fetchVirtualTourDetails,
} from "../redux/features/virtualTours/virtualTourSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup/index.jsx";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchVirtualTour } from "../services/virtualTourService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import Details from "../components/Details/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const VirtualTourDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [virtualTourInfo, setVirtualTourInfo] = useState(null);
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

    if (mounted) {
      let getDetailsData = null;
      if (virtualTourDetails?.data) {
        getDetailsData = virtualTourDetails?.data?.data;
      } else {
        const virtualTourDetailsLocSto = JSON.parse(
          localStorage.getItem("virtualTourDetails")
        );
        getDetailsData = virtualTourDetailsLocSto;
      }
      setVirtualTourInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [virtualTourDetails]);

  return (
    <div>
      <Jumbotron
        hasSearchInput={false}
        title="VirtualTour Details"
        // subtitle="Detailed Information of this VirtualTour"
      />
      <div className="d-flex justify-content-center align-items-center">
        {virtualTourInfo ? <Details data={virtualTourInfo} /> : <NoRecord />}
      </div>
    </div>
  );
};

export default VirtualTourDetailsPage;
