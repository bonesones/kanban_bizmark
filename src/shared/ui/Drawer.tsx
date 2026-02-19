import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";

type DrawerProps = {
  children: React.ReactNode;
  isOpen: boolean;
};

export const Drawer = ({ children, isOpen }: DrawerProps) =>
  createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={{
            hidden: { x: "100%" },
            visible: { x: 0 },
            exit: { x: "100%" },
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 200,
            duration: 0.3,
          }}
          className="fixed right-0 top-0 bottom-0 z-1000 bg-white h-screen w-4xl"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
