import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  PaperClipIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { useAuthToken } from "../AuthTokenContext";
import api from "../api/base";
import { NavLink, useNavigate } from "react-router-dom";

const labels = [
  { name: "General", value: null, id: 11 },
  { name: "Python", value: "python", id: 1 },
  { name: "C", value: "c", id: 2 },
  { name: "C++", value: "c++", id: 3 },
  { name: "Java", value: "java", id: 4 },
  { name: "JavaScript", value: "javascript", id: 5 },
  { name: "Rust", value: "rust", id: 6 },
  { name: "React", value: "react", id: 7 },
  { name: "Go", value: "go", id: 8 },
  { name: "C#", value: "c#", id: 9 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PostInput({ userQuestions, setUserQuestions }) {
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [labelled, setLabelled] = useState(labels[0]);

  async function handleSubmit(e) {
    e.preventDefault();

    // const datetime = new Date(Date.UTC()).toLocaleString;
    const newQuestion = { title, body, tagID: labelled.id };
    try {
      const response = await api.post("/question", newQuestion, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const updatedUserQuestions = [...userQuestions, response.data];
      setUserQuestions(updatedUserQuestions);
      setTitle("");
      setBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="mb-20 overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description" className="sr-only">
          body
        </label>
        <textarea
          rows={2}
          name="body"
          id="body"
          className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Write a description..."
          defaultValue={""}
          onChange={(e) => setBody(e.target.value)}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
        <div className="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
          <Listbox
            as="div"
            value={labelled}
            onChange={setLabelled}
            className="flex-shrink-0"
          >
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only">Add a label</Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                    <TagIcon
                      className={classNames(
                        labelled.value === null
                          ? "text-gray-300"
                          : "text-gray-500",
                        "h-5 w-5 flex-shrink-0 sm:-ml-1"
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        labelled.value === null ? "" : "text-gray-900",
                        "hidden truncate sm:ml-2 sm:block"
                      )}
                    >
                      {labelled.value === null ? "Tag" : labelled.name}
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {labels.map((label) => (
                        <Listbox.Option
                          key={label.value}
                          className={({ active }) =>
                            classNames(
                              active ? "bg-gray-100" : "bg-white",
                              "relative cursor-default select-none px-3 py-2"
                            )
                          }
                          value={label}
                        >
                          <div className="flex items-center">
                            <span className="block truncate font-medium">
                              {label.name}
                            </span>
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex-shrink-0 ml-auto">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
