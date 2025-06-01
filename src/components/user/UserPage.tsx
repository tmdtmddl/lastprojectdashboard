"use client";
import { dbService, FBCollection } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import RankingPage from "./Ranking";
import { FaUser } from "react-icons/fa";
import Loaiding from "../Loading";

const ref = dbService.collection(FBCollection.USERS);

const UserPage = () => {
  const fetchUser = useCallback(async () => {
    try {
      const snap = await ref.get();
      const users = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return users;
    } catch (error: any) {
      throw new Error(
        `데이터를 가져오는 중 오류가 발생했습니다: ${error.message}`
      );
    }
  }, []);

  const { data, error, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 10,
  });

  if (isPending) {
    return <Loaiding message="유저 정보를 불러오는 중입니다..." />;
  }
  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <div className="p-10 col gap-y-10">
      <div className="flex justify-center gap-x-14  py-20 bg-gray-50 rounded-lg">
        <div className=" col items-center justify-center">
          <p className="font-bold text-4xl">유저수</p>
        </div>
        <div className=" flex flex-col items-center justify-center gap-y-2.5">
          <div>
            <FaUser className="text-6xl text-primary" />
          </div>
          {data && data.length === 0 && (
            <p className="text-3xl font-black text-emerald-600">유저없음</p>
          )}
          {data && data.length > 0 && (
            <p className="font-bold text-3xl text-emerald-600">
              {data.length}
              <span className="text-black">명</span>
            </p>
          )}
        </div>
      </div>
      <div>
        <RankingPage />
      </div>
    </div>
  );
};

export default UserPage;
