import React from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useYoutubeContext } from '../context/YoutubeProvider';

export default function ChangeMode() {
  const { handleMode, mode } = useYoutubeContext();

  return (
    <button onClick={handleMode}>
      { mode ? 
        <MdLightMode className='mode' /> : 
        <MdDarkMode className='mode'/>
      }
    </button>
  )
}

