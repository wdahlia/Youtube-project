import React from 'react';
import VideoCard from '../components/VideoCard';
import mockMostPopularData from '../mockMostPopularData';

export default function Main() {
  const { items } = mockMostPopularData;

  return (
    <section className='mainBox box'>
      { items.map((item) => <VideoCard key={item.id} data={item.snippet} statics={item.statistics} videoId={item.id} />)}
    </section>
  );
}

