import React from 'react';

const Marker = ({ id, title, position, map, onMarkerSelect }) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions({ title, position, map });
      marker.addListener("click", () => {
       onMarkerSelect(id)
      });
    }
  }, [marker, position, map, title, id]);

  return null;
};

export default Marker;