import './App.css';
import Aside from './components/Aside';
import Nav from './components/Nav';
import VideoArea from './components/VideoArea';

function App() {
  return (
    <div className="App">
      <Nav />
      <section className='section box'>
        <Aside />
        <VideoArea />
      </section>
      
    </div>
  );
}

export default App;
