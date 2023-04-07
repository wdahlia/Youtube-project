import React, { useState } from 'react';
import { changeDateFormat } from '../util/date';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VideoCard({ data, videoId, ...res }) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  let { channelTitle, title, thumbnails, channelId, description, publishTime, publishedAt } = data;
  const thumb = thumbnails.medium.url;
  title = title.replace(/&#39;/g, "'");


  publishTime = new Date(publishTime);
  publishedAt = new Date(publishedAt);
  publishTime = changeDateFormat(publishTime);
  publishedAt = changeDateFormat(publishedAt);

  // channel url, 구독자 수 가져오기
  const instance = axios.create({
    baseURL : 'https://youtube.googleapis.com/youtube/v3',
    params : { key : process.env.REACT_APP_YOUTUBE_SECRET_KEY }
  });

  const { isLoading, data : channels } = useQuery({
    queryKey : ['channel', channelId ],
    queryFn : () => instance.get('/channels/', {
      params : {
        part : 'snippet,statistics',
        id : channelId
      } 
    }).then((res) => {
      return res.data.items[0];
    }),
    retry : 2,
    staleTime : 1000 * 60 * 100,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(channels);

  const { snippet : { thumbnails : { medium : { url }}}, statistics : { subscriberCount } } = channels;


  const moveToDetail = () => {
    navigate(`/watch?v=${videoId}`, { state : { data, videoId, url } });
  }


  // publishTime ~일전, ~주전 표시는 day.js 라이브러리 사용해서 진행할 것
  

  // onClick 했을때, /watch/?v=videoId
  return (
    <li 
      className={ res.main ? `cardBox vtc` : `cardBox` }
      onClick={moveToDetail}
      >
      <div className='thumbBox' onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        { hover ?  
          <iframe 
            title={videoId}
            id="ytplayer" 
            type="text/html" 
            width="360" 
            height="200"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
            frameBorder="0"
            style={{ objectFit : 'fill', transform: 'scale(1.02)'}}>
          </iframe> : 
          <img src={thumb} className='thumb' alt='videoThumbnail' />
        }
      </div>
      <div className={ res.main ? `cardInfoBox box vtc` : `cardInfoBox box`}>
        <h1 className={ res.main ? `tit vtc` : `tit`}>{title}</h1>
        <div className='channelBox'>
          { url && <img className='cnThumb' src={url} alt='channelThumbnail'/> }
          <p className='cnTit'>{channelTitle}</p>
          <p>{subscriberCount}</p>
        </div>
        { res.main ? null : <p className='des'>{description}</p> }
        <p className='time'>{ res.main ? publishedAt : publishTime }</p>
      </div>
    </li>
  );
}

