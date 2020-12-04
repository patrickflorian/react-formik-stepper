import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export function QuarterMarker(props) {
  const { location } = props;
  const map =useMap();
  useEffect(()=>{
    map.setZoom(12)
  })
  return location === null ? null : (
    <Marker position={location.latlng}>
      <Popup>{location.title}</Popup>
    </Marker>
  );
}
