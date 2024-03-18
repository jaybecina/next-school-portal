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

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const LibraryResourcePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [libraryResourceList, setLibraryResourceList] = useState(null);
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
    libraryResources,
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
    const { redirect, selectedId } = onClickLibraryResourcePurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchLibraryResourceDetails id: ", selectedId);
      dispatch(
        fetchLibraryResourceDetails(
          onClickLibraryResourcePurposeData?.selectedId
        )
      );
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickLibraryResourcePurposeData]);

  useEffect(() => {
    let mounted = true;
    if (libraryResourceDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "libraryResourceDetails",
        JSON.stringify(libraryResourceDetails?.data?.data)
      );

      router.push("/library-resource-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [libraryResourceDetails]);

  useEffect(() => {
    const fetchLibraryResourceSearch = async (searchData) => {
      const response = await getSearchLibraryResource(
        searchData?.keyword,
        searchData?.field
      );

      setLibraryResourceList(response?.data?.data);

      console.log("fetchLibraryResourceSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchLibraryResourceSearch(searchData);
    } else if (
      libraryResources?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setLibraryResourceList(libraryResources?.data?.data);
    } else {
      setLibraryResourceList([]);
    }
  }, [searchData, libraryResources]);

  if (libraryResourceIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "desc", "content"];

  return (
    <div>
      <Jumbotron
        title="Library Resources"
        // subtitle="Showcasing the Moments from Our LibraryResource"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={true}
      />
      <div className="d-flex justify-content-center align-items-center">
        {libraryResourceList?.length > 0 ? (
          <CardGroup
            useImageDefault="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png"
            data={libraryResourceList}
            itemsPerPage={8}
            onClickPurposeData={onClickLibraryResourcePurposeData}
            setOnClickPurposeData={setOnClickLibraryResourcePurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default LibraryResourcePage;
