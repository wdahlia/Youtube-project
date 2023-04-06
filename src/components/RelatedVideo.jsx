import React from 'react';
import { changeDateFormat } from '../util/date';
import { useNavigate } from 'react-router-dom';


export default function RelatedVideo({ videoId, data }) {
  const navigate = useNavigate();
  let { publishedAt, title, thumbnails, channelTitle } = data;
  publishedAt = new Date(publishedAt);
  publishedAt = changeDateFormat(publishedAt);

  const moveToDetail = () => {
    navigate(`/watch?v=${videoId}`);
  }
  return (
    <li 
      className='detailVideo box'
      onClick={moveToDetail}
      >
      <img src={thumbnails.medium.url} className='thumb' alt='relatedVideo' />
      <div className='relVideoInfo box'>
        <h4 className='tit'>{title}</h4>
        <p className='cnTit'>{channelTitle}</p>
        <p className='time'>{publishedAt}</p>
      </div>
    </li>
  );
}

