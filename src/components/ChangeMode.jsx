import React, { useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function ChangeMode() {

  const [mode, setMode] = useState(false);

  return (
    <button onClick={() => setMode(!mode)}>
      { mode ? 
        <MdLightMode className='mode' /> : 
        <MdDarkMode className='mode dark'/>
      }
    </button>
  )
}

