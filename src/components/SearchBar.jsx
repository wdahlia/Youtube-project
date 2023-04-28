import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  
  const navigate = useNavigate();

  return (
    <form className='form' onSubmit={(e) => {
      e.preventDefault();
      let data = new FormData(e.target);
      data = data.get('searchValue');
      data && document.activeElement.blur();
      // data가 있으면 focus 해제
      navigate(`/results?search_query=${data}`, { state : data });
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
          name='searchValue'
        />
        <i className="fa-solid fa-magnifying-glass icon"></i>
      </div>
      <button className='searchBtn'>
        <CiSearch className='searchIcon' />
      </button>
    </form>
  );
}

