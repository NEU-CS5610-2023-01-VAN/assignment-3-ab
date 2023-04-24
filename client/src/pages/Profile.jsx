import React, { useState, useEffect } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import Article from "../components/Article";
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

// const mytabs = [
//   { name: "Questions Asked", current: true },
//   { name: "Questions Answered", current: false },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Profile() {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState([
    { name: "Questions Asked", current: true },
    { name: "Questions Answered", current: false },
  ]);

  const { accessToken } = useAuthToken();
  const [userQuestionsAnswered, setUserQuestionsAnswered] = useState(null);
  const [userQuestionsAsked, setUserQuestionsAsked] = useState(null);
  const [tabItems, setTabItems] = useState(null);
  const [articlesShown, setArticlesShown] = useState(null);

  useEffect(() => {
    async function fetchUserActivity() {
      try {
        const [firstResponse, secondResponse] = await Promise.all([
          api.get("/questions/user", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          api.get("/answers", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);

        console.log("first response is ", firstResponse.data);
        console.log(
          "first response test ",
          Object.keys(firstResponse.data).length
        );
        console.log("second response is ", secondResponse.data);
        console.log(
          "second response test ",
          Object.keys(secondResponse.data).length
        );

        setUserQuestionsAsked(firstResponse.data);
        setTabItems(firstResponse.data);
        setUserQuestionsAnswered(secondResponse.data);
        if (Object.keys(firstResponse.data).length > 1) {
          setArticlesShown(
            firstResponse.data.map((post) => (
              <Article key={post.id} post={post} specific={true} />
            ))
          );
        } else if (Object.keys(firstResponse.data).length === 1) {
          setArticlesShown(
            <Article key={tabItems[0].id} post={tabItems[0]} specific={true} />
          );
        } else {
          setArticlesShown(<div></div>);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (accessToken) {
      fetchUserActivity();
    }
  }, [accessToken]);

  function handleTabClick(_tab) {
    setTabs((prevState) =>
      prevState.map((tab) =>
        tab.name === _tab.name
          ? { ...tab, current: true }
          : { ...tab, current: false }
      )
    );
    setTabItems(
      _tab.name === "Questions Asked"
        ? userQuestionsAsked
        : userQuestionsAnswered
    );
    console.log("switched tabs");
  }

  useEffect(() => {
    async function switchTabs() {
      console.log("render..");
      try {
        if (Object.keys(tabItems).length > 1) {
          setArticlesShown(
            tabItems.map((post) => (
              <Article key={post.id} post={post} specific={true} />
            ))
          );
        } else if (Object.keys(tabItems).length === 1) {
          setArticlesShown(
            <Article key={tabItems[0].id} post={tabItems[0]} specific={true} />
          );
        } else {
          setArticlesShown(<div></div>);
        }
      } catch (err) {
        console.log(err);
      }
    }

    switchTabs();
  }, [tabItems]);

  const { user, isAuthenticated } = useAuth0();

  console.log(user);

  // let items;
  // if (Object.keys(tabItems).length > 1) {
  //   items = tabItems.map((post) => (
  //     <Article key={post.id} post={post} specific={true} />
  //   ));
  // } else if (Object.keys(tabItems).length === 1) {
  //   items = <Article key={tabItems[0].id} post={tabItems[0]} specific={true} />;
  // } else {
  //   items = {};
  // }
  // console.log("items currently is: ", items);

  return (
    userQuestionsAsked &&
    userQuestionsAnswered &&
    tabItems && (
      <div className="bg-white py-15 sm:py-15 pb-20 pt-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-10">
          <div className="mx-auto max-w-2xl">
            <div className="overflow-hidden bg-white border-8 border-gray-300 sm:rounded-lg">
              <div className="px-4 py-6 sm:px-6">
                <div className="flex">
                  <div>
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      Profile Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                      Your details here wil be visible to the public.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <button
                      type="button"
                      onClick={() => navigate("/profile/settings")}
                      className="rounded-md bg-indigo-600 px-1.5 sm:px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit Info
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      User Name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {user.name}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      Email Address
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {user.email}
                    </dd>
                  </div>
                  {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      Currently Learning
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {user.currentlyLearning}
                    </dd>
                  </div> */}
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">About</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      ...
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-5 sm:pb-0 mt-10">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Activity
              </h3>
              <div className="mt-3 sm:mt-4">
                <div className="sm:hidden">
                  <label htmlFor="current-tab" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="current-tab"
                    name="current-tab"
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden sm:block">
                  <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                      <p
                        key={tab.name}
                        onClick={() => handleTabClick(tab)}
                        className={classNames(
                          tab.current
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                          "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium cursor-pointer"
                        )}
                        aria-current={tab.current ? "page" : undefined}
                      >
                        {tab.name}
                      </p>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
            <div className="space-y-16 pt-10 sm:mt-1 sm:pt-10">
              {articlesShown}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

// function Profile() {
//   return <div>Profile Page</div>;
// }

// export default Profile;
