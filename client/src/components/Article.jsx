import React from "react";
import { SiAnswer } from "react-icons/si";
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";
import logoOnly from "../assets/logoOnly.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import api from "../api/base";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";

export default function Article({ post, specific }) {
  const { user, isAuthenticated } = useAuth0();
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  function formatTime(originalTime) {
    // remove the timezone indicators
    const strippedTime = originalTime.replace("T", " ").replace("Z", "");

    // split date and time
    var splitTime = strippedTime.split(/[- :]/);

    // Apply each element to the Date function
    var fixedTime = new Date(
      Date.UTC(
        splitTime[0],
        splitTime[1] - 1,
        splitTime[2],
        splitTime[3],
        splitTime[4],
        splitTime[5]
      )
    ).toLocaleString("en-US");

    return fixedTime;
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/questions/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <article
      key={post.id}
      className={`p-6 flex flex-col justify-between border-4 border-${
        specific ? "indigo" : "gray"
      }-400 shadow-lg hover:bg-gray-100`}
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post.createdAt} className="text-gray-500">
          {formatTime(post.createdAt)}
        </time>
        <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
          {post.tag.name}
        </p>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <NavLink to={`/posts/${post.id}`}>
            <span className="absolute inset-0" />
            {post.title}
          </NavLink>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.body}
        </p>
      </div>
      <div className="flex content-center">
        <div className="relative mt-8 flex items-center gap-x-4">
          <img src={logoOnly} alt="segFault icon" className="h-10 w-12 " />
          <div className="text-sm leading-6 mr-auto">
            <p className="font-semibold text-gray-900">
              <NavLink to={"/users/1"}>
                {/*Maybe add a href or navlink to that user's profile*/}
                {/* <span className="absolute inset-0" /> */}
                {specific ? user.name : post.author.name}
              </NavLink>
            </p>
            <p className="text-gray-600 flex items-center">
              {/*post.author.role*/}
              {post.answers.length}{" "}
              {post.answers.length === 0 ? (
                <QuestionMarkCircleIcon className="w-5 h-5 ml-1" />
              ) : (
                <ChatBubbleLeftRightIcon className="w-5 h-5 ml-1" />
              )}
            </p>
          </div>
        </div>
        {isAuthenticated && post.author.auth0Id === user.sub && (
          <div
            className="relative mt-12 flex items-center ml-auto cursor-pointer"
            onClick={() => handleDelete(post.id)}
          >
            <p>{<ArchiveBoxXMarkIcon className="w-5 h-5 ml-auto" />}</p>
          </div>
        )}
      </div>
    </article>
  );
}
