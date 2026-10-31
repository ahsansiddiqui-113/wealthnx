import React from 'react';
import { LayeredCard } from '@/components/MotionComponents';

const PremiumCard = ({ className = '', children, delay = 0, enableGlow = false, animated = true }) => {
  const classes = ['premium-card', className].filter(Boolean).join(' ');

  // If animation is disabled, return simple card
  if (!animated) {
    return <div className={classes}>{children}</div>;
  }

  // Return animated layered card
  return (
    <LayeredCard delay={delay} enableGlow={enableGlow} className={classes}>
      {children}
    </LayeredCard>
  );
};

export default PremiumCard;
