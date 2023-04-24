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
import Article from "../components/Article";
import Comment from "../components/Comment";

const comments = [
  {
    id: 4,
    type: "commented",
    person: {
      id: 1,
      name: "Chelsea Hagon",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.Called client, they reassured me the invoice would be paid by the 25th.Called client, they reassured me the invoice would be paid by the 25th.Called client, they reassured me the invoice would be paid by the 25th.Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 5,
    type: "commented",
    person: {
      id: 2,
      name: "Zia Urahim",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 6,
    type: "commented",
    person: {
      id: 3,
      name: "Marouane Samir",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PostDetails() {
  const post = {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "0 Answers",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  };

  // const { isAuthenticated } = useAuth0();
  const isAuthenticated = true;

  return (
    <div className="bg-white py-10 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="mt-1 space-y-16 border-t border-gray-200 pt-10 sm:mt-10 sm:pt-16">
            {/* The post */}
            <Article post={post} />

            {/* Comments List */}
            <ul role="list" className="space-y-6">
              {comments.map((commentItem, commentItemIdx) => (
                <Comment
                  commentItem={commentItem}
                  commentItemIdx={commentItemIdx}
                  commentsListLength={comments.length}
                />
              ))}
            </ul>

            {/* New comment form */}
            {isAuthenticated && (
              <div className="mt-6 flex gap-x-3 pb-20">
                <img src={logoOnly} alt="segFault logo" className="h-6 w-8" />
                <form action="#" className="relative flex-auto">
                  <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <label htmlFor="comment" className="sr-only">
                      Add your comment
                    </label>
                    <textarea
                      rows={4}
                      name="comment"
                      id="comment"
                      className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Add your comment..."
                      defaultValue={""}
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                    <div className="flex items-center space-x-5"></div>
                    <button
                      type="submit"
                      className="rounded-md  bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-500"
                    >
                      Comment
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
