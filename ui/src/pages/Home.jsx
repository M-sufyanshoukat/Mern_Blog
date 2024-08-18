import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { TypeAnimation } from "react-type-animation";
import MetaData from "../components/MetaData";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <MetaData title="Home"/>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h2 className="text-3xl font-bold">Welcome to My Site</h2>

        <TypeAnimation
          className="text-lg font-bold lg:text-6xl"
          sequence={[
            "Here I Upload Blogs Related",
            2000,
            " React Js",
            2000,
            "Next Js",
            2000,
            "JavaScript",
            2000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: "40px", display: "inline-block" }}
          repeat={Infinity}
        />

        <p className="text-gray-500 text-xs sm:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro officia
          vel nulla odio quod aspernatur?
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="max-w-screen-xl mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-4">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </div>

            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
