import React from "react";
import "./P04.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <div className="">
        <div className="">
          <div className="xs-12 md-6 mx-auto flex items-center justify-center h-screen">
            <div id="countUp">
              <div className="text-7xl font-bold">404</div>

              <div className="text-4xl font-bold">Page not found</div>
              <div className="text-2xl">This may not mean anything.</div>
              <div className="text">
                I'm probably working on something that has blown up.
              </div>
              <Link to="/">
                <button className=" bg-gradient-to-r p-2 m-4 from-teal-500 via-purple-950 to-pink-500 rounded-lg text-white">
                  Go to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
