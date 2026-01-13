'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText } from 'lucide-react';
import dynamic from 'next/dynamic';
import ResumePDF from './ResumePDF';

// Dynamically import PDF components with SSR disabled
const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    { ssr: false }
);

const PDFViewer = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
    { ssr: false }
);

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 border border-transparent dark:border-white">
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
                        className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-zinc-900 rounded-sm shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-zinc-200 dark:border-white">
                            <div className="flex items-center gap-3">

                                <div>
                                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Resume Preview</h2>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Review and download my professional resume</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <PDFDownloadLink
                                    document={<ResumePDF />}
                                    fileName="ErrolTabangen_Resume.pdf"
                                >
                                    {/* @ts-ignore - loading prop is mixed in by PDFDownloadLink */}
                                    {({ loading }: { loading: boolean }) => (
                                        <button
                                            className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white hover:bg-black/80 text-white dark:text-black rounded-lg transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={loading}
                                        >
                                            <Download className="w-4 h-4" />
                                            {loading ? 'Preparing...' : 'Download as PDF'}
                                        </button>
                                    )}
                                </PDFDownloadLink>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                                </button>
                            </div>
                        </div>

                        {/* Content / PDF Viewer */}
                        <div className="flex-1 overflow-hidden bg-zinc-100 dark:bg-zinc-950 p-4">
                            <div className="w-full h-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-inner">
                                <PDFViewer width="100%" height="100%" showToolbar={false} style={{ border: 'none' }}>
                                    <ResumePDF />
                                </PDFViewer>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ResumeModal;
