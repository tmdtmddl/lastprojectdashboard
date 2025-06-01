"use client";
import React, { useState } from "react";
import UserPage from "../../components/user/UserPage";
import PostPage from "../../components/post/PostPage";
import { twMerge } from "tailwind-merge";

const Page = () => {
  const [tab, setTab] = useState<"user" | "post">("user");
  return (
    <div>
      <div className=" flex justify-center items-center  ">
        <button
          className={twMerge(
            "w-1/2 border-b-2  p-4 text-center",
            tab === "user" && "border-primary text-primary"
          )}
          onClick={() => setTab("user")}
        >
          <p className="font-bold text-xl">User</p>
        </button>

        <button
          className={twMerge(
            "w-1/2 border-b-2  p-4 text-center",
            tab === "post" && "border-primary text-primary"
          )}
          onClick={() => setTab("post")}
        >
          <p className="font-bold text-xl">Post</p>
        </button>
      </div>
      <div>
        {tab === "user" && <UserPage />}
        {tab === "post" && <PostPage />}
      </div>
    </div>
  );
};

export default Page;
