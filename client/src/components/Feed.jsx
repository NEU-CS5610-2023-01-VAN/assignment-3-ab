import { SiAnswer } from "react-icons/si";
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/20/solid";
import PostInput from "./PostInput";
import { NavLink, useNavigation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logoOnly from "../assets/logoOnly.png";
import Article from "./Article";
import UserSpecificFeed from "./UserSpecificFeed";

export default function Feed({ posts, setUserPosts, userPosts }) {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="bg-white py-24 sm:py-25">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-10">
        <div className="mx-auto max-w-2xl">
          {isAuthenticated && (
            <PostInput
              userQuestions={userPosts}
              setUserQuestions={setUserPosts}
            />
          )}

          {isAuthenticated && userPosts.length > 0 && (
            <UserSpecificFeed userPosts={userPosts} />
          )}

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest Questions
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            See if you can help answer others in our community
          </p>
          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
            {posts.map((post) => (
              <Article key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
