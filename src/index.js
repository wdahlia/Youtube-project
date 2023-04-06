import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import YoutubeProvider from './context/YoutubeProvider';
import Main from './pages/Main';
import VideoArea from './pages/VideoArea';
import VideoDetail from './pages/VideoDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path : '/',
    element : <Root />,
    children : [
      { index : true, element : <Main /> },
      { path : '/?q=searchId', element : <VideoArea /> },
    ]
  },
  {
    path : '/:videoId',
    element : <VideoDetail />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <YoutubeProvider>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </YoutubeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
