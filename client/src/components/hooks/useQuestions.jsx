import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthToken } from "../../AuthTokenContext";
import api from "../../api/base";
import { trackPromise } from "react-promise-tracker";

export default function useQuestions() {
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await api.get("/questions");
        setQuestions(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchQuestions();
  }, []);

  return [questions, setQuestions];
}
