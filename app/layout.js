import Head from "next/head";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNavbar from "./components/TopNavbar";
import MainNavbar from "./components/MainNavbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>KLL Portal - Online Education Website Template</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="Free HTML Templates" name="keywords" />
        <meta content="Free HTML Templates" name="description" />
        {/* Favicon */}
        <link href="img/favicon.ico" rel="icon" />
        {/* Google Web Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
        {/* Font Awesome */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
          rel="stylesheet"
        />
        {/* Libraries Stylesheet */}
        <link
          href="lib/owlcarousel/assets/owl.carousel.min.css"
          rel="stylesheet"
        />
        {/* Customized Bootstrap Stylesheet */}
        <link href="css/CardGroupPaginate.css" rel="stylesheet" />
        <link href="css/style.css" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <TopNavbar />
          <MainNavbar />
          {children}

          <Toaster position="top-right" />
          <Footer />
        </Providers>
        {/* Back to Top */}
        <a
          href="#"
          className="btn btn-lg btn-primary rounded-0 btn-lg-square back-to-top"
        >
          <i className="fa fa-angle-double-up" />
        </a>

        {/* JavaScript Libraries */}
        <Script
          src="https://code.jquery.com/jquery-3.4.1.min.js"
          strategy="beforeInteractive"
        />
        <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" />
        <Script src="lib/easing/easing.min.js" />
        <Script src="lib/waypoints/waypoints.min.js" />
        <Script src="lib/counterup/counterup.min.js" />
        <Script src="lib/owlcarousel/owl.carousel.min.js" />

        {/* Template Javascript */}
        <Script src="js/main.js" />
        {/* <Script>
          var csrf = document.querySelector('meta[name="csrf-token"]').content;
        </Script> */}
      </body>
    </html>
  );
}
