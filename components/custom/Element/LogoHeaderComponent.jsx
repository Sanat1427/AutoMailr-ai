import React from 'react';

const LogoHeaderComponent = ({ imageUrl, alt = 'logo', url = '#', style = {}, outerStyle = {} }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', width: '100%', ...outerStyle }}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img 
          src={imageUrl} 
          alt={alt} 
          style={{ display: 'block', ...style }} 
        />
      </a>
    </div>
  );
};

export default LogoHeaderComponent;
