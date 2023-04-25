import React from "react";
import { SiAnswer } from "react-icons/si";
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/20/solid";
import PostInput from "../components/PostInput";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Fragment, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import logoOnly from "../assets/logoOnly.png";
import { useAuthToken } from "../AuthTokenContext";
import api from "../api/base";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Comment({
  commentItem,
  commentItemIdx,
  commentsListLength,
  formatTime,
  postComments,
  setPostComments,
}) {
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      await api.delete(`/answers/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const newCommentsList = postComments.filter((post) => post.id !== id);
      setPostComments(newCommentsList);
      navigate(`/posts/${commentItem.questionID}`);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <li key={commentItem.id} className="relative flex gap-x-4">
      <div
        className={classNames(
          commentItemIdx === commentsListLength - 1 ? "h-6" : "-bottom-6",
          "absolute left-0 top-0 flex w-6 justify-center"
        )}
      >
        <div className="w-px bg-gray-200" />
      </div>
      <img
        src={logoOnly}
        alt="segFault logo"
        className="relative mt-3 h-6 w-8 flex-none rounded-full"
      />
      <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
        <div className="flex justify-between gap-x-4">
          <div className="py-0.5 text-xs leading-5 text-gray-800 font-bold">
            {/* <span className="font-medium text-gray-900"> */}
            <NavLink to={"/users/1"}>{commentItem.author.name}</NavLink>
            {/* </span>{" "} */}
          </div>
          <time
            dateTime={commentItem.dateTime}
            className="flex-none py-0.5 text-xs leading-5 text-gray-500"
          >
            {formatTime(commentItem.createdAt)}
          </time>
        </div>
        <p className="text-sm leading-6 text-gray-500">{commentItem.content}</p>
        <ArchiveBoxXMarkIcon
          className="w-5 h-5 ml-auto cursor-pointer"
          onClick={() => handleDelete(commentItem.id)}
        />
      </div>
    </li>
  );
}
