// Utility functions for parallax effects

/**
 * Calculates the parallax offset based on scroll position
 * @param scrollPosition Current window scroll position
 * @param speed Parallax speed factor (lower = more subtle)
 * @returns Calculated offset in pixels
 */
export function calculateParallaxOffset(scrollPosition: number, speed = 0.05): number {
  return scrollPosition * speed
}

/**
 * Applies a throttled scroll handler to improve performance
 * @param callback Function to call on scroll
 * @param delay Throttle delay in ms
 * @returns Throttled function
 */
export function throttledScrollHandler(callback: () => void, delay = 10): () => void {
  let lastCall = 0

  return () => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      callback()
    }
  }
}
