"use client"
import Link, {LinkProps} from "next/link"
import {useTranslation} from "react-i18next"
import {ComponentPropsWithoutRef} from "react"

const LocalizedLink = ({href, ...props}: LinkProps & ComponentPropsWithoutRef<"a">) => {
  const {i18n: {language: locale}} = useTranslation()
  const localizedHref = `/${locale}${href}`
  return <Link href={localizedHref} {...props}></Link>
}

export default LocalizedLink
