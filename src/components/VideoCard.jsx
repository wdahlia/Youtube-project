import React from 'react';
import channelsData from '../api/mockChannelData';

export default function VideoCard({ data }) {
  const channels = channelsData;
  const { items } = channels;
  const { snippet } = items[0];
  const channelurl = snippet.thumbnails.default.url
  let { channelTitle, title, thumbnails, channelId, description, publishTime } = data;
  const thumb = thumbnails.medium.url;
  title = title.replace('&#39;', "'")
  title = title.replace('&#39;', "'")

  // publishTime ~일전, ~주전 표시는 day.js 라이브러리 사용해서 진행할 것
  
  return (
    <div className='cardBox'>
      <div className='thumbBox'>
        <img src={thumb} className='thumb' />
      </div>
      <div className='cardInfoBox box'>
        <h1 className='tit'>{title}</h1>
        <div className='channelBox'>
          <img className='cnThumb' src={channelurl} />
          <p className='cnTit'>{channelTitle}</p>
        </div>
        <p className='des'>{description}</p>
        <p className='time'>{publishTime}</p>
      </div>
    </div>
  );
}

