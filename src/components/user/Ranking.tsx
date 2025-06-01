"use client";

import { dbService, FBCollection } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 유저 데이터 + 팔로워 수 포함 타입
interface UserWithFollowerCount {
  id: string;
  nickname: string;
  followerCount: number;
}

const fetchTopUsers = async (): Promise<UserWithFollowerCount[]> => {
  const userSnap = await dbService.collection(FBCollection.USERS).get();

  // 모든 유저 문서에 대해 followers 서브컬렉션 길이 가져오기
  // Promise.all()은 여러 비동기 작업을 병렬로 동시에 실행( 모든 비동기 작업이 끝날 때까지 기다렸다가, 결과를 배열로 반환)
  //Promise.all()은 "N개의 비동기 작업을 동시에 실행해서 결과를 한꺼번에 받는다
  const usersWithCounts: UserWithFollowerCount[] = await Promise.all(
    userSnap.docs.map(async (doc) => {
      const ref = await dbService
        .collection(FBCollection.USERS)
        .doc(doc.id)
        .collection(FBCollection.FOLLOWERS)
        .get();

      return {
        id: doc.id,
        nickname: doc.data().nickname,
        followerCount: ref.size,
      };
    })
  );

  // followerCount 기준으로 내림차순 정렬 후 상위 5명 반환
  const topUsers = usersWithCounts
    .sort((a, b) => b.followerCount - a.followerCount)
    .slice(0, 5);

  return topUsers;
};

const RankingPage = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["topUsers"],
    queryFn: fetchTopUsers,
  });

  const chartData = {
    //차트에 들어갈 데이터
    labels: data?.map((user) => `${user.nickname}님`) ?? [],
    datasets: [
      {
        data: data?.map((user) => user.followerCount) ?? [],
        backgroundColor: "rgba(52, 211, 153)",
      },
    ],
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="bg-gray-50 p-10 rounded-lg">
      <h2 className="font-bold text-xl"> 팔로워 상위 5인</h2>
      <div className="w-full min-h-[400px]  p-2.5">
        <Bar
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false, // 위쪽 초록 박스 없애기
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default RankingPage;

{
  /* <ul>
{data?.map((user, idx) => (
  <li key={user.id} className="mb-2">
    {idx + 1}위 - {user.name} ({user.followerCount}명)
  </li>
))}
</ul> */
}
