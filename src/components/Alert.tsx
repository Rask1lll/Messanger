import useAlertStore from "@/store/alertStore";
import { AnimatePresence, motion } from "framer-motion";

interface AlertProps {
  message: string;
}
export default function Alert(alertMessage: AlertProps) {
  const { clearMessage, message } = useAlertStore();
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="w-full flex fixed top-10 justify-center"
          initial={{ y: -100, opacity: 0.2 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-red-400 flex p-4 relative h-1/2 wrap-anywhere text-white w-1/3">
            <p className="w-full">{alertMessage.message}</p>
            <div
              className=" text-black bg-gray-300 opacity-100 p-1 py-0 rounded-full text-xl leading-7 text-center hover:cursor-pointer flex justify-start absolute -top-3 -right-1 items-start"
              onClick={() => {
                clearMessage();
              }}
            >
              x
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
