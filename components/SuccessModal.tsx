
'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    userName: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, userName }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-sm shadow-2xl flex flex-col items-center text-center"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                        </button>

                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>

                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                            Hello, {userName}!
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                            Your message has been sent successfully. I've received your details and look forward to working or communicating with you soon!
                        </p>

                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-[5px] hover:opacity-90 transition-all duration-200"
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SuccessModal;
