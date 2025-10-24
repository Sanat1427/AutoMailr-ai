import React from 'react';

const SocialIconComponent = ({ socialIcons = [], style = {}, outerStyle = {} }) => {
  return (
    <div style={{ display: 'flex', gap: 15, ...outerStyle }}>
      {socialIcons.map((iconItem, index) => (
        <a 
          key={index} 
          href={iconItem.url || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'inline-block' }}
        >
          <img 
            src={iconItem.icon} 
            alt={`social-icon-${index}`} 
            style={{ width: style.width || 40, height: style.height || 40, objectFit: 'contain' }} 
          />
        </a>
      ))}
    </div>
  );
};

export default SocialIconComponent;
