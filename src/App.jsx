import './App.css';
import Aside from './components/Aside';
import Nav from './components/Nav';
import VideoArea from './pages/VideoArea';
import VideoDetail from './pages/VideoDetail';
import channelsData from './mockChannelData';
import YoutubeProvider from './context/YoutubeProvider';
import Main from './pages/Main';

function App() {
  const channels = channelsData;
  const { items } = channels;
  const { snippet } = items[0];
  const channelUrl = snippet.thumbnails.default.url

  // Router 사용, / 일때는 main 페이지 
  return (
    <YoutubeProvider>
      <div className="App">
        <Nav />
        <section className='section box'>
          <Aside />
          <Main />
        </section>
      </div>
    </YoutubeProvider>
  );
}

export default App;
