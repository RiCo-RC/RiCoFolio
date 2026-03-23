"use client";

import { useState } from "react";
import {
	ChevronDown,
	ChevronUp,
	SlidersHorizontal,
	X,
	RotateCcw,
} from "lucide-react";

import { Button, Modal } from "@src/components";
import { useT, cn } from "@src/lib";

export interface FilterCategory {
	label: string;
	key: string;
	tags: string[];
}

interface AdvancedFilterProps {
	categories: FilterCategory[];
	activeTags: string[];
	onTagToggle: (tag: string) => void;
	onClear: () => void;
	/**
	 * tagCounts should be computed from the CURRENTLY FILTERED items
	 * so that counts reflect what remains available with the active selection.
	 * Tags with count 0 are automatically hidden.
	 */
	tagCounts: Record<string, number>;
}

const AdvancedFilter = ({
	categories,
	activeTags,
	onTagToggle,
	onClear,
	tagCounts,
}: AdvancedFilterProps) => {
	const t = useT();
	const [open, setOpen] = useState(false);
	const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

	const activeCount = activeTags.length;

	return (
		<div className="flex items-center gap-2">
			{/* Inline reset button — visible only when filters are active */}
			{activeCount > 0 && (
				<Button
					variant="ghost"
					size="sm"
					onClick={onClear}
					aria-label={t.global.common.clearFilters}
					className="text-text-secondary hover:text-red-400"
				>
					<RotateCcw size={13} />
					{t.global.common.clearFilters}
				</Button>
			)}

			<Button
				variant={activeCount > 0 ? "outline" : "secondary"}
				size="sm"
				onClick={() => setOpen(true)}
			>
				<SlidersHorizontal size={14} />
				{t.global.common.filter}
				{activeCount > 0 && (
					<span className="w-4 h-4 rounded-full bg-accent text-white text-[10px] flex items-center justify-center">
						{activeCount}
					</span>
				)}
			</Button>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				title={t.global.common.filter}
				size="md"
				footer={
					<>
						{activeCount > 0 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => {
									onClear();
									setOpen(false);
								}}
							>
								<RotateCcw size={13} />
								{t.global.common.clearFilters}
							</Button>
						)}
						<Button variant="primary" onClick={() => setOpen(false)}>
							{t.global.common.close}
						</Button>
					</>
				}
			>
				{activeCount > 0 && (
					<div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border">
						<span className="text-xs text-text-secondary self-center">
							Active:
						</span>
						{activeTags.map((tag) => (
							<button
								key={tag}
								onClick={() => onTagToggle(tag)}
								className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent text-white text-xs font-medium hover:opacity-80 transition-opacity"
							>
								{tag}
								<X size={10} />
							</button>
						))}
					</div>
				)}

				<div className="flex flex-col gap-3">
					{categories.map((cat) => {
						const visibleTags = cat.tags.filter(
							(tag) => activeTags.includes(tag) || (tagCounts[tag] ?? 0) > 0,
						);
						if (visibleTags.length === 0) return null;
						const isCollapsed = collapsed[cat.key];

						return (
							<div
								key={cat.key}
								className="border border-border rounded-md overflow-hidden"
							>
								<button
									className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-text-primary hover:bg-surface-elevated transition-colors"
									onClick={() =>
										setCollapsed((p) => ({ ...p, [cat.key]: !p[cat.key] }))
									}
								>
									<span className="flex items-center gap-2">
										{cat.label}
										<span className="text-xs text-text-secondary">
											({visibleTags.length})
										</span>
									</span>
									{isCollapsed ? (
										<ChevronDown size={14} />
									) : (
										<ChevronUp size={14} />
									)}
								</button>
								{!isCollapsed && (
									<div className="px-4 pb-3 pt-1 flex flex-wrap gap-2">
										{visibleTags.map((tag) => {
											const count = tagCounts[tag] ?? 0;
											const isActive = activeTags.includes(tag);
											return (
												<button
													key={tag}
													onClick={() => onTagToggle(tag)}
													className={cn(
														"flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border transition-all duration-(--motion-duration-fast)",
														isActive
															? "bg-accent text-white border-accent"
															: "bg-surface text-text-secondary border-border hover:border-accent hover:text-accent",
													)}
												>
													{tag}
													<span
														className={cn(
															"rounded-full px-1 text-[10px] min-w-[16px] text-center",
															isActive
																? "bg-white/20 text-white"
																: "bg-surface-elevated text-text-secondary",
														)}
													>
														{count}
													</span>
												</button>
											);
										})}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</Modal>
		</div>
	);
};

export default AdvancedFilter;