import React, { useContext } from "react";
import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router";
import PerformanceOverviewComponent from "./assets/pages/performanceOverview";
import Login from "./assets/pages/auth/login";
import SmartControl from "./assets/pages/smartControl";
import Signup from "./assets/pages/auth/signup";
import History from "./assets/pages/history";
import CommonReports from "./assets/pages/commonReports";
import Navbar from "./Navbar";
import Header from "./Header";
import authContext from "./store/auth/authContext";
import NegativeKeywordsComponent from "./assets/pages/negativeKeywords";

function App() {
  const location = useLocation();
  const { isLoggedIn } = useContext(authContext)
  return (
    <>
      {!location.pathname.includes("/login") &&
        !location.pathname.includes("/signup") && (
          <>
            <Navbar />
            <Header />
          </>
        )}
      <div
        className={`${location.pathname.includes("/login") ||
          location.pathname.includes("/signup")
          ? "auth-main-con"
          : "main-con"
          }`}
      >
        <Routes>
          <Route path="/" element={isLoggedIn ? <PerformanceOverviewComponent /> : <Navigate to="/login" />} />
          <Route path="/smart-control" element={isLoggedIn ? <SmartControl /> : <Navigate to="/login" />} />
          <Route path="/history" element={isLoggedIn ? <History /> : <Navigate to="/login" />} />
          <Route path="/common-reports" element={isLoggedIn ? <CommonReports /> : <Navigate to="/login" />} />
          <Route path="/negative-keywords" element={isLoggedIn ? <NegativeKeywordsComponent /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
