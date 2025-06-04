"use client";
import { dbService, FBCollection } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import Loaiding from "../../../components/Loading";
import { BsFileEarmarkPost } from "react-icons/bs";
import PostLike from "../../../components/post/postLike";
import PostDate from "../../../components/post/postDate";

const PostPage = () => {
  const ref = dbService.collection(FBCollection.POSTS);

  const fetchPost = useCallback(async () => {
    try {
      const snap = await ref.get();
      const posts = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return posts;
    } catch (error: any) {
      throw new Error(
        `데이터를 가져오는 중 오류가 발생했습니다: ${error.message}`
      );
    }
  }, []);

  const { data, error, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
    staleTime: 1000 * 60 * 10,
  });

  if (isPending) {
    return <Loaiding />;
  }
  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }
  return (
    <div className=" col   p-2 sm:p-4 gap-y-10  justify-center items-center">
      <div className="col  gap-y-12   bg-gray-50 rounded-lg p-2 sm:p-4 min-w-[270px]   sm:min-w-[400px] ">
        <p className="font-bold sm:text-2xl text-xl">포스트 수</p>

        <div className=" flex flex-col items-center justify-center gap-y-2.5 ">
          <div>
            <BsFileEarmarkPost className="text-4xl sm:text-5xl text-primary" />
          </div>
          {data && data.length === 0 && (
            <p className="text-xl sm:text-2xl font-bold text-emerald-600">
              포스트 없음
            </p>
          )}
          {data && data.length > 0 && (
            <p className="font-bold text-xl sm:text-2xl text-emerald-600">
              {data.length}
              <span className="text-black">개</span>
            </p>
          )}
        </div>
      </div>
      <div>
        <PostLike />
      </div>
      <div>
        <PostDate />
      </div>
    </div>
  );
};

export default PostPage;
