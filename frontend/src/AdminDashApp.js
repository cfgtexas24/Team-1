import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GeocodeZipCodes = ({ zipCodes }) => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const getCoordinates = async () => {
      const coords = [];
      for (const zip of zipCodes) {
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${zip}&key=`
          );
          const { lat, lng } = response.data.results[0].geometry;
          coords.push({ lat, lng });
        } catch (error) {
          console.error("Error fetching geolocation for zip code:", zip, error);
        }
      }
      setCoordinates(coords);
    };
    getCoordinates();
  }, [zipCodes]);

  return (
    <div>
      <h1>Coordinates</h1>
      {coordinates.map((coord, index) => (
        <p key={index}>{`Lat: ${coord.lat}, Lng: ${coord.lng}`}</p>
      ))}
      {/* Use the coordinates in a heatmap component here */}
    </div>
  );
};

export default GeocodeZipCodes;
