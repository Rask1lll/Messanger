"use client";
import { useEffect, useRef, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./Signup";

const LoginPageForm = () => {
  const [registerPage, setRegisterPage] = useState<boolean>(false);

  function changeMode() {
    setRegisterPage(!registerPage);
  }

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.classList.remove(
      "left-0",
      "left-1/2",
      "rounded-l-2xl",
      "rounded-r-2xl"
    );
    if (registerPage) {
      ref.current.classList.add("left-1/2", "rounded-r-2xl");
    } else {
      ref.current.classList.add("left-0", "rounded-l-2xl");
    }
  }, [registerPage]);
  return (
    <div className=" h-screen bg-gray-100 flex justify-center text-[12px] md:text-base items-center">
      <div className=" flex flex-col justify-center mb-3 relative w-full sm:w-[70%]">
        <h1 className="text-4xl mx-auto mb-7">Welcome to the my page</h1>
        <div className="flex mb-3 relative mx-auto w-fit">
          <div
            className="absolute bg-yellow-300 w-[50%] h-[100%] rounded-l-2xl transition-all duration-500 ease-in-out left-0"
            ref={ref}
          ></div>
          <div
            className={`${"bg-yellow-100"} hover:cursor-pointer  px-5 p-3 rounded-l-2xl`}
            onClick={() => setRegisterPage(false)}
          >
            <p className="relative z-10">Sign In</p>
          </div>
          <div
            className={`${"bg-yellow-100 hover:cursor-pointer"}  px-5 p-3 rounded-r-2xl`}
            onClick={() => setRegisterPage(true)}
          >
            <p className="relative z-10">Sign Up</p>
          </div>
        </div>
        <div className=" flex flex-col items-center h-full w-[100%]">
          {!registerPage ? <SignIn /> : <SignUp changeMode={changeMode} />}
        </div>
      </div>
    </div>
  );
};

export default LoginPageForm;
