"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const nav = useRouter();

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  }

  return (
    <main className={`flex w-full h-full`}>
      {/* Outer div */}
      <div
        className={`m-auto min-w-fit min-h-fit w-[50%] h-[60%] bg-black/30 rounded-md backdrop-blur-lg border-black/40 border flex`}
      >
        {/* inner div */}
        <div className={`m-auto min-w-fit min-h-fit flex flex-col`}>
          {/* email */}
          <div
            className={`bg-white/50  p-2 px-4 rounded-full focus-within:border my-2`}
          >
            <input
              type="email"
              required
              placeholder="Email*"
              onChange={handleEmailChange}
              className={`placeholder:text-center placeholder:text-black focus:outline-none text-center`}
            />
          </div>

          {/* password */}
          <div
            className={`bg-white/50  p-2 px-4 rounded-full focus-within:border my-2`}
          >
            <input
              type="password"
              required
              placeholder="Password*"
              onChange={handlePasswordChange}
              className={`placeholder:text-center placeholder:text-black focus:outline-none text-center`}
            />
          </div>

          {/* confirm password */}
          <div
            className={`bg-white/50  p-2 px-4 rounded-full focus-within:border my-2`}
          >
            <input
              type="password"
              required
              placeholder="Confirm password*"
              onChange={handleConfirmPasswordChange}
              className={`placeholder:text-center placeholder:text-black focus:outline-none text-center`}
            />
          </div>

          {/* Submit */}
          <div
            className={`bg-green-300/80  p-2 px-4 rounded-full focus-within:border my-2 hover:cursor-pointer hover:bg-green-300/60 font-bold text-center text-black`}
          >
            Sign Up
          </div>
          <div className="m-auto">Or</div>
          {/* SignUp button */}
          <div
            className={`bg-blue-300/40 p-1 px-2 w-fit m-auto rounded-full hover:cursor-pointer hover:bg-blue-300/60 text-center text-black text-sm`}
            onClick={() => nav.push("signup")}
          >
            Already have an? sign In
          </div>
        </div>
      </div>
    </main>
  );
}
