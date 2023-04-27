import React, { useState, useEffect } from 'react';
import { changeDateFormat } from '../util/date';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { countLike, countSubscriber, countView } from '../util/counter';


export default function RelatedVideo({ videoId, data }) {
  const navigate = useNavigate();

  let { publishedAt, title, thumbnails, channelTitle, channelId } = data;
  publishedAt = new Date(publishedAt);
  publishedAt = changeDateFormat(publishedAt);


  const instance = axios.create({
    baseURL : 'https://youtube.googleapis.com/youtube/v3',
    params : { key : process.env.REACT_APP_YOUTUBE_SECRET_KEY }
  });


  const queries = useQueries({
    queries : [
      {
        queryKey : ['video', videoId ],
        queryFn : () => instance.get('/videos/', {
        params : {
          part : 'snippet,statistics',
          id : videoId,
        },
        retry : 1,
        staleTime : 1000 * 60 * 1000,
        })
      },
      {
        queryKey : ['channel', channelId ],
        queryFn : () => instance.get('/channels/', {
          params : {
            part : 'snippet,statistics',
            id : channelId
          } 
        }),
        retry : 2,
        staleTime : 1000 * 60 * 100,
      }
    ]
  })

  // const { isLoading : first, data : channels } = useQuery({
  //   queryKey : ['channel', channelId ],
  //   queryFn : () => instance.get('/channels/', {
  //     params : {
  //       part : 'snippet,statistics',
  //       id : channelId
  //     } 
  //   }),
  //   select : res => (res.data.items.map((item) => ({ ...item, url : item.snippet.thumbnails.medium.url, count : countSubscriber(item.statistics.subscriberCount) }))[0]),
  //   retry : 2,
  //   staleTime : 1000 * 60 * 100,
  // })


  // const { isLoading, data: video } = useQuery({
  //   queryKey : ['video', videoId ],
  //   queryFn : () => instance.get('/videos/', {
  //     params : {
  //       part : 'snippet,statistics',
  //       id : videoId,
  //     } 
  //   }),
  //   select : (res) => {
  //     res = res.data.items.map((item) => ({ ...item, thumb : item.snippet.thumbnails.medium.url, view : countView(item.statistics.viewCount), like : countLike(item.statistics.likeCount) }))[0]
  //     return res
  //   },
  //   retry : 1,
  //   staleTime : 1000 * 60 * 1000,
  // });



  if (queries.some(query => query.isLoading)) {
    return (
      <li className='box' style={{ columnGap: '1rem', margin: '0.5rem 0' }}>
        <div className='ph ph-thumb'></div>
        <div className='box' style={{ flexDirection : 'column', rowGap : '1rem' }}>
          <div className='ph ph-md'></div>
          <div className='ph ph-sm'></div>
          <div className='ph ph-sm'></div>
        </div>
      </li>
    )
  }

  console.log(queries[0].data.data.items)

  // const view = video?.video && countView(video.view);
  // const like = video?.video && countLike(video.like);
  // const count = channels?.channels && countSubscriber(channels.count);
  // const thumb = video?.video && video.thumb;

  const channels = queries[1].data.data.items.map((item) => ({ ...item, url : item.snippet.thumbnails.medium.url, count : countSubscriber(item.statistics.subscriberCount) }))[0];
  const video = queries[0].data.data.items.map((item) => ({ ...item, thumb: item.snippet.thumbnails.medium.url, view : countView(item.statistics.viewCount), like : item.statistics.likeCount }))[0];

  const moveToDetail = () => {
    navigate(`/watch?v=${videoId}`, { state : { data, videoId, url : channels.url, view : video.view, like : countLike(video.like) , count : channels.count } });
  }

  // channelCount moveToDetail에 담아 보내야함

  

  return (
     <li 
       className='detailVideo box'
       onClick={moveToDetail}
       >
      { video.thumb && <img src={video.thumb} className='thumb' alt='relatedVideo' /> }
       <div className='relVideoInfo box'>
         <h4 className='tit'>{title}</h4>
         <p className='cnTit'>{channelTitle}</p>
         <span className='time'>{video.view} ⦁ {publishedAt}</span>
       </div>
     </li>
   );
}

