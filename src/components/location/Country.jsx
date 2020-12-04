import React from "react";
import { GeoJSON } from "react-leaflet";

export function CountryMarker(props) {
  const { location } = props;
  function onEachFeature(feature, layer) {
      layer.bindPopup(
        (feature.properties && feature.properties.name)?feature.properties.name : location.title
      );
    
  }
  
  return location === null ? null : (
    <GeoJSON color='red'
    fillColor='green'  data={location.data} weight={1} onEachFeature={onEachFeature}/>
  );
}
