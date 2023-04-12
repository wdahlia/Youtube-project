import React from 'react';
import VideoCard from '../components/VideoCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 이 부분은 fetch 해올 데이터가 most popular 부분
export default function Main() {
  // const { items } = mockMostPopularData;

  const instance = axios.create({
    baseURL : 'https://youtube.googleapis.com/youtube/v3',
    params : {
      key : process.env.REACT_APP_YOUTUBE_SECRET_KEY,
    }
  });

  const { isLoading, isError, data: videos } = useQuery({
    queryKey : ['popularVideos'],
    queryFn : () => instance.get('/videos/', {
      params : {
        part : 'snippet,contentDetails,statistics',
        chart : 'mostPopular',
        regionCode: 'KR',
        maxResults : 25,
      }
    }).then((res) => {
      return res.data.items
    }),
    retry: 1,
    staleTime : 1000 * 60 * 500,
  });


  return (
    <section className='mainBox box'>
      { videos && videos.map((item) => <VideoCard key={item.id} data={item.snippet} videoId={item.id} main/>)}
    </section>
  );
}

