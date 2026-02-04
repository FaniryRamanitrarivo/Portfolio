"use client"

import { useEffect, useState } from "react"

export function useScrollSpy(
  sectionIds: string[],
  options?: IntersectionObserverInit
) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
        ...options,
      }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds, options])

  return activeId
}
