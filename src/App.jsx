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
  // /?q=searchValue, 일때는 VideoArea search로 youtube API 호출해주어야함
  // 그리고 각각 search값 있을때 map으로 돌면서 각 요소 channelId 따로 빼서 내부에서 api 호출 있어야함
  // /?v=:videoId, 일떄는 VideoDetail video로 youtube API 호출해주어야함 호출해줘야함 
  // 

  return (
    <YoutubeProvider>
      <div className="App">
        <Nav />
        <section className='section box'>
          <Main />
        </section>
      </div>
    </YoutubeProvider>
  );
}

export default App;
