import React from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <div className="bg-white py-15 sm:py-15 pb-20 mt-10">
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
        </div>
      </div>
    </div>
  );
}

// function Profile() {
//   return <div>Profile Page</div>;
// }

// export default Profile;
