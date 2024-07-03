"use client"
import React, {ComponentProps, RefObject, use, useEffect, useRef, useState} from "react"
import {cn, format, getRandomLightHexColor, invertColor, randomInRange} from "@/lib/utils"
import type {Comment, fetchGuestbookCommentsResponse} from "@/lib/fetch-github"
import {useTranslation} from "react-i18next"
import {useLocalStorage} from "@/lib/use-local-storage"
import {useMounted} from "@/lib/use-mounted"
import {motion, useMotionValue} from "framer-motion"
import {useTheme} from "next-themes"

function Note({note, constraintRef, handleDragStart, handleDragEnd, delay}: {note: Comment, constraintRef: RefObject<HTMLDivElement>, handleDragStart: () => void, handleDragEnd: () => void, delay: number}) {
  const ref = useRef<HTMLDivElement>(null)
  const {i18n: {language: locale}} = useTranslation()
  const x = useMotionValue<number | undefined>(undefined)
  const y = useMotionValue<number | undefined>(undefined)
  const zIndex = useMotionValue<number | undefined>(undefined)
  const backgroundColor = useMotionValue<string | undefined>(undefined)
  const rotate = useMotionValue<string | undefined>(undefined)
  const [isDragging, setIsDragging] = useState(false)
  const {resolvedTheme} = useTheme()
  const [localNotes, setLocalNotes] = useLocalStorage<StickyNotes>("sticky-notes", {})
  const mounted = useMounted()

  const onDragStart = () => {
    setIsDragging(true)
    handleDragStart()
    // @ts-ignore
    setLocalNotes(localNotes => {
      const order = localNotes.order
      order?.splice(order?.indexOf(note.id), 1)
      order?.push(note.id)
      return {...localNotes, order}
    })
  }
  const onDragEnd = () => {
    setIsDragging(false)
    handleDragEnd()
  }
  const onDragTransitionEnd = () => {
    setLocalNotes(localNotes => ({
      ...localNotes,
      [note.id]: {...localNotes[note.id], position: {x: x.get(), y: y.get()}}
    }))
  }

  useEffect(() => {
    if (!mounted) return
    localNotes.order && zIndex.set(localNotes.order.indexOf(note.id))
    if (localNotes.hasOwnProperty(note.id)) {
      x.set(localNotes[note.id].position.x)
      y.set(localNotes[note.id].position.y)
      backgroundColor.set(localNotes[note.id].color)
      rotate.set(localNotes[note.id].rotate)
    } else {
      x.set(randomInRange(0, constraintRef.current!.clientWidth - ref.current!.clientWidth))
      y.set(randomInRange(0, constraintRef.current!.clientHeight - ref.current!.clientHeight))
      backgroundColor.set(getRandomLightHexColor())
      rotate.set(`${randomInRange(-15, 15)}deg`)
      setLocalNotes(localNotes => ({
        ...localNotes,
        [note.id]: {
          ...localNotes[note.id], position: {x: x.get(), y: y.get()}, color: backgroundColor.get(),
          rotate: rotate.get()
        }
      }))
    }
  }, [mounted, localNotes])

  return (<>
    <motion.div style={{x, y, rotate, zIndex, backgroundColor: resolvedTheme == "dark" ? invertColor(backgroundColor.get()) : backgroundColor}}
      ref={ref} whileDrag={{scale: 1.05, rotateZ: -10}} transition={{opacity: {delay, type: "just"}, translateY: {delay, type: "just"}}}
      initial={{opacity: 0, translateY: 18}} animate={{opacity: 1, translateY: 0}} exit={{opacity: 0}}
      className={cn("absolute cursor-move flex w-52 h-52 flex-col shadow-md transition-[box-shadow,color,background-color]", isDragging && "shadow-xl")}
      onDragStart={onDragStart} onDragEnd={onDragEnd} drag dragConstraints={constraintRef} onDragTransitionEnd={onDragTransitionEnd} dragMomentum={false}>
      <div className="grow flex overflow-hidden px-4 py-3">
        <p className="scrollbar-0 h-fit max-h-full overflow-auto text-ellipsis select-text cursor-text" onPointerDownCapture={e => e.stopPropagation()}>
          {note.bodyText}
        </p>
      </div>
      <div className="bottom-1 flex w-full gap-2 justify-between px-4 pb-2 text-xs text-stone-500">
        <div className="line-clamp-1">@{note.author.login}</div>
        <div className="line-clamp-1">{format(note.createdAt, {locale, relative: true})}</div>
      </div>
    </motion.div>
  </>)
}

export function Notes({data, className, ...props}: {data: fetchGuestbookCommentsResponse} & ComponentProps<"div">) {
  const notes = use(data)
  const ref = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [localNotes, setLocalNotes] = useLocalStorage<StickyNotes>("sticky-notes", {})

  useEffect(() => {
    if (!localNotes.order) {
      // @ts-ignore
      setLocalNotes(() => ({
        ...localNotes,
        order: notes.map(note => note.id)
      }))
    }
  }, [localNotes, notes, setLocalNotes])

  return (<>
    <div className={cn("w-full relative aspect-square md:aspect-[3/1] border-dashed border-4 rounded",
      "transition-colors duration-500", className, !isDragging && "border-transparent")} ref={ref} {...props}>
      {notes.map((note, i) => <Note key={i} note={note} constraintRef={ref} delay={0.5 + 0.1 * i}
        handleDragStart={() => setIsDragging(true)} handleDragEnd={() => setIsDragging(false)}/>
      )}
    </div>
    {isDragging && <div className="absolute inset-0 cursor-move"/>}
  </>)
}
