"use client";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<Array<string>>([]);
  const nav = useRouter();
  const [passVisiable, setPassVisiable] = useState(false);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    setEmail(e.target.value);
    setError(validateEmail(e.target.value));
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    setPassword(e.target.value);
    setError(validatePassword(e.target.value));
  }

  // ✅ Email validator
  function validateEmail(value: string): string[] {
    const emailRegex: RegExp = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const errs: string[] = [];
    if (!value) errs.push("Email is required.");
    else if (!emailRegex.test(value)) errs.push("Invalid email format.");
    return errs;
  }

  // ✅ Password validator
  function validatePassword(value: string): string[] {
    const errs: string[] = [];
    if (!value) errs.push("Password is required.");
    if (value.length < 8)
      errs.push("Password must be at least 8 characters long.");
    if (!/[a-z]/.test(value))
      errs.push("Must contain at least one lowercase letter.");
    if (!/[A-Z]/.test(value))
      errs.push("Must contain at least one uppercase letter.");
    if (!/\d/.test(value)) errs.push("Must contain at least one number.");
    if (!/[@$!%*?&]/.test(value))
      errs.push("Must contain at least one special character (@$!%*?&).");
    return errs;
  }

  return (
    <main className={`flex h-full w-full`}>
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
              className={`placeholder:text-center placeholder:text-black focus:outline-none text-center text-black`}
            />
          </div>
          {/* password */}
          <div
            className={`bg-white/50 flex p-2 px-4 rounded-full focus-within:border my-2`}
          >
            <input
              type={passVisiable ? "text" : "password"}
              required
              placeholder="Password*"
              onChange={handlePasswordChange}
              className={`placeholder:text-center placeholder:text-black focus:outline-none text-center text-black`}
            />
            <div
              className="m-auto"
              onClick={() => setPassVisiable(!passVisiable)}
            >
              {passVisiable ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </div>
          </div>
          {/* forgot password button */}
          <div
            className={`ml-auto text-blue-400 text-sm bg-black/60 p-1 px-2 rounded-full hover:cursor-pointer`}
          >
            forgot password?
          </div>
          {/* Submit */}
          <input
            type="submit"
            value={"Signin"}
            className={`bg-green-300/80  p-2 px-4 rounded-full focus-within:border my-2 hover:cursor-pointer hover:bg-green-300/60 font-bold text-center text-black`}
          />
          <div className="m-auto">Or</div>
          {/* SignUp button */}
          <div
            className={`bg-blue-300/40 p-1 px-2 w-fit m-auto rounded-full hover:cursor-pointer hover:bg-blue-300/60 text-center text-black text-sm`}
            onClick={() => nav.push("signup")}
          >
            create account? sign up
          </div>
          {error.length > 0 && (
            <div className={`m-auto flex flex-col`}>
              {error.map((e, i) => {
                return (<div key={i} className={`m-auto text-red-600`}>{e}</div>)
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
