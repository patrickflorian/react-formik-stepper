import React, { useEffect } from "react";
import { Marker, Popup , GeoJSON, useMap} from "react-leaflet";

export function TownMarker(props) {
  const { location } = props;
  function onEachFeature(feature, layer) {console.log(layer);
    layer.bindPopup(
      (feature.properties && feature.properties.name)?feature.properties.name : location.title
    );
  
}
const map =useMap();
useEffect(()=>{
  map.setZoom(8)
})
  return location === null ? null : (
    <>
    <Marker position={location.latlng}>
      <Popup>{location.title}</Popup>
    </Marker>
    <GeoJSON color='#1cb5e0'
    fillColor='#f7b733'  data={location.data} weight={1} onEachFeature={onEachFeature}/>
    </>
  );
}
