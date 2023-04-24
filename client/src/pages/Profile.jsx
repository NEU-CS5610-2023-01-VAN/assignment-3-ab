import React, { useState, useEffect } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import Article from "../components/Article";

// const mytabs = [
//   { name: "Questions Asked", current: true },
//   { name: "Questions Answered", current: false },
// ];

const asked = [
  {
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
    },
  },
  {
    id: 2,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
    date: "2023-04-20T00:00:48.652Z",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Zia",
      role: "Co-Founder / CTO",
    },
  },
  {
    id: 3,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
    },
  },

  // More posts...
];

const answered = [
  {
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
    },
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Profile() {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState([
    { name: "Questions Asked", current: true },
    { name: "Questions Answered", current: false },
  ]);

  const [tabItems, setTabItems] = useState(asked);

  function handleTabClick(_tab) {
    setTabs((prevState) =>
      prevState.map((tab) =>
        tab.name === _tab.name
          ? { ...tab, current: true }
          : { ...tab, current: false }
      )
    );
    setTabItems(_tab.name === "Questions Asked" ? asked : answered);
  }

  const items = tabItems.map((post) => <Article key={post.id} post={post} />);

  return (
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
                    Margot Foster
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Email Address
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    margotfoster@example.com
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Currently Learning
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Python
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">About</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                    incididunt cillum culpa consequat. Excepteur qui ipsum
                    aliquip consequat sint. Sit id mollit nulla mollit nostrud
                    in ea officia proident. Irure nostrud pariatur mollit ad
                    adipisicing reprehenderit deserunt qui eu.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="border-b border-gray-200 pb-5 sm:pb-0 mt-10">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Candidates
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
          <div className="space-y-16 pt-10 sm:mt-1 sm:pt-10">{items}</div>
        </div>
      </div>
    </div>
  );
}

// function Profile() {
//   return <div>Profile Page</div>;
// }

// export default Profile;
