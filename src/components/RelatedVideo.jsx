import React from 'react';

export default function RelatedVideo({ videoId, data }) {
  const { publishedAt, title, thumbnails, channelTitle } = data;
  return (
    <li className='detailVideo box'>
      <img src={thumbnails.medium.url} className='thumb' />
      <div className='relVideoInfo box'>
        <h4 className='tit'>{title}</h4>
        <p className='cnTit'>{channelTitle}</p>
        <p className='time'>{publishedAt}</p>
      </div>
    </li>
  );
}

