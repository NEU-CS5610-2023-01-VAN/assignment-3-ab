import React, { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { useAuthToken } from "../AuthTokenContext";
import api from "../api/base";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function ProfileSettings() {
  const { user, isAuthenticated } = useAuth0();
  const { accessToken } = useAuthToken();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedUsername, setUpdatedUsername] = useState("");

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await api.get("/profile", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUsername(response.data.name);
        setUpdatedUsername(response.data.name);
        setEmail(response.data.email);
        setUpdatedEmail(response.data.email);
      } catch (err) {
        console.log(err);
      }
    }
    if (accessToken) {
      trackPromise(fetchUserInfo());
    }
  }, [accessToken]);

  async function handleEdit() {
    const updatedUserInfo = { updatedEmail, updatedName: updatedUsername };
    try {
      const response = await api.put("/user", updatedUserInfo, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setEmail(updatedEmail);
      setUsername(updatedUsername);
      setUpdatedEmail("");
      setUpdatedUsername("");
      navigate("/profile", { replace: true });
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <div className="bg-white py-15 sm:py-15 pb-20 pt-10 mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-10">
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={handleEdit}
            className="border-2 rounded-lg p-5 border-gray-200"
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Edit Details
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="username"
                          name="username"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={updatedUsername}
                          onChange={(e) => setUpdatedUsername(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={updatedEmail}
                          onChange={(e) => setUpdatedEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* A section to add later */}

                  {/* <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Currently Learning
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="learning"
                          name="learning"
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div> */}

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      About
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full bg-gray-300 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                        disabled={true}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a few sentences about yourself.
                    </p>
                  </div>

                  {/* A feature to add later */}

                  {/* <div className="col-span-full">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      <UserCircleIcon
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Change
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
