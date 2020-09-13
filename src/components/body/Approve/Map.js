import React, {useEffect, useState} from 'react';
import {YMaps, Map, GeolocationControl} from "react-yandex-maps";

export default function Maps(props) {

   function handleClick(map) {
      if(map){
         console.log(map)
         map.events.add('locationchange', function (event) {
            let position = event.get('geoObjects').get(0).properties.getAll();
            let coordinates = event.get('position')
            console.log(position, coordinates)
            props.location(position)
         });
      }
   }

   const getGeoLocation = (ymaps) => {
      console.log(ymaps)
      ymaps.geolocation.get({
         provider: 'browser',
         autoReverseGeocode: true,
         useMapMargin: true
      }).then(function (result) {
         // Выведем результат геокодирования.
         // props.location(result.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData)
      });
   };

   return (
      <div style={{width: '100%'}}>
         <YMaps query={{apikey: 'a611d201-19b9-4184-98c3-e7d6c4de6c1d'}}>
            <Map
               defaultState={{
                  center: [41.311081, 69.240562],
                  zoom: 10,
                  controls: [],
               }}
               width="100%"
               height={320}
               modules={["geolocation", "geocode"]}
            >
               <GeolocationControl options={{float: 'right'}}
                                   onLoad={(ymaps) => getGeoLocation(ymaps)}
                                   instanceRef={(map) => handleClick(map)}
               />
            </Map>
         </YMaps>
      </div>
   );
}