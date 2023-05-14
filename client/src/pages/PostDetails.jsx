import React, { useState, useEffect } from "react";
import { SiAnswer } from "react-icons/si";
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/20/solid";
import PostInput from "../components/PostInput";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Fragment } from "react";
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
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../AuthTokenContext";
import api from "../api/base";
import { Routes, Route, useParams } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PostDetails() {
  let { postId } = useParams();

  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const { accessToken } = useAuthToken();

  const [postDetails, setPostDetails] = useState(null);
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    async function fetchPostInfo() {
      try {
        const response = await api.get(`/question/${postId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setPostDetails(response.data);
        setPostComments(response.data.answers);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPostInfo();
  }, [accessToken, postId, postComments.length]);

  const [comment, setComment] = useState("");

  async function handleCommentSubmit(e) {
    e.preventDefault();
    let newComment = { content: comment, questionID: postId };
    try {
      const response = await api.post("/answer", newComment, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const allComments = [...postComments, response.data];
      setPostComments(allComments);
      setComment("");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

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

  return (
    postDetails && (
      <div className="bg-white py-10 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
          <div className="mx-auto max-w-2xl">
            <div className="mt-1 space-y-16 border-t border-gray-200 pt-10 sm:mt-10 sm:pt-16">
              {/* The post */}
              <Article post={postDetails} />

              {/* Comments List */}
              <ul role="list" className="space-y-6">
                {postComments.length > 1 ? (
                  postComments.map((commentItem, commentItemIdx) => (
                    <Comment
                      key={commentItem.id}
                      commentItem={commentItem}
                      commentItemIdx={commentItemIdx}
                      commentsListLength={postComments.length}
                      formatTime={formatTime}
                      postComments={postComments}
                      setPostComments={setPostComments}
                    />
                  ))
                ) : postComments.length === 1 ? (
                  <Comment
                    key={postComments[0].id}
                    commentItem={postComments[0]}
                    commentItemIdx={0}
                    commentsListLength={1}
                    formatTime={formatTime}
                    postComments={postComments}
                    setPostComments={setPostComments}
                  />
                ) : (
                  <></>
                )}
              </ul>

              {/* New comment form */}
              {isAuthenticated && (
                <div className="mt-6 flex gap-x-3 pb-20">
                  <img src={logoOnly} alt="segFault logo" className="h-6 w-8" />
                  <form
                    action="#"
                    className="relative flex-auto"
                    onSubmit={handleCommentSubmit}
                  >
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
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
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
    )
  );
}
