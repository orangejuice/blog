"use client"
import {forwardRef, useState} from "react"
import {default as NextImage, ImageProps} from "next/image"
import {motion, MotionProps} from "framer-motion"
import {cn} from "@/lib/utils"

const ExoticImage = motion(forwardRef<HTMLImageElement, ImageProps>(
  function ExoticImageWrapper({className, ...props}, ref) {
    return <NextImage fill sizes="(max-width: 768px) 100vw, 50vw" className={cn("object-cover", className)} {...props} ref={ref}/>
  }
))

export const Image = (props: ImageProps & MotionProps) => {
  const [loading, setIsLoading] = useState(true)
  return (<>
    {loading && <div className="absolute inset-0 bg-stone-200 animate-pulse"/>}
    <ExoticImage initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}}
      onAnimationComplete={() => setIsLoading(false)} {...props} />
  </>)
}
