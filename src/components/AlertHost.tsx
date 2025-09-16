"use client";
import useAlertStore from "@/store/alertStore";
import { useEffect } from "react";
import Alert from "./Alert";

const AlertHost = () => {
  const { message, clearMessage, isSecure, setIsSecure } = useAlertStore();
  useEffect(() => {
    setTimeout(() => {
      clearMessage();
      setIsSecure(true);
    }, 7000);
  }, [clearMessage, message]);
  return <Alert message={message} isSecure={isSecure} />;
};

export default AlertHost;
