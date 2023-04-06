import React from 'react';
import Aside from '../components/Aside';
import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <Nav />
        <section className='section box'>
          <Aside />
          <Outlet />
        </section>
    </>
  );
}

