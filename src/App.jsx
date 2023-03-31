import './App.css';
import Aside from './components/Aside';
import Nav from './components/Nav';
import VideoArea from './pages/VideoArea';
import VideoDetail from './pages/VideoDetail';
import channelsData from './mockChannelData';

function App() {
  const channels = channelsData;
  const { items } = channels;
  const { snippet } = items[0];
  const channelUrl = snippet.thumbnails.default.url

  // Router 사용, / 일때는 main 페이지 
  return (
    <div className="App">
      <Nav />
      <section className='section box'>
        <VideoDetail channelUrl={channelUrl} />
      </section>
    </div>
  );
}

export default App;
