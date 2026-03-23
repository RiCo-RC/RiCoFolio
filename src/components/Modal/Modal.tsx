"use client";

import { useEffect, useCallback, ReactNode, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@src/lib";
import { Button } from "@src/components/Button";
import { Component } from "@src/types";

type ModalSizeValue = "sm" | "md" | "lg" | "xl" | "full";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
	size?: ModalSizeValue;
	className?: string;
	footer?: ReactNode;
}

const Modal: Component<ModalProps> = ({
	open,
	onClose,
	title,
	children,
	size = "lg",
	className,
	footer,
}) => {
	const handleKey = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		},
		[onClose],
	);

	useEffect(() => {
		if (open) {
			document.addEventListener("keydown", handleKey);
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.removeEventListener("keydown", handleKey);
			document.body.style.overflow = "";
		};
	}, [open, handleKey]);

	const sizeClass = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
		full: "max-w-[95vw] h-[90vh]",
	}[size];

	return (
		<AnimatePresence>
			{open && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					role="dialog"
					aria-modal="true"
				>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						onClick={onClose}
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 10 }}
						transition={{ duration: 0.2 }}
						className={cn(
							"relative w-full rounded-(--radius-xl) bg-surface border border-border shadow-2xl flex flex-col overflow-hidden",
							sizeClass,
							size === "full" && "max-h-[90vh]",
							className,
						)}
					>
						{title && (
							<div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
								<h2 className="text-lg font-semibold text-text-primary)]">
									{title}
								</h2>
								<Button
									variant="ghost"
									size="icon"
									onClick={onClose}
									aria-label="Close modal"
								>
									<X size={18} />
								</Button>
							</div>
						)}
						{!title && (
							<Button
								variant="ghost"
								size="icon"
								onClick={onClose}
								aria-label="Close modal"
								className="absolute top-3 right-3 z-10"
							>
								<X size={18} />
							</Button>
						)}
						<div className="flex-1 overflow-y-auto p-6">{children}</div>
						{footer && (
							<div className="px-6 py-4 border-t border-border shrink-0 flex justify-end gap-2">
								{footer}
							</div>
						)}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Modal;