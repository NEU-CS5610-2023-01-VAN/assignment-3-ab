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

const activity = [
  {
    id: 4,
    type: "commented",
    person: {
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
const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PostDetails() {
  const [selected, setSelected] = useState(moods[5]);

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

  const { isAuthenticated } = useAuth0();

  return (
    <div className="bg-white py-10 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mt-1 space-y-16 border-t border-gray-200 pt-10 sm:mt-10 sm:pt-16">
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
                  <img
                    src={post.author.imageUrl}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6 mr-auto">
                    <p className="font-semibold text-gray-900">
                      <a>
                        {" "}
                        {/*Maybe add a href or navlink to that user's profile*/}
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600 flex items-center">
                      {/*post.author.role*/}
                      {activity.length}
                      {<ChatBubbleLeftRightIcon className="w-5 h-5 ml-1" />}
                    </p>
                  </div>
                </div>
                <div className="relative mt-12 flex items-center ml-auto">
                  <p>{<ArchiveBoxXMarkIcon className="w-5 h-5 ml-auto" />}</p>
                </div>
              </div>
            </article>
            <ul role="list" className="space-y-6">
              {activity.map((activityItem, activityItemIdx) => (
                <li key={activityItem.id} className="relative flex gap-x-4">
                  <div
                    className={classNames(
                      activityItemIdx === activity.length - 1
                        ? "h-6"
                        : "-bottom-6",
                      "absolute left-0 top-0 flex w-6 justify-center"
                    )}
                  >
                    <div className="w-px bg-gray-200" />
                  </div>
                  <img
                    src={activityItem.person.imageUrl}
                    alt=""
                    className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                  />
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">
                          {activityItem.person.name}
                        </span>{" "}
                      </div>
                      <time
                        dateTime={activityItem.dateTime}
                        className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                      >
                        {activityItem.date}
                      </time>
                    </div>
                    <p className="text-sm leading-6 text-gray-500">
                      {activityItem.comment}
                    </p>
                    <ArchiveBoxXMarkIcon className="w-5 h-5 ml-auto" />
                  </div>
                </li>
              ))}
            </ul>

            {/* New comment form */}
            <div className="mt-6 flex gap-x-3 pb-20">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                className="h-6 w-6 flex-none rounded-full bg-gray-50"
              />
              <form action="#" className="relative flex-auto">
                <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label htmlFor="comment" className="sr-only">
                    Add your comment
                  </label>
                  <textarea
                    rows={2}
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
          </div>
        </div>
      </div>
    </div>
  );
}
