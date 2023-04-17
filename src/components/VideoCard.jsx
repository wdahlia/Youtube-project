import React, { useEffect, useState } from 'react';
import { changeDateFormat } from '../util/date';
import { useQuery, useQueries } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { countLike, countSubscriber, countView } from '../util/counter';

export default function VideoCard({ data, videoId, ...res }) {
  // data 담을 공간
  // const [data1, setData1] = useState(null);
  // const [data2, setData2] = useState(null);

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
  // onSuccess : (res) => res = res.data.items.map((item) => ({ ...item, view : countView(item.statistics.viewCount), like : countLike(item.statistics.likeCount) }))[0],
  // onSuccess : (res) => res = res.data.items.map((item) => ({ ...item, url : item.snippet.thumbnails.medium.url, count : countSubscriber(item.statistics.subscriberCount) }))[0],

  const queries = useQueries({
    queries : [
      {
        queryKey : ['video', videoId ],
        queryFn : () => instance.get('/videos/', {
          params : {
            part : 'statistics',
            id : videoId,
          } 
        }),
        // select : (res) => {
        //   const video = res.data.items.map((item) => ({ ...item, view : countView(item.statistics.viewCount), like : countLike(item.statistics.likeCount) }))[0]
        //   return video
        // },
        retry : 2,
        staleTime : 1000 * 60 * 1000,
      },
      {
        queryKey : ['channel', channelId ],
        queryFn : () => instance.get('/channels/', {
          params : {
            part : 'snippet,statistics',
            id : channelId
          } 
        }),
        // onSuccess : (res) => res = res.data.items.map((item) => ({ ...item, url : item.snippet.thumbnails.medium.url, count : countSubscriber(item.statistics.subscriberCount) }))[0],
        retry : 2,
        staleTime : 1000 * 60 * 1000,
      }
    ]
  });



      //  const { isLoading : first, onSuccess : success, data: video } = useQuery({
  // useEffect(() => {
  //   const loadingFinishAll = result.some(result => result.isLoading);
  //   console.log(loadingFinishAll);
  // }, [items]);


  if (queries.some(query => query.isLoading)) {
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


  const channels = queries[1].data.data.items.map((item) => ({ ...item, url : item.snippet.thumbnails.medium.url, count : countSubscriber(item.statistics.subscriberCount) }))[0];
  const video = queries[0].data.data.items.map((item) => ({ ...item, view : countView(item.statistics.viewCount), like : countLike(item.statistics.likeCount) }))[0];


  // if (isSuccess) {
  //   console.log(items)
  // }


  // console.log(items)


  // const count = channels && countSubscriber(channels.count);
  // const view = video && countView(video.view);
  // const like = video && countLike(video.like);

 
  // console.log(channels);
  // let { snippet : { thumbnails : { medium : { url }}}, statistics : { subscriberCount: count } } = channels;
  // let { statistics : { viewCount: view, likeCount : like } } = video;



  const moveToDetail = () => {
    navigate(`/watch?v=${videoId}`, { state : { data, videoId, url : channels.url, count : channels.count, like : video.like } });
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
          { channels.url && <img className='cnThumb' src={channels.url} alt='channelThumbnail'/> }
          <p className='cnTit'>{channelTitle}</p>
        </div>
        { res.main ? null : <p className='des'>{description}</p> }
        <span className='time'>{video.view} ⦁ { res.main ? publishedAt : publishTime }</span>
      </div>
    </li>
  );
}

