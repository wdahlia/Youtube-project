import React from 'react';
import mockData from '../mockSearchData'
import VideoCard from '../components/VideoCard';
import channelsData from '../mockChannelData';

export default function VideoArea() {
  const channelUrl = channelsData.items[0].snippet.thumbnails.default.url
  const data = mockData;
  const { items } = data;
  return (
    <article className='videoContainer box'>
      <ul>
        { items.map((item => <button className='videoCardBtn'><VideoCard key={item.id.videoId} data={item.snippet} videoId={item.id.videoId} channelUrl={channelUrl} /></button>))}
      </ul>
    </article>
  );
}

