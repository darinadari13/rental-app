import React, { useRef, useEffect  } from 'react';
import classes from  './index.module.scss';
import { Wrapper } from "@googlemaps/react-wrapper";
import { API_KEY_GOOGLE_MAPS } from '../../constants/constants';

// TODO: chage to Ukraie position
const center = { lat: -34.397, lng: 150.644 };
const zoom = 4;

const Map = () => {
  return (
    <Wrapper apiKey={API_KEY_GOOGLE_MAPS}>
      <MyMapComponent center={center} zoom={zoom} />
    </Wrapper>
  )
};

function MyMapComponent({
  center,
  zoom,
}) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" className={classes.root} />;
}

export default Map;