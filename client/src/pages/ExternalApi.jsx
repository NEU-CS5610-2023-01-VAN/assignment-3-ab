import React, { useState } from "react";
import axios from "axios";
import { Tab } from "@headlessui/react";
import {
  AtSymbolIcon,
  CodeBracketIcon,
  LinkIcon,
} from "@heroicons/react/20/solid";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ExternalAPI() {
  const { promiseInProgress } = usePromiseTracker();
  function LoadingIndicator() {
    return (
      promiseInProgress && (
        <div className="flex justify-center mb-10">
          <progress className="progress w-56"></progress>
        </div>
      )
    );
  }

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  function handleSubmit(e) {
    // if (response) {
    //   setResponse("");
    // }

    e.preventDefault();

    trackPromise(
      axios
        .post("http://localhost:8000/chat", { prompt })
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-800 mt-14">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Can't find an answer to your question?
              <br />
              Ask GPT-3.5
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              This is probably best for more general question that don't
              necessitate reviewing code line by line
            </p>
          </div>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="bg-white py-10 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
          <div className="mx-auto max-w-2xl">
            <form className="mb-10" onSubmit={handleSubmit}>
              <div className="rounded-lg p-0.5">
                <textarea
                  rows={5}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Ask away..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send Question
                </button>
              </div>
            </form>
            {/* <div className="flex justify-center mb-10">
              <progress className="progress w-56"></progress>
            </div> */}
            <LoadingIndicator />
            {response && (
              <div className=" block w-full border-8 border-indigo-400 rounded-lg p-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-base sm:leading-6 italic font-semibold">
                {response}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
