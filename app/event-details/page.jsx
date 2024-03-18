"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllEvents,
  fetchEventDetails,
} from "../redux/features/events/eventSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchEvent } from "../services/eventsService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import Details from "../components/Details/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const EventsDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [eventInfo, setEventInfo] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickEventPurposeData, setOnClickEventPurposeData] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    eventDetails,
    eventIsError,
    eventIsSuccess,
    eventIsLoading,
    eventMessage,
  } = useSelector((state) => state.events);

  // will check if use
  // useEffect(() => {
  //   // handleGetEventAll();

  //   dispatch(fetchAllEvents());
  // }, []);

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
      if (eventDetails?.data) {
        getDetailsData = eventDetails?.data?.data;
      } else {
        const eventDetailsLocSto = JSON.parse(
          localStorage.getItem("eventDetails")
        );
        getDetailsData = eventDetailsLocSto;
      }
      setEventInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [eventDetails]);

  return (
    <div>
      <Jumbotron
        title="Event Details"
        // subtitle="Detailed Information of this Event"
        hasSearchInput={false}
      />
      <div className="d-flex justify-content-center align-items-center">
        {eventInfo ? <Details data={eventInfo} /> : <NoRecord />}
      </div>
    </div>
  );
};

export default EventsDetailsPage;
