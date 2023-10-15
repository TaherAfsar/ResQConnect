import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { setKey, fromLatLng } from 'react-geocode';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import { app, db } from '../utils/firebase'; // Import your Firebase configuration

// Set your Google Maps API key
setKey(process.env.REACT_APP_gMapsAPIKey);

const ViewReportsPage = () => {
  const latitude = 19.10746;
  const longitude = 72.8375;
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const defaultCenter = {
    lat: latitude,
    lng: longitude,
  };
  const [reportsData, setReportsData] = useState([]);
  const [markers, setMarkers] = useState([
    { lat: latitude, lng: longitude }, // Default marker
  ]);
  const mapRef = useRef(null);

  useEffect(() => {
    const reportsCollection = collection(db, 'reports');

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(reportsCollection);
        const data = querySnapshot.docs.map(async (doc) => {
          const reportsInfo = doc.data();

          if (
            !reportsInfo ||
            !reportsInfo.location ||
            !reportsInfo.location.latitude ||
            !reportsInfo.location.longitude
          ) {
            console.error('Invalid or missing data for document:', doc.id);
            return null;
          }

          const { latitude, longitude } = reportsInfo.location;

          // Fetch readable location
          const response = await fromLatLng(latitude, longitude);
          const readableLocation = response.results[0]?.formatted_address || 'Address not found';

          return {
            id: doc.id,
            ...reportsInfo,
            readableLocation,
            latitude, // Add latitude and longitude to the data for markers
            longitude,
          };
        });

        const filteredData = data.filter((item) => item !== null);
        const resolvedData = await Promise.all(filteredData);
        setReportsData(resolvedData);

        // Update the markers based on the fetched data
        setMarkers(
          resolvedData.map((item) => ({
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
          }))
        );

        console.log('Resolved Data:', resolvedData);
        console.log('Markers:', markers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Reports Data:</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Image Evidence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportsData.map((reports) => (
              <TableRow key={reports.id}>
                <TableCell>{reports.readableLocation}</TableCell>
                <TableCell>{reports.disaster_type}</TableCell>
                <TableCell>{String(reports.disaster_date.toDate())}</TableCell>
                <TableCell>
                  {' '}
                  <Box
                    component="img"
                    sx={{
                      height: 233,
                      width: 350,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="Location of disaster occurence."
                    src={reports.disaster_image}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>Maps</h2>
      <Box>
        <LoadScript googleMapsApiKey={`${process.env.REACT_APP_gMapsAPIKey}`}>
          <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
            {markers.map((marker, index) => (
              <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
            ))}
          </GoogleMap>
        </LoadScript>
      </Box>
    </div>
  );
};

export default ViewReportsPage;
