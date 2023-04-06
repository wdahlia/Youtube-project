import React from 'react';
import mockData from '../mockSearchData'
import VideoCard from '../components/VideoCard';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function VideoArea() {
  const { state : value } = useLocation();

  const instance = axios.create({
    baseURL : 'https://youtube.googleapis.com/youtube/v3',
    params : { key : process.env.REACT_APP_YOUTUBE_SECRET_KEY }
  });

  const { isLoading, isError, data : videos } = useQuery({
    queryKey : ['searchVideos', value ],
    queryFn : () => instance.get('/search/', {
      params : {
        maxResults : 25,
        type : 'video',
        q : value,
        part : 'snippet',
        regionCode : 'KR',
      }
    }).then((res) => {
      return res.data.items;
    }),
    retry : 1,
    staletTime : 1000 * 60 * 200,
  });

  return (
    <article className='videoContainer box'>
      <ul>
        { videos && videos.map((item => <button className='videoCardBtn'><VideoCard key={item.id.videoId} data={item.snippet} videoId={item.id.videoId} /></button>))}
      </ul>
    </article>
  );
}

