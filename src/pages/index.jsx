import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "../utils/contextApi/AppContext";
import Login from "./login/components";
import SideNav from "./layout/sidenav/components";
import PageNotFound from "../utils/components/PageNotFound";
import Loading from "../utils/components/Loading";
import Header from "./layout/Header/components";
import ChatBox from "../utils/components/ChatBox";
const Profile = React.lazy(() => import("./profile/components"));
const Posts = React.lazy(() => import("./posts/components"));
const Gallery = React.lazy(() => import("./gallery/components"));
const Todo = React.lazy(() => import("./todo/components"));

export default function MainComponent() {
  const { usersData, getUsersData } = useContext(AppContext);

  useEffect(() => {
    if (!usersData) getUsersData();
  }, [getUsersData, usersData]);

  const AuthenticatedRoute = ({ children }) => {
    return (
      <div className="appContainer">
        <SideNav />
        <div className="innerAppContainer">
          <Header />
          {children}
        </div>
        <ChatBox />
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={
          <AuthenticatedRoute>
            <React.Suspense fallback={<Loading />}>
              <Profile />
            </React.Suspense>
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/posts"
        element={
          <AuthenticatedRoute>
            <React.Suspense fallback={<Loading />}>
              <Posts />
            </React.Suspense>
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/gallery"
        element={
          <AuthenticatedRoute>
            <React.Suspense fallback={<Loading />}>
              <Gallery />
            </React.Suspense>
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/todo"
        element={
          <AuthenticatedRoute>
            <React.Suspense fallback={<Loading />}>
              <Todo />
            </React.Suspense>
          </AuthenticatedRoute>
        }
      />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}
