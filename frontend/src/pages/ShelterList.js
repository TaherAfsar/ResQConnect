import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Geocode, setKey, fromLatLng } from 'react-geocode';
import { app, db } from '../utils/firebase'; // Import your Firebase configuration

setKey(process.env.REACT_APP_gMapsAPIKey);

const ShelterListPage = () => {
  const [shelterData, setShelterData] = useState([]);

  useEffect(() => {
    // Reference to the "victim" collection in Firestore
    const shelterCollection = collection(db, 'shelter');

    // Fetch data from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(shelterCollection);
        const data = querySnapshot.docs.map(async (doc) => {
          const shelterInfo = doc.data();
          // Check if disasterInfo is undefined or missing necessary fields
          if (
            !shelterInfo ||
            !shelterInfo.location ||
            !shelterInfo.location.latitude ||
            !shelterInfo.location.longitude
          ) {
            console.error('Invalid or missing data for document:', doc.id);
            return null; // Skip this item or handle it appropriately
          }

          // Extract latitude and longitude from the 'location' entity
          const { latitude, longitude } = shelterInfo.location;

          // Fetch readable location
          const response = await fromLatLng(latitude, longitude);
          const readableLocation = response.results[0]?.formatted_address || 'Address not found';

          return {
            id: doc.id,
            ...shelterInfo,
            readableLocation, // Add the readable location to your data
          };
        });

        // Filter out null values (skipped items)
        const filteredData = data.filter((item) => item !== null);

        const resolvedData = await Promise.all(filteredData);
        setShelterData(resolvedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Shelter Data:</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>City</TableCell>
              <TableCell>capacity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shelterData.map((shelter) => (
              <TableRow key={shelter.id}>
                <TableCell>{shelter.name}</TableCell>
                <TableCell>{shelter.readableLocation}</TableCell>
                <TableCell>{shelter.city}</TableCell>
                <TableCell>{shelter.capacity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShelterListPage;
