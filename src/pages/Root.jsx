import React from 'react';
import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <Nav />
        <section className='section box'>
          <Outlet />
        </section>
    </>
  );
}

