import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const JEditor = ({ content, setContent }) => {
    const editor = useRef(null);
    const config = {
        placeholder: 'Enter bio...'
    }

    return (
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={newContent => setContent(newContent)}
            onChange={newContent => { }}
        />
    )
}

export default JEditor