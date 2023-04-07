import React from 'react';
import relatedVideos from '../mockRelatedVideo';
import RelatedVideo from '../components/RelatedVideo';
import VideoCard from '../components/VideoCard';
import { useYoutubeContext } from '../context/YoutubeProvider';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


export default function VideoDetail() {
  const { state } = useLocation();

  const { data, videoId, url } = state;
  let { title, publishedAt, description, channelTitle } = data;

  title = title.replace(/&#39;/g, "'");

  console.log(description);
  // state로 해서 id 값을 가져온다

  const { mode } = useYoutubeContext();

  let publishTime = new Date(publishedAt);
  publishTime = `${publishTime.getFullYear()}. ${publishTime.getMonth() + 1}. ${publishTime.getDate()}`

  // related Video값 fetching 해오기

  const instance = axios.create({
    baseURL : 'https://youtube.googleapis.com/youtube/v3',
    params : { key : process.env.REACT_APP_YOUTUBE_SECRET_KEY }
  });

  const { isLoading, isError, data : videos } = useQuery({
    queryKey : ['relVideos', videoId ],
    queryFn : () => instance.get('/search/', {
      params : {
        part : 'snippet',
        relatedToVideoId : videoId,
        maxResults : 25,
        type : 'video',
      }
    }).then((res) => {
      return res.data.items
    }),
    retry : 1,
    staleTime : 1000 * 60 * 100,
  });

  return (
    <>
      <article className='videoDetailContainer'>
        <div style={{ width: '800px', height: '500px', position: 'relative'}}> 
          { mode ? <div style={{ width: '780px', height: '460px', position: 'relative', top: '13px', overflow: 'hidden', filter: 'blur(200px)' }}>
            <iframe 
              id="ytplayer" 
              type="text/html" 
              width="1080" 
              height="580"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
              frameBorder="0"
              style={{ pointerEvents: 'none', cursor: 'none', position: 'absolute', left: '0', top: '0', zIndex: '-200', filter: 'blur(200px)' }}>
            </iframe>
          </div> : null }
          <iframe 
              id="ytplayer" 
              type="text/html" 
              width="800" 
              height="480"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&volume=0`}
              frameBorder="0"
              style={{ position: 'absolute', filter: 'blur(0px)', top: '0', textAlign: 'center', objectFit: 'cover' }}>
          </iframe>
        </div>
        <div className='detailInfoBox box'>
          <h1 className='tit'>{title}</h1>
          <div className='cnBox box'>
            { url && <img src={url} className='cnThumb' /> }
            <p className='cnTit'>{channelTitle}</p>
            <button>구독</button>
          </div>
          <div className='detailInfo'>
            <h3>{publishTime}</h3>
            <p className='des'>{description}</p>
          </div>
        </div>
      </article>
      <section className='relatedAside'>
        <ul className='relatedAsideArea box'>
            { videos && videos.map((item) => <RelatedVideo key={item.id.videoId} videoId={item.id.videoId} data={item.snippet} />) }
        </ul>
      </section>
    </>
  );
}

