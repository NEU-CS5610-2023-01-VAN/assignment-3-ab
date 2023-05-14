import { SiAnswer } from "react-icons/si";
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/20/solid";
import PostInput from "./PostInput";
import { NavLink, useNavigation } from "react-router-dom";
import { User, useAuth0 } from "@auth0/auth0-react";
import logoOnly from "../assets/logoOnly.png";
import Article from "./Article";

export default function UserSpecificFeed({ userPosts }) {
  const post = userPosts[0];
  return (
    <div className=" mb-32">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Your latest post
      </h2>
      <p className="mt-2 text-lg leading-8 text-gray-600">
        Thank you for being and active member in our community
      </p>
      <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
        <Article key={post.id} post={post} specific={true} />
      </div>
    </div>
  );
}
