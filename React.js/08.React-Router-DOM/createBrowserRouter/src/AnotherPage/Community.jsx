import React from 'react'
import MainNav from './MainNav';

function Community() {
  return (
    <section className="bg-blue-300 h-screen w-full">
        <MainNav />

        <div className="text-[#111] m-5">
            <h1 className="text-4xl font-bold">This is a Community Page.</h1>
        </div>
    </section>
  )
}

export default Community;
