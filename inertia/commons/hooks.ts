import { useEffect } from 'react'

/**
 * Custom hook to debounce useEffect
 * @param fn The effect callback to debounce
 * @param dependencies Dependencies that trigger the effect
 * @param delay The debounce delay in milliseconds
 */
export function useDebouncedEffect(fn: () => void, dependencies: any[], delay: number) {
  useEffect(() => {
    const handler = setTimeout(fn, delay)
    return () => clearTimeout(handler)
  }, [...dependencies, delay])
}
