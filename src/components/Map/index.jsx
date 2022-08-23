import React, { useEffect } from 'react';
import classes from  './index.module.scss';
import { Wrapper } from "@googlemaps/react-wrapper";
import { API_KEY_GOOGLE_MAPS } from '../../constants';
import Marker from '../Marker';

const center = { lat: 50.4455622, lng: 30.4790569 };
const zoom = 12 ;


const MapWrapper = ({ markers, onMarkerSelect }) => {
  return (
    <Wrapper apiKey={API_KEY_GOOGLE_MAPS} libraries={["places"]}>
      <Map center={center} zoom={zoom} markers={markers} onMarkerSelect={onMarkerSelect} />
    </Wrapper>
  )
};

function Map({
  center,
  zoom,
  markers,
  onMarkerSelect
}) {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center,
        zoom,
      }));
    }
  }, [ref, map, center, zoom]);

  useEffect(() => {
    if (map) {
      window.google.maps.event.addListener(map, 'click', () => {
        onMarkerSelect(null)
      });
    }
  }, [map])


  return (
    <>
      <div ref={ref} id="map" className={classes.root} />
      {
        map && markers.map(marker => <Marker key={marker.id} id={marker.id} title={marker.title} position={marker.position} map={map} onMarkerSelect={onMarkerSelect} />)
      }
    </>
  );
}

export default MapWrapper;