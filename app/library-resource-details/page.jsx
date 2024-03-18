"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllLibraryResource,
  fetchLibraryResourceDetails,
} from "../redux/features/libraryResources/libraryResourceSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchLibraryResource } from "../services/libraryResourceService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import Details from "../components/Details/index.jsx";
import CustomPDFViewer from "../components/CustomPDFViewer/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const LibraryResourceDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [libraryResourceInfo, setLibraryResourceInfo] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [
    onClickLibraryResourcePurposeData,
    setOnClickLibraryResourcePurposeData,
  ] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    libraryResourceDetails,
    libraryResourceIsError,
    libraryResourceIsSuccess,
    libraryResourceIsLoading,
    libraryResourceMessage,
  } = useSelector((state) => state.libraryResources);

  useEffect(() => {
    // handleGetLibraryResourceAll();

    dispatch(fetchAllLibraryResource());
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
      if (libraryResourceDetails?.data) {
        getDetailsData = libraryResourceDetails?.data?.data;
      } else {
        const libraryResourceDetailsLocSto = JSON.parse(
          localStorage.getItem("libraryResourceDetails")
        );
        getDetailsData = libraryResourceDetailsLocSto;
      }
      setLibraryResourceInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [libraryResourceDetails]);

  return (
    <div>
      <Jumbotron
        hasSearchInput={false}
        title="LibraryResource Details"
        // subtitle="Detailed Information of this LibraryResource"
      />
      <div className="d-flex justify-content-center align-items-center">
        {libraryResourceInfo ? (
          <CustomPDFViewer data={libraryResourceInfo} />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default LibraryResourceDetailsPage;
