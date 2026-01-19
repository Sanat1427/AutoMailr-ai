"use client"
import Layout from '@/Data/Layout'
import React from 'react'
import ElementLayoutCard from './ElementLayoutCard'
import ElementList from '@/Data/ElementList'

import { useDragElementLayout } from '@/app/provider'

function ElementsSideBar() {
    const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
    const onDragLayoutStart = (layout) => {
        setDragElementLayout({
            ...layout,
            id: Date.now()
        });
    }
    const onDragElementStart = (element) => {
        setDragElementLayout({
            dragElement: {
                ...element,
                id: Date.now()
            }
        });
    }
    return (
        <div className='p-5 h-screen shadow-sm border-r border-gray-200 bg-white sticky top-0 overflow-y-auto'>
            <h2 className='font-bold text-xs uppercase tracking-wider text-gray-500 mb-4'>Layouts</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {Layout.map((layout, index) => (
                    <div key={index} draggable onDragStart={() => onDragLayoutStart(layout)}>
                        <ElementLayoutCard layout={layout} />
                    </div>
                ))}
            </div>
            <h2 className='font-bold text-xs uppercase tracking-wider text-gray-500 mt-8 mb-4'>Elements</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {ElementList.map((element, index) => (
                    <div key={index} draggable onDragStart={() => onDragElementStart(element)}>
                        <ElementLayoutCard layout={element} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ElementsSideBar
