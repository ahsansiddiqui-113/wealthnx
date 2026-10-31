import React from 'react';

const SectionWrapper = ({ id, className = '', children }) => {
  const classes = ['section-wrapper', className].filter(Boolean).join(' ');
  return (
    <section id={id} className={classes}>
      {children}
    </section>
  );
};

export default SectionWrapper;
