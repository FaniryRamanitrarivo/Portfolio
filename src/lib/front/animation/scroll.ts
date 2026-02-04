"use client";


import type { MouseEvent } from "react"

export const scrollToSection = (
  e: MouseEvent<HTMLAnchorElement>,
  offset = 80
) => {
  e.preventDefault()

  const href = e.currentTarget.getAttribute("href")
  if (!href?.startsWith("#")) return

  const id = href.slice(1)
  const node = document.getElementById(id)
  if (!node) return

  const y =
    node.getBoundingClientRect().top +
    window.scrollY -
    offset

  window.scrollTo({ top: y, behavior: "smooth" })
}
