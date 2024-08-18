import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { About, Dashboard, Home, SignIn, SignUp } from "./pages";

import Header from "./components/Header";
import FooterCom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminRoutes from "./components/OnlyAdminRoutes";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
import EmailVerificationScreen from "./components/EmailVerificationScreen ";
import PasswordForgottenForm from "./components/ForgotPassword";
import RequestRest from "./components/RequestRest";
import PasswordtRest from "./components/PasswordReset";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/search" element={<Search />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminRoutes />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
          <Route path="/post/:postSlug" element={<PostPage />} />
          <Route path="/request-reset" element={<RequestRest />} />
          <Route path="/password-reset/:token" element={<PasswordtRest />} />
          <Route path="*" element={<PageNotFound />} />

        </Routes>
        <FooterCom />
      </Router>
    </div>
  );
};

export default App;
