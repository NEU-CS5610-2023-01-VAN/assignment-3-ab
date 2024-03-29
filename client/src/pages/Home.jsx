import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Feed from "../components/Feed";
import Banner from "../components/Banner";
import PostInput from "../components/PostInput";
import Loading from "../components/Loading";
import LogIn from "./LogIn";
import { useAuth0 } from "@auth0/auth0-react";
import { usePromiseTracker } from "react-promise-tracker";
import useQuestions from "../components/hooks/useQuestions";
import useUserQuestions from "../components/hooks/useUserQuestions";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { useAuthToken } from "../AuthTokenContext";
import api from "../api/base";

function Home() {
  const { promiseInProgress } = usePromiseTracker();
  const { user, isAuthenticated } = useAuth0();

  const [userQuestions, setUserQuestions] = useState(null);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function fetchUserQuestions() {
      try {
        const response = await api.get("/questions/user", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUserQuestions(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (accessToken) {
      fetchUserQuestions();
    }
  }, [accessToken]);

  const [questions, setQuestions] = useQuestions();

  return (
    <>
      {(isAuthenticated && userQuestions && (
        <>
          <Banner />
          <Feed
            posts={questions}
            setUserPosts={setUserQuestions}
            userPosts={userQuestions}
          />
        </>
      )) ||
        (!isAuthenticated && (
          <>
            <Banner />
            <Feed
              posts={questions}
              setUserPosts={setUserQuestions}
              userPosts={userQuestions}
            />
          </>
        ))}
    </>
  );
}

export default Home;
