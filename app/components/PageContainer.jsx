'use client';

import React, { useEffect, useState } from 'react';

const PageContainer = ({ children, className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    onScroll(); // set correct state on initial render
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    let hasScrolled = false;

    const handleScroll = () => {
      if (window.scrollY > 100) {
        hasScrolled = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const setupObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add is-visible class with a small delay for smoother animation
              setTimeout(() => {
                entry.target.classList.add('is-visible');
              }, 50);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -100px 0px' }
      );

      // Observe all animatable elements
      document.querySelectorAll(
        '.testimonial-card, [data-animate], .ask-carousel-slide, ' +
        '.premium-card, .feature-point-card, .security-main-image, ' +
        '.wealth-genie-insight-card, .wealth-genie-agent-copy'
      ).forEach((el) => {
        observer.observe(el);
      });

      return observer;
    };

    // Small delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      setupObserver();
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const classes = [
    'page-container',
    isScrolled ? 'is-scrolled' : 'is-top',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default PageContainer;
