import React, { createContext, useContext, useState } from 'react';

const YoutubeContext = createContext();

export default function YoutubeProvider({ children }) {

  const [mode, setMode] = useState(false);

  const handleMode = () => {
    setMode(!mode);
    DarkModeToggle(mode);
  }

  return (
    <YoutubeContext.Provider
      value={{
        handleMode, 
        mode
       }}>
        { children }
    </YoutubeContext.Provider>
  );
  
}

function DarkModeToggle(mode) {
  if (mode) {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
}

export const useYoutubeContext = () => {
  return useContext(YoutubeContext);
}