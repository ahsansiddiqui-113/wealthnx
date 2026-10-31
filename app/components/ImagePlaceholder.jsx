import React from 'react';

const ImagePlaceholder = ({ label = 'Asset Missing', ratio = '16 / 10', className = '' }) => {
  const classes = ['image-placeholder', className].filter(Boolean).join(' ');
  return (
    <div className={classes} style={{ aspectRatio: ratio }}>
      <span>{label}</span>
    </div>
  );
};

export default ImagePlaceholder;
