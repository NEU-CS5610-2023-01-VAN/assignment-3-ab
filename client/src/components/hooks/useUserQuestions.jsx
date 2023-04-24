import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthToken } from "../../AuthTokenContext";
import api from "../../api/base";
import { trackPromise } from "react-promise-tracker";
import { useAuth0 } from "@auth0/auth0-react";

export default function useUserQuestions() {
  const [userQuestions, setUserQuestions] = useState([]);
  const { accessToken } = useAuthToken();

  const { user, isAuthenticated } = useAuth0();

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
      trackPromise(fetchUserQuestions());
    }
  }, [accessToken]);

  return [userQuestions, setUserQuestions];
}
