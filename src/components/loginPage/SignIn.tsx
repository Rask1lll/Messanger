"use client";
import useAuthUser from "@/store/currentUser";
import { useForm } from "react-hook-form";
import Alert from "../Alert";
import useAlertStore from "@/store/alertStore";
import { useRouter } from "next/navigation";
import { UserLogin } from "@/types/UserLogin";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  const { setEmail, setAvatarURL } = useAuthUser();
  const { setMessage } = useAlertStore();
  const router = useRouter();

  async function handleLogin(data: UserLogin) {
    const loginContent = JSON.stringify({
      email: data.email,
      password: data.password,
    });
    const loginRes = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: loginContent,
    });

    const userLoginResult = await loginRes.json();
    if (userLoginResult.message) {
      setMessage(userLoginResult.message);
    } else if (!loginRes.ok) {
      setMessage("Login error");
      return;
    } else {
      localStorage.setItem("token", userLoginResult.token);
      setEmail(userLoginResult.user.email);
      setAvatarURL(userLoginResult.user.avatarUrl);
      router.push("/home");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="sm:w-[50%] w-[70%] h-1/2 flex flex-col gap-15 p-10 bg-white items-center justify-center shadow-gray-400 shadow-lg  "
    >
      <div className="block w-[50%]">
        <label htmlFor="Email">Your Email</label>
        <input
          id="Email"
          type="text"
          className="w-full flex-grow-1 text-[20px] bg-gray-200 p-1"
          placeholder="Email"
          {...register("email", {
            required: "Заполните поле",
            minLength: {
              value: 6,
              message: "Минимум 6 символа",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Не валидная почта",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {String(errors.email.message)}
          </p>
        )}
      </div>
      <div className="block w-[50%]">
        <label htmlFor="Password">Your Password</label>
        <input
          id="Password"
          type="password"
          className="w-full text-[20px] p-1 bg-gray-200"
          placeholder="Password"
          {...register("password", {
            required: "Заполните поле",
            minLength: {
              value: 6,
              message: "Минимум 6 символа",
            },
            maxLength: {
              value: 20,
              message: "Максимум 20 символа",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]/,
              message: "xh",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {String(errors.password.message)}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-yellow-200 w-[40%] hover:cursor-pointer hover:bg-blue-100 h-10 rounded-2xl"
      >
        Submit
      </button>
    </form>
  );
};

export default SignIn;
