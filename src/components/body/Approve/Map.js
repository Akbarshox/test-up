import React, {useEffect, useState} from 'react';
import {YMaps, Map, GeolocationControl} from "react-yandex-maps";

export default function Maps(props) {

   const getGeoLocation = (ymaps) => {
      ymaps.geolocation.get({
         provider: 'browser',
         autoReverseGeocode: true,
         useMapMargin: true
      }).then(function (result) {
         // Выведем результат геокодирования.
         props.location(result.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData)
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
               <GeolocationControl options={{float: 'right'}} onLoad={(ymaps) => getGeoLocation(ymaps)}
                                   press={e => console.log("123")}
               />
            </Map>
         </YMaps>
      </div>
   );
}