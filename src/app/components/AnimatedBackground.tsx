"use client"

import React from "react"

/*
 * Renders multiple blurred, colourful blobs that animate slowly across the
 * viewport.  It is positioned absolutely and should be placed as the very
 * first element inside the body/layout so that it sits behind everything
 * else (z-index -10).
 */
const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src="/Video_Generated_From_Lights.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xl" />
    </div>
  )
}

export default AnimatedBackground
