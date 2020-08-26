import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import style from './body.module.css';
import coke from '../../img/coke.jpg';
import bucks from '../../img/bucks.jpg';
import mc from '../../img/mc.jpg';
import car from '../../img/car.jpg';

export default function Ads() {
   const pics = [coke, bucks, mc, car];
   return (
      <div className={style.carousel}>
         <Carousel autoPlay showArrows={false} showIndicators={false} showStatus={false}
                   showThumbs={false} infiniteLoop={true} transitionTime={400} interval={5000}>
            {pics.map((e, i) =>
               <a  key={i} href="https://google.com">
                  <div>
                    <img src={e} alt=""/>
                  </div>
               </a>
            )}
         </Carousel>
      </div>
   )
}