import React from 'react';
import { changeDateFormat } from '../util/date';


export default function RelatedVideo({ videoId, data }) {
  let { publishedAt, title, thumbnails, channelTitle } = data;
  publishedAt = new Date(publishedAt);
  publishedAt = changeDateFormat(publishedAt);
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

