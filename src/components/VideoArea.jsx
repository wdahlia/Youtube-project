import React from 'react';
import mockData from '../api/mockSearchData'
import VideoCard from './VideoCard';

export default function VideoArea() {
  const data = mockData;
  const { items } = data;
  return (
    <article className='videoContainer box'>
      { items.map((item => <button className='videoCardBtn'><VideoCard key={item.id.videoId} data={item.snippet} /></button>))}
    </article>
  );
}

