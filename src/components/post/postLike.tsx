import useChartJS from "@/hooks/useChartJs";
import { dbService, FBCollection } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import Loaiding from "../Loading";
import { Line } from "react-chartjs-2";

interface PostData {
  id: string;
  title: string;
  likeCount: number;
}

const PostLike = () => {
  useChartJS();

  const fetchTopPosts = useCallback(async () => {
    const ref = await dbService.collection(FBCollection.POSTS).get();

    const postsWithLikeCount: PostData[] = ref.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        title: doc.data().title || "제목 없음", // 제목이 없을 경우 기본값 설정
        likeCount: doc.data().likes?.length ?? 0,
      };
    });

    const topPosts = postsWithLikeCount
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 5);

    return topPosts;
  }, []);

  const { data, error, isPending } = useQuery({
    queryKey: ["topPosts"],
    queryFn: fetchTopPosts,
    staleTime: 1000 * 60 * 10,
  });

  const chartData = {
    //차트에 들어갈 데이터
    labels: data?.map((post) => `${post.title}`) ?? [],
    datasets: [
      {
        data: data?.map((post) => post.likeCount) ?? [],
        backgroundColor: "rgba(52, 211, 153)",
      },
    ],
  };

  if (isPending) {
    return <Loaiding />;
  }
  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  return (
    <div className="bg-gray-50 rounded-lg col gap-y-6 p-2 sm:p-4 min-w-[270px]   sm:min-w-[400px]   ">
      <h2 className="font-bold sm:text-2xl text-xl"> 좋아요 상위 5개</h2>

      <div className="max-w-[250px] sm:max-w-[400px] overflow-x-auto aspect-[4/3]    ">
        {/* aspect = 세로는 자동으로 가로 * 3/4 크기로 설정 */}
        <Line
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false, // 위쪽 초록 박스 없애기
              },
            },
            responsive: true, // 반응형 차트
            maintainAspectRatio: false, // 차트 크기 유지
          }}
        />
      </div>
    </div>
  );
};

export default PostLike;
