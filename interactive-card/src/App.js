import React from "react";

import bgMobile from "./images/bgMobile.png";
import bgDesktop from "./images/bgDesktop.png";
import cardFront from "./images/card-front.png";
import cardBack from "./images/card-back.png";

import "./index.css";

export default function App(){
  return <>
    <section>
      <div className="absolute -z-10">
        <picture>
          <source media = "(min-width: 1024px)" srcSet={bgDesktop} />
          <img src={bgMobile} alt=""/>
        </picture>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="mt-12 mx-5 lg:grid lg:grid-cols-1 lg:gap-5">
          <article className="front-card p-5 flex flex-col justify-between">
            <div></div>
            <div>
              <h2 className="text-white text-xl lg:text-3xl mb-1 mt-20 tracking-widest">0000 0000 0000 0000</h2>
            </div>
            <div>
            <ul className="flex items-center justify-between mb-6">
                <li className="text-white uppercase tracking-widest">Ana Carolina</li>
                <li className="text-white tracking-widest">00/00</li>
              </ul>
            </div>
            
          </article>
          <article className="back-card relative">
            <p className="absolute right-16 text-white tracking-widest">000</p>
          </article>
        </div>

        <div>
          <form>
            <div>
              <label htmlFor="name">Nome no cartão</label>
              <input type="text" name="nome" id="name" placeholder="ex.: Ana Carolina S" required/>
            </div>
          </form>




        </div>
      </div>
    </section>
  
  
  
  </>
}