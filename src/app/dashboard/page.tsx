import { redirect } from "next/navigation";

export default function DashboardPage() {
  redirect("/dashboard/user"); // 기본적으로 유저 페이지로 이동
}
