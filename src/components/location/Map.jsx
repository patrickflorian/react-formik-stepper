import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import LeafletSearch from "leaflet-search";
import { CountryMarker } from "./Country";
import { TownMarker } from "./Town";
import { QuarterMarker } from "./Quater";
//import "leaflet/dist/leaflet.css";

function LocationMarker(props) {
  const { location } = props;
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

  useEffect(() => {
    if (location) {
      map.setZoom(8);
      map.flyTo(location);
    }
  });
  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function SearchControl() {
  const map = useMap();
  var searchLayer = L.layerGroup().addTo(map);
  //... adding data in searchLayer ...
  map.addControl(
    new LeafletSearch({
      layer: searchLayer,
    })
  );
  //searchLayer is a L.LayerGroup contains searched markers
  return <></>;
}
export function MapInput(props) {
  const { location, countries, quarters, towns } = props;
  return (
    <div style={{ height: 300, marginTop: 10 }}>
      <MapContainer center={location} zoom={8} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchControl></SearchControl>
        <LocationMarker location={location} />
        {countries.map((country) => {
          if (location && country.latlng) {
            return (
              country.latlng.lat === location.lat &&
              country.latlng.lng === location.lng && (
                <CountryMarker location={country} />
              )
            );
          }
          return <CountryMarker location={country} />;
        })}
        {towns.map((country) => {
          if (location && country.latlng) {
            return (
              country.latlng.lat === location.lat &&
              country.latlng.lng === location.lng && (
                <CountryMarker location={country} />
              )
            );
          }
          return <CountryMarker location={country} />;
        })}
        {quarters.map((country) => {
          if (location && country.latlng) {
            return (
              country.latlng.lat === location.lat &&
              country.latlng.lng === location.lng && (
                <CountryMarker location={country} />
              )
            );
          }
          return <CountryMarker location={country} />;
        })}
      </MapContainer>
    </div>
  );
}
