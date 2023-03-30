import React from 'react';
import mockVideoDetail from '../api/mockVideoDetail';
import relatedVideos from '../api/mockRelatedVideo';

export default function VideoDetail({ channelUrl }) {
  const videoId = mockVideoDetail.items[0].id;
  const detailData = mockVideoDetail.items[0].snippet;
  const { publishedAt, title, description, channelTitle, contentDetails } = detailData;

  let publishTime = new Date(publishedAt);
  
  publishTime = `${publishTime.getFullYear()}. ${publishTime.getMonth() + 1}. ${publishTime.getDate()}`

  console.log(publishTime);

  return (
    <>
      <article className='videoDetailContainer'>
        <iframe 
          id="ytplayer" 
          type="text/html" 
          width="1000" 
          height="600"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameborder="0">
        </iframe>
        <div className='detailInfoBox box'>
          <h1 className='tit'>{title}</h1>
          <div className='cnBox box'>
            <img src={channelUrl} className='cnThumb' />
            <p className='cnTit'>{channelTitle}</p>
            <button>구독</button>
          </div>
          <div className='detailInfo'>
            <h3>{publishTime}</h3>
            <pre className='des'>{description}</pre>
          </div>
        </div>
      </article>
      <section className='relatedAside'>

      </section>
    </>
  );
}

