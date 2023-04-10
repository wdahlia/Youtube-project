import React, { createContext, useContext, useState } from 'react';

const YoutubeContext = createContext();

export default function YoutubeProvider({ children }) {

  const [mode, setMode] = useState(false);
  // const [open, setOpen] = useState(false);

  const handleMode = () => {
    setMode(!mode);
    DarkModeToggle(mode);
  }

  // const handleOpen = () => {
  //   setMode(!open);
  //   OpenTabToggle(open);
  // }

  // 함수 정의 dispatch 해서 reducer에서 실행시켜줄 값들 정의

  // const handleSubmit = () => {
  //   dispatch({ action: 'SUBMIT_SEARCH'})
  // }

  return (
    <YoutubeContext.Provider
      value={{
        handleMode, 
        mode,
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