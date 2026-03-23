"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@src/lib";

type ButtonVariantValue =
	| "primary"
	| "secondary"
	| "ghost"
	| "outline"
	| "danger";

type ButtonSizeValue = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariantValue;
	size?: ButtonSizeValue;
}

const buttonVariants = {
	primary:
		"bg-accent text-white hover:opacity-90 shadow-sm hover:shadow-[0_0_12px_var(--clr-accent-glow)]",
	secondary:
		"bg-surface-elevated text-text-primary border border-border hover:border-accent hover:text-accent",
	ghost:
		"text-text-secondary hover:text-text-primary hover:bg-surface-elevated",
	outline: "border border-accent text-accent hover:bg-accent hover:text-white",
	danger:
		"bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20",
};

const buttonSizes = {
	sm: "text-xs px-3 py-1.5 h-7",
	md: "text-sm px-4 py-2 h-9",
	lg: "text-base px-6 py-2.5 h-11",
	icon: "w-9 h-9 p-0",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant = "primary", size = "md", children, ...props },
		ref,
	) => {
		return (
			<button
				ref={ref}
				className={cn(
					"inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration--motion-duration-fast cursor-pointer select-none",
					"focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
					"disabled:opacity-40 disabled:pointer-events-none",
					buttonVariants[variant],
					buttonSizes[size],
					className,
				)}
				{...props}
			>
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";
export default Button;