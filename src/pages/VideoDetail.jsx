import React from 'react';
import mockVideoDetail from '../mockVideoDetail';
import relatedVideos from '../mockRelatedVideo';
import RelatedVideo from '../components/RelatedVideo';

export default function VideoDetail({ channelUrl }) {

  const videoId = mockVideoDetail.items[0].id;
  const detailData = mockVideoDetail.items[0].snippet;
  const { publishedAt, title, description, channelTitle, contentDetails } = detailData;

  let publishTime = new Date(publishedAt);
  
  publishTime = `${publishTime.getFullYear()}. ${publishTime.getMonth() + 1}. ${publishTime.getDate()}`

  console.log(publishTime);


  // relatedVideo 
  const relVideos = relatedVideos;
  const { items } = relVideos;

  return (
    <>
      <article className='videoDetailContainer'>
        <div style={{ width: '800px', height: '500px', position: 'relative'}}> 
          <div style={{ width: '780px', height: '460px', position: 'relative', overflow: 'hidden', filter: 'blur(55px)' }}>
            <iframe 
              id="ytplayer" 
              type="text/html" 
              width="1080" 
              height="580"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&volume=0`}
              frameborder="0"
              style={{ position: 'absolute', left: '0', top: '0', zIndex: '-2', filter: 'blur(100px)' }}>
            </iframe>
          </div>
          <iframe 
              id="ytplayer" 
              type="text/html" 
              width="800" 
              height="480"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
              frameborder="0"
              style={{ position: 'absolute', filter: 'blur(0px)', top: '0', textAlign: 'center', objectFit: 'cover' }}>
          </iframe>
        </div>
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
        <ul class='relatedAsideArea box'>
            { items.map((item) => <RelatedVideo key={item.id.videoId} videoId={item.id.videoId} data={item.snippet} />) }
        </ul>
      </section>
    </>
  );
}
