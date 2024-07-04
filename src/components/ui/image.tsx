"use client"
import {forwardRef} from "react"
import {default as NextImage, ImageProps} from "next/image"
import {motion, MotionProps} from "framer-motion"
import {cn} from "@/lib/utils"

const ExoticImage = motion(forwardRef<HTMLImageElement, ImageProps>(
  function ExoticImageWrapper({className, ...props}, ref) {
    return <NextImage fill sizes="(max-width: 768px) 100vw, 50vw" className={cn("object-cover", className)} {...props} ref={ref}/>
  }
))

export const Image = (props: ImageProps & MotionProps) => {
  return <ExoticImage initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} {...props} />
}
