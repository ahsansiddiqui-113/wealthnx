import React from 'react';
import MotionShowcase from '@/components/MotionShowcase';
import PageContainer from '../components/PageContainer';

export const metadata = {
  title: 'Motion System Demo - WealthNx',
  description: 'Live demonstration of premium motion and animation system',
  robots: { index: false, follow: false },
};

export default function MotionDemoPage() {
  return (
    <PageContainer className="motion-demo-page">
      <div className="pt-32 pb-20">
        <div className="section-wrapper text-center mb-20">
          <div className="motion-preserve-3d">
            <h1 className="text-5xl font-bold mb-6 animate-fadeInUp">
              Premium Motion System
            </h1>
            <p className="text-xl opacity-75 max-w-2xl mx-auto">
              Experience the power of layered, cinematic animations. Scroll down to see all the
              motion techniques in action.
            </p>
          </div>
        </div>

        {/* Main Showcase */}
        <MotionShowcase />

        {/* Implementation Guide Section */}
        <section className="section-wrapper mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Getting Started</h2>
            <p className="text-lg opacity-75">
              Use these motion components in your own pages for premium cinematic effects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Simple Reveal',
                code: `<Reveal direction="up">
  <h2>Content</h2>
</Reveal>`,
                description: 'Basic scroll-triggered reveal animation with directional variants',
              },
              {
                title: 'Layered Cards',
                code: `<LayeredCard delay={0.2}>
  <div>Card content</div>
</LayeredCard>`,
                description: 'Premium cards with glow layers and depth effects on hover',
              },
              {
                title: 'Parallax Effect',
                code: `<ParallaxElement offset={40}>
  <img src="image.jpg" />
</ParallaxElement>`,
                description: 'Scroll-based parallax with depth and dimensional feel',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="premium-card p-6 hover:border-accent/40 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-sm opacity-75 mb-4">{item.description}</p>
                <pre className="bg-surface p-3 rounded text-xs overflow-x-auto">
                  <code>{item.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="section-wrapper mt-32">
          <h2 className="text-4xl font-bold text-center mb-12">Why This Motion System?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Premium Feel',
                description: 'Elegant, cinematic animations that feel expensive and intentional',
              },
              {
                icon: '🎯',
                title: 'Performance',
                description: 'GPU-accelerated transforms, 60fps smoothness, zero jank',
              },
              {
                icon: '🎨',
                title: 'Layered Architecture',
                description: 'Multiple visual layers creating perceived depth and dimensionality',
              },
              {
                icon: '📱',
                title: 'Responsive',
                description: 'Works seamlessly across all screen sizes and devices',
              },
              {
                icon: '🔧',
                title: 'Developer Friendly',
                description: 'Simple component API with sensible defaults, easy to customize',
              },
              {
                icon: '🚀',
                title: 'Production Ready',
                description: 'Built with Framer Motion, Lenis, and GSAP best practices',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="text-4xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm opacity-75">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-wrapper mt-32 text-center">
          <div className="premium-card p-12 bg-gradient-to-r from-accent/10 to-transparent border-accent/20">
            <h2 className="text-3xl font-bold mb-4">Ready to Add Motion to Your Pages?</h2>
            <p className="text-lg opacity-75 mb-8 max-w-2xl mx-auto">
              Check out the IMPLEMENTATION_GUIDE.md and MOTION_SYSTEM.md for complete documentation
              and examples.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="btn btn-primary">
                View Documentation
              </button>
              <button className="btn btn-secondary">
                Explore Components
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
