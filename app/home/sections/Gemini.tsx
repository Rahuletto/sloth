import Card from '@/components/ui/Card'
import { CanvasRevealEffect } from '@/components/ui/Reveal'
import React from 'react'

export default function Gemini() {
  return (
    <section id="gemini" className="lg:mt-32 mt-24 transition-all animate-fade duration-300">
    <Card title="Powered by Gemini">
      <CanvasRevealEffect
        animationSpeed={12}
        containerClassName="bg-transparent"
        colors={[
          [157, 126, 203],
          [26, 161, 227],
        ]}
        dotSize={4}
      />
      <div className="absolute inset-0 [mask-image:radial-gradient(500px_at_center,white,transparent)] bg-black/30 dark:bg-black/40" />
    </Card>
  </section>
  )
}
