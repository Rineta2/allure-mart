import { motion } from "framer-motion";

export const TableRowSkeleton = () => (
    <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        <th>
            <motion.div
                animate={{ background: ["#f5f5f5", "#e5e5e5", "#f5f5f5"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-4 w-4 rounded"
            />
        </th>
        <td>
            <motion.div
                animate={{ background: ["#f5f5f5", "#e5e5e5", "#f5f5f5"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-4 w-32 rounded"
            />
        </td>
        <td>
            <motion.div
                animate={{ background: ["#f5f5f5", "#e5e5e5", "#f5f5f5"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-4 w-24 rounded"
            />
        </td>
        <td>
            <motion.div
                animate={{ background: ["#f5f5f5", "#e5e5e5", "#f5f5f5"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-8 w-16 rounded"
            />
        </td>
    </motion.tr>
);