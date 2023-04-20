import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import VerifyUser from "./pages/SignIn";
import UserPosts from "./pages/UserPosts";
import UserDetail from "./pages/UserDetail";
import PostDetails from "./pages/PostDetails";
import NotFound from "./pages/NotFound";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/verify-user`,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: requestedScopes.join(" "),
    }}
  >
      <AuthTokenProvider> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/verify-user" element={<VerifyUser />} />
        <Route path="user/:id/posts" element={<UserPosts />} />
        <Route path="users/:id" element={<UserDetail />} />
        <Route path="posts/:id" element={<PostDetails />} />
        {/* <Route path="search/:search" element={<SearchResult />} /> */}

        {/* <Route path="profile" element={<ProfileDetail />} />
        <Route path="posts/new" element={<EditPost />} />
        <Route path="posts/edit/:id" element={<EditPost />} />
        <Route path="profile/settings" element={<ProfileSettings />} /> */}

        {/* <Route path="debugger" element={<AuthDebugger />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    {/* </AuthTokenProvider>
    </Auth0Provider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
