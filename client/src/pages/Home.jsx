import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Feed from "../components/Feed";

const items = [
  {
    id: 1,
    title: "How to not fail webdev?",
    body: "So I'm tfjdskjfdlsjfka jdsflkajdfljadl kfjdslkjfld skjfdsk ljfldsjfl kdsjflkdjsflkjdslfjdskfjdslkfjewoijtfkdsnflkJHFFHJAS",
  },
  // More items...
];

function Home() {
  const navigate = useNavigate()
  function Example() {
    return (
      <ul role="list" className="space-y-3 mt-5">
        {items.map((item) => (
          <li
            key={item.id}
            className="overflow-hidden rounded-md px-6 py-4 cursor-pointer"
            onClick={(event) => console.log(event)}
          >
            <div className="border-4 border-gray-400 divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg hover:bg-gray-100">
              <div className="px-4 py-5 sm:px-6 text-2xl font-bold">
                {item.title} 
                {/* Content goes here */}
                {/* We use less vertical padding on card headers on desktop than on body sections */}
              </div>
              <div className="px-4 py-5 sm:p-6 text-base font-medium">
                {item.body}
                {/* Content goes here */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  useEffect(() => {
    async function getAllQuestions() {
      const questions = await fetch("http://localhost:8000/questions");
      const json = await questions.json();
      console.log(json);
      return json;
    }
    getAllQuestions();
  }, []);

  return (
    <div>
      <Navbar />
      {/* <div className="lg:px-20 md:px-20">
        <Example />
      </div> */}
        <Feed />
      <Footer />
    </div>
  );
}

export default Home;
