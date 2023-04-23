import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

function AppLayout() {
  const { isLoading, isAuthenticated } = useAuth0();
  if (isLoading) return <Loading />;

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
