import React from 'react';
import { CiSearch } from 'react-icons/ci';

export default function SearchBar() {
  return (
    <form className='form'>
      <div className='inputBox'>
        <input 
          type='text' 
          placeholder='검색' 
          className='searchInput' 
          name='q' 
        />
        <i class="fa-solid fa-magnifying-glass icon"></i>
      </div>
      <button className='searchBtn'>
        <CiSearch className='searchIcon' />
      </button>
    </form>
  );
}

