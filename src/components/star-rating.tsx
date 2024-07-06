"use client"
import React, {ComponentPropsWithoutRef} from "react"
import {useTranslation} from "react-i18next"

export const StarRating = ({rating = 0, max = 10, description = false, children}: {rating?: number , max?: number, description?: boolean} & ComponentPropsWithoutRef<"div">) => {
  const {t} = useTranslation()
  const ratingVal = rating * 10 / max
  const fullStars = Math.floor(ratingVal / 2)
  const hasHalfStar = ratingVal % 2 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  const percentage = (ratingVal % 2) * 50

  return (
    <div className="flex items-center select-none">
      {description && <span className="mr-2 font-medium">{t(`bookshelf.rating.${rating}`)}</span>}
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-500 dark:text-yellow-600">★</span>
      ))}
      {hasHalfStar && (
        <span className="relative">
          <span className="text-stone-300 dark:text-stone-600">★</span>
          <span className="absolute top-0 left-0 text-yellow-500 dark:text-yellow-600 overflow-hidden" style={{width: `${percentage}%`}}>
            ★
          </span>
        </span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-stone-300 dark:text-stone-600">★</span>
      ))}
      {children}
    </div>
  )
}
