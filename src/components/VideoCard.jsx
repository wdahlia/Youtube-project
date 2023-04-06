import React, { useState } from 'react';
import { changeDateFormat } from '../util/date';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function VideoCard({ data, videoId, ...res }) {
  const [hover, setHover] = useState(false);
  let { channelTitle, title, thumbnails, channelId, description, publishTime, publishedAt } = data;
  const thumb = thumbnails.medium.url;
  title = decodeURI(title);

  publishTime = new Date(publishTime);
  publishedAt = new Date(publishedAt);
  publishTime = changeDateFormat(publishTime);
  publishedAt = changeDateFormat(publishedAt);

  const instance = axios.create({
    baseURL : 'https://youtube.googleapis.com/youtube/v3',
    params : { key : process.env.REACT_APP_YOUTUBE_SECRET_KEY }
  });

  const { data: channels } = useQuery({
    queryKey : ['channel', channelId ],
    queryFn : () => instance.get('/channels/', {
      params : {
        part : 'snippet',
        id : channelId
      } 
    }).then((res) => {
      return res.data.items[0].snippet.thumbnails.medium.url
    }),
    retry : 1,
    staleTime : 1000 * 60 * 1000,
  })


  // publishTime ~일전, ~주전 표시는 day.js 라이브러리 사용해서 진행할 것
  
  return (
    <div className={ res.main ? `cardBox vtc` : `cardBox` }>
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
      <div className={ res.main ? `cardInfoBox box vtc` : `cardInfoBox box`}>
        <h1 className={ res.main ? `tit vtc` : `tit`}>{title}</h1>
        <div className='channelBox'>
          <img className='cnThumb' src={channels} />
          <p className='cnTit'>{channelTitle}</p>
        </div>
        { res.main ? null : <p className='des'>{description}</p> }
        <p className='time'>{ res.main ? publishedAt : publishTime }</p>
      </div>
    </div>
  );
}

