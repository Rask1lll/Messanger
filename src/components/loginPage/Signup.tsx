"use client";
import { useForm } from "react-hook-form";
import useAlertStore from "@/store/alertStore";

type FormData = {
  email: string;
  password: string;
  verPassword: string;
  userName: string;
};

const SignUp = ({ changeMode }: { changeMode: () => void }) => {
  const { setMessage } = useAlertStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const registering = async (data: FormData) => {
    if (data.verPassword !== data.password) {
      setMessage("Password is not symmetric");
      return;
    }

    const reqContent = JSON.stringify({
      name: data.userName,
      email: data.email,
      password: data.password,
    });
    const res = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqContent,
    });

    if (res.ok) {
      setMessage("User registered KAIF");
      changeMode();
    }

    const registeringResult = await res.json();

    if (registeringResult.message) {
      return setMessage(registeringResult.message);
    } else if (!res.ok) {
      return setMessage(`Registration Error`);
    }
  };

  return (
    <form
      className="w-[50%] flex flex-col bg-white items-center shadow-lg shadow-gray-400 p-10 gap-6"
      onSubmit={handleSubmit(registering)}
      noValidate
    >
      <div className="w-[50%] flex gap-1 flex-col">
        <label htmlFor="email" className="block">
          Write your Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full bg-gray-200 text-[20px] p-1"
          {...register("email", {
            required: "required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Не валидная почта",
            },
          })}
        />
        {errors.email?.message && (
          <div className="text-red-600 text-sm">
            {String(errors.email.message)}
          </div>
        )}
      </div>

      <div className="w-[50%]">
        <label htmlFor="userName">Write New Users name</label>
        <input
          id="userName"
          type="text"
          placeholder="User Name"
          className="w-full text-[20px] bg-gray-200 p-1"
          {...register("userName", {
            minLength: { value: 3, message: "Длинна не менее 3 символов" },
            maxLength: { value: 15, message: "Длинна не более 15 символов" },
            required: "required",
          })}
        />
      </div>

      <div className="w-[50%] flex gap-1 flex-col">
        <label htmlFor="password" className="block">
          Write your Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full text-[20px] bg-gray-200 p-1"
          {...register("password", {
            required: "required",
            minLength: { value: 6, message: "Минимум 6 символов" },
          })}
        />
        {errors.password?.message && (
          <div className="text-red-600 text-sm">
            {String(errors.password.message)}
          </div>
        )}
      </div>

      <div className="w-[50%] flex gap-1 flex-col">
        <label htmlFor="verPassword" className="block">
          Confirm Password
        </label>
        <input
          type="password"
          id="verPassword"
          placeholder="Confirm Password"
          className="w-full text-[20px] bg-gray-200 p-1"
          {...register("verPassword", { required: "required" })}
        />
        {errors.verPassword?.message && (
          <div className="text-red-600 text-sm">
            {String(errors.verPassword.message)}
          </div>
        )}
      </div>

      <button
        className="bg-yellow-200 w-[40%] px-4 py-2 hover:cursor-pointer hover:ring-2 ring-amber-200 rounded-2xl disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
};

export default SignUp;
