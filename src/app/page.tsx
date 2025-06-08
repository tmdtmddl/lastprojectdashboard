"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AdminLogin() {
  const [pw, setPw] = useState("");
  const pwRef = useRef<HTMLInputElement>(null);

  const navi = useRouter();

  const handleLogin = () => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (pw === adminPassword) {
      navi.push("/dashboard/user");
    } else {
      alert("비밀번호가 올바르지 않습니다.");
      return pwRef.current?.focus();
    }
  };

  useEffect(() => {
    return pwRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] gap-y-6">
      <h1 className="text-3xl font-bold"> 관리자 로그인</h1>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          return handleLogin();
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="pw" className="text-gray-400">
            비번
          </label>
          <input
            type="password"
            id="pw"
            className="border px-4 py-2 mb-2 rounded min-w-80"
            placeholder="비밀번호 입력"
            ref={pwRef}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-primary  text-white p-3 rounded min-w-80"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
