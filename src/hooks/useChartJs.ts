import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

let isRegistered = false;

const useChartJS = () => {
  useEffect(() => {
    if (!isRegistered) {
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      isRegistered = true; // 한 번만 등록되도록 //! 컴포넌트안에서 또 정의되면 에러가 발생
    }
  }, []);
};

export default useChartJS;
