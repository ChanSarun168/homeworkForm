import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
interface ModalProps {
  children?: ReactNode;
  selected: string;
  status: string;
}

const Modal: React.FC<ModalProps> = ({ children, seleted, status }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  if (seleted) {
    status = "Edit";
  } else {
    status = "Add";
  }
  return (
    <>
      <button
        onClick={() => {
          setIsShowModal(true);
        }}
        className="w-[100px] h-[100px] bg-blue-500 font-bold rounded-full right-3 bottom-3  fixed text-2xl"
      >
        {status}
      </button>
      {isShowModal && (
        <>
          <motion.div
            initial={{ x: "100%" }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bg-indigo-600 text-white shadow-lg top-0 right-0 w-[600px] h-screen p-5"
          >
            <button
              onClick={() => setIsShowModal((sideBar) => !sideBar)}
              className="bg-white text-black h-8 w-8 block mb-2 rounded-full"
            >
              &times;
            </button>
            <div>{children}</div>
          </motion.div>
        </>
      )}
    </>
  );
};

export { Modal };
