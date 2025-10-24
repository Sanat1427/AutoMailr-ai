"use client"
import { useSelectedElement } from '@/app/provider'
import React, { useEffect, useState } from 'react'
import InputField from './Settings/InputField';
import ColorPickerField from './Settings/ColorPickerField';
import InputStyleField from './Settings/InputStyleField';
import SliderField from './Settings/SliderField';
import TextAreaField from './Settings/TextAreaField';
import ToggleGroupField from './Settings/ToggleGroupField';
import DropdownField from './Settings/DropdownField';
import ImagePreview from './Settings/ImagePreview';
import { AArrowUp, AlignCenter, AlignLeft, AlignRight, CaseLower, CaseUpper } from 'lucide-react';

const TextAlignOptions = [
  { value: 'left', icon: AlignLeft },
  { value: 'center', icon: AlignCenter },
  { value: 'right', icon: AlignRight }
];

const TextTransformOptions = [
  { value: 'uppercase', icon: CaseUpper },
  { value: 'lowercase', icon: CaseLower },
  { value: 'capitalize', icon: AArrowUp }
];

function Settings() {
  const { selectedElement, setSelectedElement } = useSelectedElement();
  const [element, setElement] = useState();

  useEffect(() => {
    setElement(selectedElement?.layout?.[selectedElement?.index]);
  }, [selectedElement]);

  // Inner style handlers
  const onHandleInputChange = (fieldName, value) => {
    const updatedData = { ...selectedElement };
    updatedData.layout[selectedElement.index][fieldName] = value;
    setSelectedElement(updatedData);
  };

  const onHandleStyleChange = (fieldName, fieldValue) => {
    const updatedElement = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          style: {
            ...selectedElement.layout[selectedElement.index].style,
            [fieldName]: fieldValue,
          },
        },
      },
    };
    setSelectedElement(updatedElement);
  };

  // Outer style handler
  const onHandleOuterStyleChange = (fieldName, fieldValue) => {
    const updatedElement = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          outerStyle: {
            ...selectedElement.layout[selectedElement.index]?.outerStyle,
            [fieldName]: fieldValue,
          },
        },
      },
    };
    setSelectedElement(updatedElement);
  };

  return (
    <div className='p-5 flex flex-col gap-4'>
      <h2 className='font-bold text-xl'>Settings</h2>

      {/* Image */}
      {element?.imageUrl && (
        <ImagePreview
          label='Image Preview'
          value={element.imageUrl}
          onHandleInputChange={(value) => onHandleInputChange('imageUrl', value)}
        />
      )}

      {/* Text Content */}
      {element?.content && (
        <InputField
          label="Content"
          value={element.content}
          onHandleInputChange={(value) => onHandleInputChange('content', value)}
        />
      )}

      {element?.textarea && (
        <TextAreaField
          label="TextArea"
          value={element.textarea}
          onHandleInputChange={(value) => onHandleInputChange('textarea', value)}
        />
      )}

      {element?.url && (
        <InputField
          label="URL"
          value={element.url}
          onHandleInputChange={(value) => onHandleInputChange('url', value)}
        />
      )}

      {/* Style fields */}
      {element?.style?.backgroundColor && (
        <ColorPickerField
          label="Background Color"
          value={element.style.backgroundColor}
          onHandleStyleChange={(value) => onHandleStyleChange('backgroundColor', value)}
        />
      )}

      {element?.style?.color && (
        <ColorPickerField
          label="Text Color"
          value={element.style.color}
          onHandleStyleChange={(value) => onHandleStyleChange('color', value)}
        />
      )}

      {element?.style?.fontSize && (
        <InputStyleField
          label="Font Size"
          value={element.style.fontSize}
          onHandleStyleChange={(value) => onHandleStyleChange('fontSize', value)}
        />
      )}

      {element?.style?.padding && (
        <InputStyleField
          label='Padding'
          value={element.style.padding}
          onHandleStyleChange={(value) => onHandleStyleChange('padding', value)}
        />
      )}

      {element?.style?.margin && (
        <InputStyleField
          label='Margin'
          value={element.style.margin}
          onHandleStyleChange={(value) => onHandleStyleChange('margin', value)}
        />
      )}

      {element?.style?.borderRadius && (
        <SliderField
          label='Border Radius'
          value={element.style.borderRadius}
          onHandleStyleChange={(value) => onHandleStyleChange('borderRadius', value)}
        />
      )}

      {element?.style?.width && (
        <SliderField
          label='Width'
          value={element.style.width}
          type="%"
          onHandleStyleChange={(value) => onHandleStyleChange('width', value)}
        />
      )}

      {/* Text Align */}
      {element?.style?.textAlign && (
        <ToggleGroupField
          label='Text Align'
          value={element.style.textAlign}
          options={TextAlignOptions}
          onHandStyleChange={(value) => onHandleStyleChange('textAlign', value)}
        />
      )}

      {/* Text Transform */}
      {element?.style?.textTransform && (
        <ToggleGroupField
          label='Text Transform'
          value={element.style.textTransform}
          options={TextTransformOptions}
          onHandStyleChange={(value) => onHandleStyleChange('textTransform', value)}
        />
      )}

      {/* Font Weight */}
      {element?.style?.fontWeight && (
        <DropdownField
          label='Font Weight'
          value={element.style.fontWeight}
          options={['normal', 'bold']}
          onHandleStyleChange={(value) => onHandleStyleChange('fontWeight', value)}
        />
      )}

      {/* Outer Style */}
      <div>
        <h2 className='font-bold mt-2'>Outer Style</h2>

        {element?.outerStyle?.backgroundColor && (
          <ColorPickerField
            label='Background Color'
            value={element.outerStyle.backgroundColor}
            onHandleStyleChange={(value) =>
              onHandleOuterStyleChange('backgroundColor', value)
            }
          />
        )}

        {element?.outerStyle?.justifyContent && (
          <ToggleGroupField
            label='Outer Align'
            value={element.outerStyle.justifyContent}
            options={TextAlignOptions}
            onHandStyleChange={(value) =>
              onHandleOuterStyleChange('justifyContent', value)
            }
          />
        )}
      </div>
    </div>
  );
}

export default Settings;
