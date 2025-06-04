"use client";
import React, { useState } from "react";
import UserPage from "../../components/user/UserPage";
import PostPage from "../../components/post/PostPage";
import { twMerge } from "tailwind-merge";

const Page = () => {
  const [tab, setTab] = useState<"user" | "post">("user");
  return (
    <div className="flex min-h-screen ">
      <div className="w-20 sm:w-32 border-r border-gray-200  ">
        <button
          className={twMerge(
            "w-full block  p-4 text-md font-bold sm:text-xl  transition-all duration-300 hover:text-emerald-500 ",
            tab === "user"
              ? "border-r-3 border-primary text-primary bg-gray-50"
              : "border-transparent"
          )}
          onClick={() => setTab("user")}
        >
          User
        </button>

        <button
          className={twMerge(
            "w-full block  p-4 text-md font-bold sm:text-xl  transition-all duration-300 hover:text-emerald-500 ",
            tab === "post"
              ? "border-r-3 border-primary text-primary bg-gray-50"
              : "border-transparent"
          )}
          onClick={() => setTab("post")}
        >
          <p className="font-bold text-sm sm:text-xl">Post</p>
        </button>
      </div>
      <div className="flex-1 ">
        {tab === "user" && <UserPage />}
        {tab === "post" && <PostPage />}
      </div>
    </div>
  );
};

export default Page;
