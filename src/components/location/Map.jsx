import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from 'leaflet';
import LeafletSearch from 'leaflet-search'
//import "leaflet/dist/leaflet.css";


function LocationMarker() {


  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  
  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
function SearchControl( ){
  
  const map = useMap();
  var searchLayer = L.layerGroup().addTo(map);
  //... adding data in searchLayer ...
  map.addControl(new LeafletSearch({
		layer: searchLayer
	}) );
  //searchLayer is a L.LayerGroup contains searched markers
  return(<></>)
}
export function MapInput(props) {

  return (
    <div style={{ height: 300, marginTop: 10 }}>
      <MapContainer
        center={{ lat: 4.0849531, lng: 9.7486781 }}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchControl></SearchControl>
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
