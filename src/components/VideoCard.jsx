import React, { useState } from 'react';
import { changeDateFormat } from '../util/date';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { countLike, countSubscriber, countView } from '../util/counter';

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

  // useQuery 비동기로 실행되기에 한 컴포넌트에 여러개의 useQuery 사용 시 병렬적으로 처리
  // 즉, 변수에 대한 로딩, 성공, 실패처리를 모두 진행
  // useQueries 사용해서도 코드 구현 가능
  // Parallel Queries

  const { isLoading : firstLoad , data: video } = useQuery({
    queryKey : ['video', videoId ],
    queryFn : () => instance.get('/videos/', {
      params : {
        part : 'statistics',
        id : videoId,
      } 
    }), 
    select : (res) => {
      return res.data.items[0];
    },
    retry : 1,
    staleTime : 1000 * 60 * 1000,
  });

  const { onSuccess, isLoading , data : channels } = useQuery({
    queryKey : ['channel', channelId ],
    queryFn : () => instance.get('/channels/', {
      params : {
        part : 'snippet,statistics',
        id : channelId
      } 
    }),
    select : (res) => { 
      return res.data.items[0];
    },
    retry : 2,
    staleTime : 1000 * 60 * 1000,
  })


  if (isLoading) {
    return ( 
      <li className={ res.main ? `cardBox vtc` : `cardBox` } style={{ rowGap : '1rem'}}>
        <div className='ph ph-img'></div>
        <div className='box' style={{ flexDirection : 'column', rowGap : '1rem'}}>
          <div className='ph ph-lg'></div>
          <div className='ph ph-md'></div>
          <div className='ph ph-sm'></div>
        </div>
      </li>
    )
  }

  if (onSuccess) {
    console.log('요청 완료')
  }

  let { snippet : { thumbnails : { medium : { url }}}, statistics : { subscriberCount: count } } = channels;
  let { statistics : { viewCount: view, likeCount : like } } = video;

  count = countSubscriber(count);
  view = countView(view);
  like = countLike(like);


  const moveToDetail = () => {
    navigate(`/watch?v=${videoId}`, { state : { data, videoId, url, count, like } });
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
          { res.main ? null : <p>{count}</p> }
        </div>
        { res.main ? null : <p className='des'>{description}</p> }
        <span className='time'>{view} ⦁ { res.main ? publishedAt : publishTime }</span>
      </div>
    </li>
  );
}

