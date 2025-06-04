"use client";
import React, { use, useState } from "react";
import UserPage from "./user/page";
import PostPage from "./post/page";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen ">
      <div className="w-20 sm:w-32 border-r border-gray-200  ">
        <Link
          href={"/dashboard/user"}
          className={twMerge(
            "w-full block  p-2 sm:p-4 text-md font-bold sm:text-xl  transition-all duration-300 hover:text-emerald-500 ",
            pathname === "/dashboard/user"
              ? "border-r-3 border-primary text-primary bg-gray-50"
              : "border-transparent"
          )}
        >
          User
        </Link>

        <Link
          href={"/dashboard/post"}
          className={twMerge(
            "w-full block  p-2 sm:p-4 text-md font-bold sm:text-xl  transition-all duration-300 hover:text-emerald-500  ",
            pathname === "/dashboard/post"
              ? "border-r-3 border-primary text-primary bg-gray-50"
              : "border-transparent"
          )}
        >
          <p className="font-bold text-sm sm:text-xl">Post</p>
        </Link>
      </div>
      <div className="flex-1">{children}</div>
      {/* <div className="flex-1 ">
        {pathname === "dashboard/user" && <UserPage />}
        {pathname === "dashboard/post" && <PostPage />}
      </div> */}
    </div>
  );
}
