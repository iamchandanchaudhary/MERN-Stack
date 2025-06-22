import React from 'react';
import {useParams} from "react-router-dom";
import Navbar from './Navbar';

function PramsComp() {

    const {id} = useParams();

  return (
    <section className="bg-blue-300 h-screen w-full">
        <Navbar />

        <div className="text-[#111] m-5">
            <h1 className="text-4xl font-bold">Params: {id}</h1>
        </div>
    </section>
  )
}

export default PramsComp;
