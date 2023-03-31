import React from 'react';
import mockData from '../mockSearchData'
import VideoCard from '../components/VideoCard';

export default function VideoArea() {
  const data = mockData;
  const { items } = data;
  return (
    <article className='videoContainer box'>
      { items.map((item => <button className='videoCardBtn'><VideoCard key={item.id.videoId} data={item.snippet} videoId={item.id.videoId} /></button>))}
    </article>
  );
}

