import React from 'react';
import { changeDateFormat } from '../util/date';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { viewCount } from '../util/counter';


export default function RelatedVideo({ videoId, data }) {
  const navigate = useNavigate();

  let { publishedAt, title, thumbnails, channelTitle, channelId } = data;
  publishedAt = new Date(publishedAt);
  publishedAt = changeDateFormat(publishedAt);


  const instance = axios.create({
    baseURL : 'https://youtube.googleapis.com/youtube/v3',
    params : { key : process.env.REACT_APP_YOUTUBE_SECRET_KEY }
  });

  const { isLoading, onSuccess, data: channels } = useQuery({
    queryKey : ['channel', channelId ],
    queryFn : () => instance.get('/channels/', {
      params : {
        part : 'snippet,statistics',
        id : channelId
      } 
    }).then((res) => {
      return res.data.items[0];
    }),
    retry : 1,
    staleTime : 1000 * 60 * 1000,
  });

  if (isLoading) {
    return <div>Loading...</div>
  }

  let { snippet : { thumbnails : { medium : { url }}}, statistics : { subscriberCount : count } } = channels;

  count = viewCount(count)
  const moveToDetail = () => {
    navigate(`/watch?v=${videoId}`, { state : { data, videoId, url } });
  }

  

  return (
    <li 
      className='detailVideo box'
      onClick={moveToDetail}
      >
      <img src={thumbnails.medium.url} className='thumb' alt='relatedVideo' />
      <div className='relVideoInfo box'>
        <h4 className='tit'>{title}</h4>
        <p>{count}</p>
        <p className='cnTit'>{channelTitle}</p>
        <p className='time'>{publishedAt}</p>
      </div>
    </li>
  );
}

