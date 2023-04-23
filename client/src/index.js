import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import UserPosts from "./pages/UserPosts";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import PostDetails from "./pages/PostDetails";
import NotFound from "./pages/NotFound";
import VerifyUser from "./components/VerifyUser";
import AuthDebugger from "./components/AuthDebugger";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";
import AppLayout from "./pages/AppLayout";
import WhisperAPI from "./pages/WhisperAPI";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const requestedScopes = [
  "profile",
  "email",
  "read:user",
  "read:question",
  "read:answer",
  "read:tag",
  "edit:user",
  "edit:question",
  "edit:answer",
  "edit:tag",
  "write:user",
  "write:question",
  "write:answer",
  "write:tag",
  "delete:user",
  "delete:question",
  "delete:answer",
  "delete:tag",
];

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/verify-user`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: requestedScopes.join(" "),
      }}
    >
      <AuthTokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/verify-user" element={<VerifyUser />} />

            {/* Routes with header and footer common components */}
            <Route path="/" element={<AppLayout />}>
              <Route index path="home" element={<Home />} />
              <Route path="posts/:id" element={<PostDetails />} />
              <Route path="whisperAPI" element={<WhisperAPI />} />

              {/* <Route path="search/:search" element={<SearchResult />} /> */}
              <Route
                path="profile"
                element={
                  // <RequireAuth>
                    <Profile />
                  // </RequireAuth>
                }
              />
              <Route
                path="profile/settings"
                element={
                  // <RequireAuth>
                    <ProfileSettings />
                  // </RequireAuth>
                }
              />
              {/* <Route
                path="user/posts/"
                element={
                  <RequireAuth>
                    <UserPosts />
                  </RequireAuth>
                }
              /> */}
            </Route>
            <Route path="debugger" element={<AuthDebugger />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
