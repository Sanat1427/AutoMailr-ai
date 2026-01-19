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
import { AArrowUp, AlignCenter, AlignLeft, AlignRight, CaseLower, CaseUpper, Languages, Loader2, Maximize2, Wand2 } from 'lucide-react';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

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


  // Derived state directly from context to ensure instant sync
  const element = selectedElement?.layout?.[selectedElement?.index];

  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [aiOption, setAiOption] = useState("professional");
  const [targetLanguage, setTargetLanguage] = useState("Spanish");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedText, setExpandedText] = useState("");
  const [activeField, setActiveField] = useState("");

  // Inner style handlers
  const onHandleInputChange = (fieldName, value) => {
    const updatedData = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          [fieldName]: value
        }
      }
    };
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

  const onImproveText = async (fieldName, currentText) => {
    if (!currentText) return;
    setLoadingAi(true);
    try {
      const response = await axios.post('/api/ai-text-improve', {
        text: currentText,
        option: aiOption
      });
      if (response.data?.success) {
        onHandleInputChange(fieldName, response.data.result);
      }
    } catch (error) {
      console.error("AI Improvement failed", error);
    } finally {
      setLoadingAi(false);
    }
  };

  const onTranslate = async (fieldName, currentText) => {
    if (!currentText) return;
    setLoadingAi(true); // Reusing loadingAi for simplicity
    try {
      const response = await axios.post('/api/ai-translate', {
        text: currentText,
        targetLanguage: targetLanguage
      });
      if (response.data?.success) {
        onHandleInputChange(fieldName, response.data.result);
      }
    } catch (error) {
      console.error("AI Translation failed", error);
    } finally {
      setLoadingAi(false);
    }
  };

  const openExpandedEditor = (field, text) => {
    setActiveField(field);
    setExpandedText(text);
    setIsDialogOpen(true);
  }

  const saveExpandedText = () => {
    onHandleInputChange(activeField, expandedText);
    setIsDialogOpen(false);
  }


  const onGenerateImage = async () => {
    if (!imagePrompt) return;
    setLoadingImage(true);
    try {
      const response = await axios.post('/api/ai-image-generate', { prompt: imagePrompt });
      if (response.data?.success) {
        onHandleInputChange('imageUrl', response.data.result);
      }
    } catch (error) {
      console.error("AI Image Generation failed", error);
    } finally {
      setLoadingImage(false);
    }
  };


  return (
    <div className='p-5 flex flex-col gap-5 sticky top-0 h-screen overflow-y-auto shadow-sm border-l border-gray-200 bg-white'>
      <h2 className='font-bold text-xs uppercase tracking-wider text-gray-500 mb-2'>Settings</h2>

      {/* Expanded Editor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto w-full">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>
              Edit text comfortably in this larger view.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 w-full">
            <Textarea
              value={expandedText}
              onChange={(e) => setExpandedText(e.target.value)}
              rows={20}
              className="text-lg w-full font-mono p-4"
            />
          </div>
          <div className="flex justify-end gap-3 sticky bottom-0 bg-white py-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveExpandedText}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image */}
      {(element?.type === 'Image' || element?.imageUrl != null) && (
        <ImagePreview
          label='Image Source URL'
          value={element.imageUrl}
          onHandleInputChange={(value) => onHandleInputChange('imageUrl', value)}
        />
      )}

      {/* Text Content */}
      {element?.content && (
        <div className="flex flex-col gap-2">
          <div className="relative pr-5">
            <InputField
              label="Content"
              value={element.content}
              onHandleInputChange={(value) => onHandleInputChange('content', value)}
            />
            <div className='absolute top-1 right-0 p-1 cursor-pointer hover:bg-gray-100 rounded' onClick={() => openExpandedEditor('content', element.content)}>
              <Maximize2 className="h-4 w-4 text-gray-500 hover:text-blue-500" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col xl:flex-row gap-2">
              <Select value={aiOption} onValueChange={setAiOption}>
                <SelectTrigger className="w-full xl:w-[130px]">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="short">Shorten</SelectItem>
                  <SelectItem value="long">Expand</SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={() => onImproveText('content', element.content)}
                disabled={loadingAi}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded-md text-sm transition-colors"
              >
                {loadingAi ? <Loader2 className="animate-spin h-4 w-4" /> : <Wand2 className="h-4 w-4" />}
                Improve
              </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-2">
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger className="w-full xl:w-[130px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Italian">Italian</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                  <SelectItem value="Korean">Korean</SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={() => onTranslate('content', element.content)}
                disabled={loadingAi}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded-md text-sm transition-colors"
              >
                {loadingAi ? <Loader2 className="animate-spin h-4 w-4" /> : <Languages className="h-4 w-4" />}
                Translate
              </button>
            </div>
          </div>
        </div>
      )}

      {element?.textarea && (
        <div className="flex flex-col gap-2">
          <div className="relative pr-5">
            <TextAreaField
              label="TextArea"
              value={element.textarea}
              onHandleInputChange={(value) => onHandleInputChange('textarea', value)}
            />
            <div className='absolute top-1 right-0 p-1 cursor-pointer hover:bg-gray-100 rounded' onClick={() => openExpandedEditor('textarea', element.textarea)}>
              <Maximize2 className="h-4 w-4 text-gray-500 hover:text-blue-500" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col xl:flex-row gap-2">
              <Select value={aiOption} onValueChange={setAiOption}>
                <SelectTrigger className="w-full xl:w-[130px]">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="short">Shorten</SelectItem>
                  <SelectItem value="long">Expand</SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={() => onImproveText('textarea', element.textarea)}
                disabled={loadingAi}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded-md text-sm transition-colors"
              >
                {loadingAi ? <Loader2 className="animate-spin h-4 w-4" /> : <Wand2 className="h-4 w-4" />}
                Improve
              </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-2">
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger className="w-full xl:w-[130px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Italian">Italian</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                  <SelectItem value="Korean">Korean</SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={() => onTranslate('textarea', element.textarea)}
                disabled={loadingAi}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded-md text-sm transition-colors"
              >
                {loadingAi ? <Loader2 className="animate-spin h-4 w-4" /> : <Languages className="h-4 w-4" />}
                Translate
              </button>
            </div>
          </div>
        </div>
      )}

      {element?.url && (
        <InputField
          label="Destination Link (Click)"
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
        <h2 className='font-bold text-xs uppercase tracking-wider text-gray-500 mt-6 mb-2'>Outer Style</h2>

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
