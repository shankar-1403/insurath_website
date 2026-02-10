import { motion, AnimatePresence } from "framer-motion";
import { FC } from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="shadow-sm border rounded-4xl border-gray-200">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left cursor-pointer p-4"
        type="button"
      >
        <span className="text-lg text-blue-950 font-semibold">
          {question}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <IconChevronDown className="w-6 h-6" color="#E18126" />
        </motion.span>
      </button>

      {/* Content */}
      <div className={`px-4 ${isOpen ? "pb-4" : "pb-0"}`}>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-gray-700">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AccordionItem;
