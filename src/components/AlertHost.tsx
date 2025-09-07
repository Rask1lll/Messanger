"use client";
import useAlertStore from "@/store/alertStore";
import { useEffect } from "react";
import Alert from "./Alert";

const AlertHost = () => {
  const { message, clearMessage } = useAlertStore();
  useEffect(() => {
    setTimeout(() => {
      clearMessage();
    }, 7000);
  }, [message]);
  return <Alert message={message} />;
};

export default AlertHost;
