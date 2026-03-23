"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@src/lib";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	hover?: boolean;
	glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
	({ className, hover = true, glow = false, children, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"bg-surface border border-border rounded-lg p-5 flex flex-col gap-4",
				hover &&
					"transition-all duration-(--motion-duration-normal) hover:border-border-strong hover:-translate-y-0.5",
				glow && "hover:shadow-[0_0_20px_var(--clr-accent-glow)]",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	),
);

Card.displayName = "Card";

export default Card;
