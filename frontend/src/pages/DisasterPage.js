import React, { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Geocode, setKey, fromLatLng } from 'react-geocode';
import { app, db, sendMessageToFCM } from '../utils/firebase'; // Import your Firebase configuration

setKey(process.env.REACT_APP_gMapsAPIKey);
const DisasterPage = () => {
  const [disasterData, setDisasterData] = useState([]);
  const [userTokens, setUserTokens] = useState([]);
  const convertTimestamp = (timestamp) => {
    let date = timestamp.toDate();
    const mm = date.getMonth();
    const dd = date.getDate();
    const yyyy = date.getFullYear();

    date = `${mm}/${dd}/${yyyy}`;
    return date;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const victimCollection = collection(db, 'victims');
        const querySnapshot = await getDocs(victimCollection);
        const data = querySnapshot.docs.map((doc) => doc.data().Ntoken);
        setUserTokens(data);
        console.log(data); // Optional: Log the data to see the array of tokens
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Reference to the "disaster" collection in Firestore
    const disasterCollection = collection(db, 'disaster');
    console.log('disasterCollection:', disasterCollection);
    // Fetch data from Firestore

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(disasterCollection);
        const data = querySnapshot.docs.map(async (doc) => {
          const disasterInfo = doc.data();
          // Check if disasterInfo is undefined or missing necessary fields
          if (
            !disasterInfo ||
            !disasterInfo.location ||
            !disasterInfo.location.latitude ||
            !disasterInfo.location.longitude
          ) {
            console.error('Invalid or missing data for document:', doc.id);
            return null; // Skip this item or handle it appropriately
          }

          // Extract latitude and longitude from the 'location' entity
          const { latitude, longitude } = disasterInfo.location;

          // Fetch readable location
          const response = await fromLatLng(latitude, longitude);
          const readableLocation = response.results[0]?.formatted_address || 'Address not found';

          return {
            id: doc.id,
            ...disasterInfo,
            date: disasterInfo.date, // Convert and set the date
            readableLocation, // Add the readable location to your data
          };
        });

        // Filter out null values (skipped items)
        const filteredData = data.filter((item) => item !== null);

        const resolvedData = await Promise.all(filteredData);
        setDisasterData(resolvedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    for (let i = 0; i <= userTokens.length; i += 1) {
      sendMessageToFCM('DANGER !', 'Disaster Alert in your area', userTokens[i]);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error" // Use a color like "error" for danger buttons
        onClick={handleClick}
      >
        Send Alert
      </Button>
      <h2>Disaster Data:</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Radius in meter</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {disasterData.map((disaster) => (
              <TableRow key={disaster.id}>
                <TableCell>{disaster.type}</TableCell>
                <TableCell>{convertTimestamp(disaster.date)}</TableCell>
                <TableCell>{disaster.readableLocation}</TableCell>
                <TableCell>{disaster.status}</TableCell>
                <TableCell>{disaster.radius}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DisasterPage;
