"use client";
import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "antd";
import Link from "next/link";
import NavbarSubMenu from "../NavbarSubMenu";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "@/app/redux/features/auth/authSlice";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "../Spinner";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
  { name: "Academics", href: "#", current: false },
  { name: "Pages", href: "#", current: false },
  { name: "Quick Links", href: "#", current: false },
];

const navigationMobile = [
  { name: "Home", href: "/", current: true },
  { name: "My Profile", href: "/profile", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
  {
    name: "Courses and Programs",
    href: "/courses-and-programs",
    current: true,
  },
  { name: "Admissions", href: "/admissions", current: false },
  { name: "Online Learning", href: "/online-learning", current: false },
  { name: "Academic Calendar", href: "/academic-calendar", current: false },
  { name: "Student Resources", href: "/student-resources", current: false },
  { name: "Library Resources", href: "/library-resources", current: false },
  { name: "Student Handbook", href: "/student-handbook", current: false },
  { name: "Exams", href: "/exams", current: false },
  { name: "Events", href: "/events-gallery", current: false },
  { name: "News", href: "/news", current: false },
  { name: "Sports", href: "/sports", current: false },
  { name: "Clubs", href: "/clubs", current: false },
  { name: "Virtual Tour", href: "/virtual-tour", current: false },
];

const academicsSubMenu = [
  {
    name: "Courses and Programs",
    href: "/courses-and-programs",
    current: true,
  },
  { name: "Online Learning", href: "/online-learning", current: false },
  { name: "Academic Calendar", href: "/academic-calendar", current: false },
  { name: "Library Resources", href: "/library-resources", current: false },
  { name: "Student Resources", href: "/student-resources", current: false },
  { name: "Exams", href: "/exams", current: false },
];

const pagesSubMenu = [
  { name: "My Profile", href: "/profile", current: false },
  { name: "Admission", href: "/admission", current: false },
  { name: "Events", href: "/events-gallery", current: false },
  { name: "News", href: "/news", current: false },
  { name: "Sports", href: "/sports", current: false },
  { name: "Clubs", href: "/clubs", current: false },
  { name: "Virtual Tour", href: "/virtual-tour", current: false },
  { name: "Student Handbook", href: "/student-handbook", current: false },
];

const quickLinksSubMenu = [
  { name: "My Profile", href: "/profile", current: false },
  { name: "Academic Calendar", href: "/academic-calendar", current: false },
  { name: "Library Resources", href: "/library-resources", current: false },
  { name: "Student Resources", href: "/student-resources", current: false },
  { name: "Student Handbook", href: "/student-handbook", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MainNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [navActive, setNavActive] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // for every 10s will check if token is valid
  const [refreshTick, setRefreshTick] = useState(0);

  const { user, isLoading } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    console.log("onLogout clicked");
    e.preventDefault();
    // dispatch(logout());
    // dispatch(reset());

    // setTimeout(function () {
    // dispatch(reset());
    // }, 2000);

    localStorage.removeItem("user");
    // localStorage.removeItem("expiryTime");
    localStorage.removeItem("eventDetails");
    localStorage.removeItem("newsDetails");

    setIsAuth(false);
    setUserProfile(null);

    toast.success("Logged out successfully!");
    router.push("/");
  };

  useEffect(() => {
    if (user) {
      console.log("user: ", user);
      setIsAuth(true);
      setUserProfile(user.user);
    } else {
      setIsAuth(false);
      setUserProfile(null);
    }
  }, [user]);

  console.log("IsAuth: " + isAuth);
  console.log("UserProfile: " + userProfile);

  // uncomment the following line if will use expiring token function
  // useEffect(() => {
  //   let mounted = true;

  //   const isTokenExpired = () => {
  //     if (typeof window !== "undefined") {
  //       const storedExpiryTime = localStorage.getItem("expiryTime");

  //       if (storedExpiryTime) {
  //         const expiryTime = new Date(storedExpiryTime);
  //         const currentTime = new Date();

  //         if (currentTime > expiryTime) {
  //           const hasTokenExpired = { tokenExpired: true };

  //           dispatch(logout(hasTokenExpired));

  //           setTimeout(function () {
  //             dispatch(reset());
  //           }, 2000);

  //           // Token has expired, logout
  //           toast.success("Session expired logging out");
  //           return true;
  //         }

  //         return false; // Token is still valid
  //       }

  //       return true; // Return true if expiry time is not stored or expired
  //     }
  //   };

  //   if (mounted) {
  //     isTokenExpired();
  //     setTimeout(() => setRefreshTick((prevState) => prevState + 1), 10000);
  //   }

  //   return () => (mounted = false);
  // }, [refreshTick]);

  if (isLoading) {
    return <Spinner />;
  }

  const onClickJoinUs = (e) => {
    e.preventDefault();

    router.push("/admission");
  };

  const onClickLogin = (e) => {
    e.preventDefault();

    router.push("/login");
  };

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow-md">
        {({ open }) => (
          <>
            <div className="max-w-screen px-6 md:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex flex-shrink-0">
                    <Link href="/" className="px-0">
                      <h1 className="m-0 text-uppercase text-primary">
                        {/* <i className="fa fa-book-reader mr-3" /> */}
                        KLL Portal
                      </h1>
                    </Link>
                  </div>
                  <div className="hidden md:ml-6 lg:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <>
                          {item.name === "Pages" ? (
                            <NavbarSubMenu
                              navItemName={item.name}
                              navItemCurrent={item.current}
                              subMenuData={pagesSubMenu}
                            />
                          ) : item.name === "Academics" ? (
                            <NavbarSubMenu
                              navItemName={item.name}
                              navItemCurrent={item.current}
                              subMenuData={academicsSubMenu}
                            />
                          ) : item.name === "Quick Links" ? (
                            <NavbarSubMenu
                              navItemName={item.name}
                              navItemCurrent={item.current}
                              subMenuData={quickLinksSubMenu}
                            />
                          ) : (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "text-blue-800"
                                  : "text-blackhover:text-blue-600",
                                "px-3 py-2 text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:ml-6 lg:block">
                    <div className="flex space-x-1">
                      {!isAuth ? (
                        <>
                          <Button
                            type="default"
                            className="iiss-button bg-blue-600 hover:bg-blue-800 text-white h-[40px] hidden lg:block"
                            onClick={onClickJoinUs}
                          >
                            Join Us
                          </Button>
                          <Button
                            onClick={onClickLogin}
                            type="default"
                            className="iiss-button bg-blue-600 hover:bg-blue-800 text-white py-[10px] h-[40px] text-[0.938rem] rounded-md hidden lg:block"
                          >
                            Login
                          </Button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/profile"
                            className={classNames(
                              "text-blackhover:text-blue-600",
                              "px-3 py-2 text-sm font-medium"
                            )}
                          >
                            Welcome {userProfile?.last_name},{" "}
                            {userProfile?.first_name}
                          </Link>

                          <Button
                            type="default"
                            onClick={onLogout}
                            className="iiss-button bg-blue-600 hover:bg-blue-800 text-white h-[40px] hidden lg:block"
                          >
                            Logout
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <FaTimes className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <FaBars className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="block lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigationMobile.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "text-blue-800"
                        : "text-black hover:text-blue-600",
                      "iiss-button block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="text-black hover:text-blue-600 iiss-button block rounded-md px-3 py-2 text-base font-medium"
                  aria-current={"join"}
                >
                  Join Us
                </Disclosure.Button>
                {!isAuth ? (
                  <Disclosure.Button
                    as="a"
                    href="/login"
                    className="text-black hover:text-blue-600 iiss-button block rounded-md px-3 py-2 text-base font-medium"
                    aria-current={"join"}
                  >
                    Login
                  </Disclosure.Button>
                ) : (
                  <Disclosure.Button
                    as="a"
                    href={onLogout}
                    className="text-black hover:text-blue-600 iiss-button block rounded-md px-3 py-2 text-base font-medium"
                    aria-current={"join"}
                  >
                    Logout
                  </Disclosure.Button>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default MainNavbar;
