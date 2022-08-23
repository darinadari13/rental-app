import React, { useEffect } from 'react';
import classes from  './index.module.scss';
import { Wrapper } from "@googlemaps/react-wrapper";
import { API_KEY_GOOGLE_MAPS } from '../../constants';
import Marker from '../Marker';

const center = { lat: 50.4455622, lng: 30.4790569 };
const zoom = 12 ;


const MapWrapper = ({ markers }) => {
  return (
    <Wrapper apiKey={API_KEY_GOOGLE_MAPS} libraries={["places"]}>
      <Map center={center} zoom={zoom} markers={markers}  />
    </Wrapper>
  )
};

function Map({
  center,
  zoom,
  markers
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


  return (
    <>
      <div ref={ref} id="map" className={classes.root} />
      {
        map && markers.map(marker => <Marker key={marker.id} position={marker.position} map={map} />)
      }
    </>
  );
}

export default MapWrapper;