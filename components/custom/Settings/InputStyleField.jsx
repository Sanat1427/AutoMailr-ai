import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';

function InputStyleField({ label, value, onHandleStyleChange, type = 'px' }) {
  // Internal state to allow smooth typing
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) {
      const num = Number(value.toString().replace(type, ''));
      setInputValue(isNaN(num) ? '' : String(num));
    } else {
      setInputValue('');
    }
  }, [value, type]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    onHandleStyleChange(val + type); // append type when notifying parent
  };

  return (
    <div>
      <label>{label}</label>
      <div className='flex'>
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <h2 className='p-2 bg-gray-100 rounded-r-lg ml-2'>{type}</h2>
      </div>
    </div>
  );
}

export default InputStyleField;
