"use client";

import { motion } from "framer-motion";
import { MobileSearch } from "../mobile-search";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="block sm:hidden">
        <MobileSearch onClose={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="solid-section"
      >
        {children}
      </motion.div>
    </>
  );
}
