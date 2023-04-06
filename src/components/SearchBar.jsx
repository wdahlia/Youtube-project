import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { useYoutubeContext } from '../context/YoutubeProvider';

export default function SearchBar() {
  const { handleSubmit } = useYoutubeContext();
  return (
    <form className='form' onSubmit={(e) => {
      e.preventDefault();
      const searchInput = document.getElementById('searchInput');
      let searchText = new FormData();
      searchText.append(searchInput.name, searchInput.value);
      // handleSubmit(searchText);
      // handleSubmit이라는 함수 실행시키고 그 값은 dispatch해서 실행시키는데 이때 navigate(?q=search 컴포넌트 보여주는식으로 가야함)
    }}>
      <div className='inputBox'>
        <input 
          id='searchInput'
          type='text' 
          placeholder='검색' 
          className='searchInput' 
          spellCheck='false'
          name='q' 
        />
        <i className="fa-solid fa-magnifying-glass icon"></i>
      </div>
      <button className='searchBtn'>
        <CiSearch className='searchIcon' />
      </button>
    </form>
  );
}

