import React, { useState } from 'react';
import { changeDateFormat } from '../util/date';

export default function VideoCard({ data, videoId, channelUrl, statics }) {
  const [hover, setHover] = useState(false);
  let { channelTitle, title, thumbnails, channelId, description, publishTime, publishedAt } = data;
  const thumb = thumbnails.medium.url;
  title = title.replace('&#39;', "'")
  title = title.replace('&#39;', "'")

  publishTime = new Date(publishTime);
  publishedAt = new Date(publishedAt);
  publishTime = changeDateFormat(publishTime);
  publishedAt = changeDateFormat(publishedAt);

  if (statics) {
    let { viewCount } = statics;
  }

  // publishTime ~일전, ~주전 표시는 day.js 라이브러리 사용해서 진행할 것
  
  return (
    <div className={ statics ? `cardBox vtc` : `cardBox` }>
      <div className='thumbBox' onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        { hover ?  
          <iframe 
            id="ytplayer" 
            type="text/html" 
            width="360" 
            height="200"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
            frameBorder="0"
            style={{ objectFit : 'fill', transform: 'scale(1.02)'}}>
          </iframe> : 
          <img src={thumb} className='thumb' />
        }
      </div>
      <div className={ statics ? `cardInfoBox box vtc` : `cardInfoBox box`}>
        <h1 className={ statics ? `tit vtc` : `tit`}>{title}</h1>
        <div className='channelBox'>
          <img className='cnThumb' src={channelUrl} />
          <p className='cnTit'>{channelTitle}</p>
        </div>
        { statics ? null : <p className='des'>{description}</p> }
        <p className='time'>{ statics ? publishedAt : publishTime }</p>
      </div>
    </div>
  );
}

