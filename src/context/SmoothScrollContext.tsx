import React, { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

interface SmoothScrollContextType {
  lenis: Lenis | null
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; immediate?: boolean; duration?: number }) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
})

export const useSmoothScroll = () => useContext(SmoothScrollContext)

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // 1. Check if user prefers reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let prefersReducedMotion = motionQuery.matches

    // 2. Initialize Lenis smooth scrolling instance
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      autoRaf: true,
      anchors: true,
      allowNestedScroll: true,
    })

    lenisRef.current = lenis

    // Listen to changes in system reduced-motion preference
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches
      if (prefersReducedMotion) {
        lenis.stop()
        document.querySelectorAll('.reveal-fade-up').forEach((el) => {
          el.classList.add('is-revealed')
        })
      } else {
        lenis.start()
      }
    }
    motionQuery.addEventListener('change', handleMotionChange)

    // 3. Scroll Reveal Intersection Observer
    let observer: IntersectionObserver | null = null

    const observeElement = (el: Element) => {
      if (prefersReducedMotion) {
        el.classList.add('is-revealed')
        return
      }
      if (el.classList.contains('is-revealed')) return
      observer?.observe(el)
    }

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed')
              // Single-trigger reveal: unobserve once revealed
              observer?.unobserve(entry.target)
            }
          })
        },
        {
          rootMargin: '0px 0px -30px 0px',
          threshold: 0.05,
        }
      )

      // Initial observation of all reveal elements
      document.querySelectorAll('.reveal-fade-up').forEach(observeElement)
    } else {
      // Fallback for environments without IntersectionObserver
      document.querySelectorAll('.reveal-fade-up').forEach((el) => {
        el.classList.add('is-revealed')
      })
    }

    // 4. MutationObserver to automatically observe new views and dynamically mounted cards
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement
            if (el.classList?.contains('reveal-fade-up')) {
              observeElement(el)
            }
            el.querySelectorAll?.('.reveal-fade-up').forEach(observeElement)
          }
        })
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // 5. Fail-safe timeout: ensure no content stays hidden if observer fails to trigger
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll('.reveal-fade-up:not(.is-revealed)').forEach((el) => {
        const rect = el.getBoundingClientRect()
        // If element is in or above viewport, reveal it immediately
        if (rect.top < window.innerHeight) {
          el.classList.add('is-revealed')
          observer?.unobserve(el)
        }
      })
    }, 1500)

    return () => {
      clearTimeout(fallbackTimer)
      motionQuery.removeEventListener('change', handleMotionChange)
      observer?.disconnect()
      mutationObserver.disconnect()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number; immediate?: boolean; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options)
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' })
      } else if (typeof target === 'string') {
        const el = document.querySelector(target)
        el?.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' })
      }
    }
  }

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
