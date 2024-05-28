"use client"

import React, {ComponentProps, CSSProperties} from "react"
import {useReactions} from "@/lib/use-reactions"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

export const reactionsNames = [
  "likes",
  "loves",
  "awards"
] as const

export type ReactionName = (typeof reactionsNames)[number];
export type CounterName = ReactionName | "views";
export type Counters = { [Key in CounterName]?: number };

interface ReactionsButtonsProps {
  slug: string;
  initialCounters?: Counters;
}

export const ReactionsButtons = (props: ReactionsButtonsProps) => {
  const {counters, reacted, submitting, onButtonClick} = useReactions(props.slug, props.initialCounters)

  return (
    <div className={"flex flex-wrap flex-row items-center gap-2.5 tablet-md:gap-3"}>
      {reactionsNames.map((reaction) => (
        <ReactionButton key={reaction} reaction={reaction} count={counters[reaction] || 0}
          loading={submitting === reaction} reacted={reacted[reaction] === true}
          onClick={async (event) => {onButtonClick(event, reaction)}}
        />
      ))}
    </div>
  )
}

interface ReactionButtonProps
  extends Omit<ComponentProps<"button">, "loading"> {
  reaction: ReactionName;
  count: number;
  loading?: boolean;
  reacted?: boolean;
}

export const ReactionButton = (props: ReactionButtonProps) => {
  const {reaction, count, loading, reacted, ...otherProps} = props
  return (
    <Button variant="ghost"{...otherProps} title={reactionsSetup[reaction].title}
      aria-pressed={reacted} disabled={loading === true || reacted === true}
      className={cn("rounded-full inline-flex gap-2 px-4 py-2 text-2x group/reaction ring-1 ring-inset",
        "hover:bg-[rgb(var(--tint)/.2)] dark:hover:bg-[rgb(var(--tint)/.2)] hover:ring-[rgb(var(--tint)/.2)]",
        reacted ? "bg-tint-bg ring-tint-border" : "")}
      style={{"--tint": reactionsSetup[reaction].tint} as CSSProperties}
    >
      <Icon className={cn("size-4 mobile-md:size-5 transition-colors group-hover/reaction:text-[rgb(var(--tint))]",
        reacted ? "text-[rgb(var(--tint))]" : "text-current")}
        path={reacted ? reactionsSetup[reaction].icon.filled : reactionsSetup[reaction].icon.outlined}
      />
      {loading ? (
        <Icon className={"size-4 animate-spin"} path={loadingIcon}/>
      ) : (
        <span className={"font-manrope font-bold"}>{count}</span>
      )}
    </Button>
  )
}

type IconProps = ComponentProps<"svg"> & {path: string};

export const Icon = ({path, className, ...props}: IconProps) => {
  return (
    <svg
      viewBox={"0 0 24 24"}
      role={"presentation"}
      className={cn("size-6 fill-inherit", className)}
      aria-hidden={"true"}
      {...props}
    >
      <path className={"fill-current"} d={path}/>
    </svg>
  )
}

export const confettiOptions = {
  particleCount: 50,
  spread: 60,
  colors: ["#6085de"],
  disableForReducedMotion: true,
  scalar: 0.5,
  gravity: 0.85,
  decay: 0.75,
  ticks: 100
}
export const loadingIcon = "M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z"

export const reactionsSetup = {
  likes: {
    title: "Like",
    icon: {
      outlined:
        "M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z",
      filled:
        "M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
    },
    color: "#10b981", // emerald 500
    tint: "16 185 129" // rgb values for color ↑
  },
  loves: {
    title: "Love",
    icon: {
      outlined:
        "M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z",
      filled:
        "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
    },
    color: "#f43f5e", // rose 500
    tint: "244 63 94" // rgb values for color ↑
  },
  awards: {
    title: "Award",
    icon: {
      outlined:
        "M17 4V2H7V4H2V11C2 12.1 2.9 13 4 13H7.1C7.5 14.96 9.04 16.5 11 16.9V19.08C8 19.54 8 22 8 22H16C16 22 16 19.54 13 19.08V16.9C14.96 16.5 16.5 14.96 16.9 13H20C21.1 13 22 12.1 22 11V4H17M4 11V6H7V11L4 11M15 12C15 13.65 13.65 15 12 15S9 13.65 9 12V4H15V12M20 11L17 11V6H20L20 11Z",
      filled:
        "M17 4V2H7V4H2V11C2 12.1 2.9 13 4 13H7.1C7.5 14.96 9.04 16.5 11 16.9V19.08C8 19.54 8 22 8 22H16C16 22 16 19.54 13 19.08V16.9C14.96 16.5 16.5 14.96 16.9 13H20C21.1 13 22 12.1 22 11V4H17M4 11V6H7V11L4 11M20 11L17 11V6H20L20 11Z"
    },
    color: "#f59e0b", // amber 500
    tint: "245 158 11" // rgb values for color ↑
  }
}