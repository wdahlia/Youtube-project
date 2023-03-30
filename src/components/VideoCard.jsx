import React, { useState } from 'react';

export default function VideoCard({ data, videoId, channelurl }) {
  const [hover, setHover] = useState(false);
  let { channelTitle, title, thumbnails, channelId, description, publishTime } = data;
  const thumb = thumbnails.medium.url;
  title = title.replace('&#39;', "'")
  title = title.replace('&#39;', "'")


  // publishTime ~일전, ~주전 표시는 day.js 라이브러리 사용해서 진행할 것
  
  return (
    <div className='cardBox'>
      <div className='thumbBox' onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        { hover ?  
          <iframe 
            id="ytplayer" 
            type="text/html" 
            width="360" 
            height="200"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
            frameborder="0"
            style={{ objectFit : 'fill', transform: 'scale(1.02)'}}>
          </iframe> : 
          <img src={thumb} className='thumb' />
        }
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

