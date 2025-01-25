export const measurePerformance = (metric: string) => {
  if (typeof window !== 'undefined' && window.performance) {
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    const metrics = {
      // Time to First Byte
      TTFB: navigationTiming.responseStart - navigationTiming.requestStart,
      // First Contentful Paint
      FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
      // Largest Contentful Paint
      LCP: performance.getEntriesByName('largest-contentful-paint')[0]?.startTime,
      // First Input Delay
      FID: performance.getEntriesByName('first-input-delay')[0]?.duration,
    }

    console.log(`Performance Metric - ${metric}:`, metrics[metric as keyof typeof metrics])
    return metrics[metric as keyof typeof metrics]
  }
  return null
} 