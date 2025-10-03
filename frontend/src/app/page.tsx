"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const nav = useRouter();
  const isAuth = useAuth();

  return (
    <main className={`h-full w-full flex`}>
      {/* Outer div */}
      <div
        className={` m-auto p-3 w-[40%] h-[40%] min-w-fit bg-black/30 backdrop-blur-xs rounded-md border flex`}
      >
        {/* inner div */}
        <div className={`m-auto`}>
          <label className={` font-bold text-2xl backdrop-blur-sm`}>
            Welcome to dashboard
          </label>
          {isAuth && (
            <div
              className={`underline hover:cursor-pointer`}
              onClick={() => nav.push("/signin")}
            >
              Login to use app
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
