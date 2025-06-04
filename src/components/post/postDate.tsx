import useChartJS from "@/hooks/useChartJs";
import { dbService } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { Bar } from "react-chartjs-2";
import Loaiding from "../Loading";

const PostDate = () => {
  useChartJS();
  const fetchPostCountsByDate = useCallback(async () => {
    const ref = await dbService.collection("posts").get();

    const countMap: Record<string, number> = {};

    ref.docs.forEach((doc) => {
      const createdAt = doc.data().createdAt;

      if (!createdAt || !createdAt.toDate) {
        return;
      }

      const dateStr = createdAt.toDate().toISOString().split("T")[0]; //! 날짜를 문자열로 변환 후  → "2025-06-03T10:00:00.000Z" → "2025-06-03"

      countMap[dateStr] = (countMap[dateStr] || 0) + 1; //만약 countMap["2025-06-03"]가 이미 있으면, 그 값에 +1 없으면 기본값 0에서 시작해서 +1
    });

    return Object.entries(countMap) //객체를 배열로 변환
      .sort((a, b) => a[0].localeCompare(b[0])) //오름차순으로 정렬
      .map(([date, count]) => ({ date, count })); //다시 객체형태로 가공
  }, [dbService]);

  const { data, error, isPending } = useQuery({
    queryKey: ["postsByDate"],
    queryFn: fetchPostCountsByDate,
    staleTime: 1000 * 60 * 10,
  });

  const chartData = {
    labels: data?.map((item) => item.date) ?? [],
    datasets: [
      {
        label: "게시글 수",
        data: data?.map((item) => item.count) ?? [],
        backgroundColor: "rgba(52, 211, 153, 0.6)",
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
    <div className="bg-gray-50  rounded-lg col gap-y-6 p-2 sm:p-4 min-w-[270px]   sm:min-w-[400px]  ">
      <h2 className="font-bold sm:text-2xl text-xl"> 날짜별 게시글 수</h2>

      <div className="max-w-[250px] sm:max-w-[400px] overflow-x-auto aspect-[4/3]    ">
        {/* aspect = 세로는 자동으로 가로 * 3/4 크기로 설정 */}
        <Bar
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false, // 위쪽 초록 박스 없애기
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default PostDate;
