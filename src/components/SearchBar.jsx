import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  return (
    <form className='form' onSubmit={(e) => {
      e.preventDefault()
      const inputValue = document.getElementById('searchInput');
      const { name, value } = inputValue;
      navigate(`/results?${name}=${value}`, { state : value });
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
          name='search_query'
        />
        <i className="fa-solid fa-magnifying-glass icon"></i>
      </div>
      <button className='searchBtn'>
        <CiSearch className='searchIcon' />
      </button>
    </form>
  );
}

