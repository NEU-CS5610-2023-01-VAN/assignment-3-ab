import React from "react";
import { SiAnswer } from "react-icons/si";
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";
import logoOnly from "../assets/logoOnly.png";

export default function Article({ post }) {
  return (
    <article
      key={post.id}
      className="p-6 flex flex-col justify-between border-4 border-gray-400 shadow-lg hover:bg-gray-100"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post.datetime} className="text-gray-500">
          {post.date}
        </time>
        <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
          {post.category.title}
        </p>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <NavLink to={`posts/${post.id}`}>
            <span className="absolute inset-0" />
            {post.title}
          </NavLink>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.description}
        </p>
      </div>
      <div className="flex content-center">
        <div className="relative mt-8 flex items-center gap-x-4">
          <img src={logoOnly} alt="" className="h-10 w-12 " />
          <div className="text-sm leading-6 mr-auto">
            <p className="font-semibold text-gray-900">
              <NavLink to={"users/1"}>
                {/*Maybe add a href or navlink to that user's profile*/}
                {/* <span className="absolute inset-0" /> */}
                {post.author.name}
              </NavLink>
            </p>
            <p className="text-gray-600 flex items-center">
              {/*post.author.role*/}1{" "}
              {<ChatBubbleLeftRightIcon className="w-5 h-5 ml-1" />}
            </p>
          </div>
        </div>
        <div className="relative mt-12 flex items-center ml-auto">
          <p>{<ArchiveBoxXMarkIcon className="w-5 h-5 ml-auto" />}</p>
        </div>
      </div>
    </article>
  );
}
