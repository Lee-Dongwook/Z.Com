"use client";

import React, {
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
} from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface ILoginModal {
  id: string;
  password: string;
  message: string;
}

export default function LoginModal() {
  const [loginModalData, setLoginModalData] = useState<ILoginModal>({
    id: "",
    password: " ",
    message: "",
  });

  const router = useRouter();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setLoginModalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoginModalData((prev) => ({ ...prev, message: "" }));
    try {
      const response = await signIn("credentials", {
        username: loginModalData.id,
        password: loginModalData.password,
        redirect: false,
      });

      if (!response?.ok) {
        setLoginModalData((prev) => ({
          ...prev,
          message: "아이디와 비밀번호가 일치하지 않습니다.",
        }));
      } else {
        router.replace("/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onClickClose = () => {
    router.back();
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.4)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    ></div>
  );
}
