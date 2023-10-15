import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { app, db } from '../utils/firebase'; // Import your Firebase configuration

const UserPage = () => {
  const [victimData, setVictimData] = useState([]);

  useEffect(() => {
    // Reference to the "victim" collection in Firestore
    const victimCollection = collection(db, 'victims');

    // Fetch data from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(victimCollection);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVictimData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Victim Data:</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Disaster Prone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {victimData.map((victim) => (
              <TableRow key={victim.id}>
                <TableCell>{victim.name}</TableCell>
                <TableCell>{victim.phone}</TableCell>
                <TableCell>{victim.city}</TableCell>
                <TableCell>{victim.role}</TableCell>
                <TableCell>{String(victim.disaster_prone)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserPage;
