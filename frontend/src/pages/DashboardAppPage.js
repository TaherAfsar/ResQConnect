import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase'; // Import your Firebase configuration
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';

export default function DashboardAppPage() {
  const theme = useTheme();
  const [totalReports, setTotalReports] = useState(0);
  const [totalShelterCount, setTotalShelterCount] = useState(0);
  const [totalCurrentDisasters, setTotalCurrentDisasters] = useState(0);

  useEffect(() => {
    const disasterCollection = collection(db, 'disaster');
    const shelterCollection = collection(db, 'shelter');
    const reportCollection = collection(db, 'reports');

    const fetchData = async () => {
      try {
        const disasterSnapshot = await getDocs(disasterCollection);
        const shelterSnapshot = await getDocs(shelterCollection);
        const reportSnapshot = await getDocs(reportCollection);

        const disasterCount = disasterSnapshot.size;
        const shelterCount = shelterSnapshot.size;
        const reportCount = reportSnapshot.size;

        setTotalCurrentDisasters(disasterCount);
        setTotalShelterCount(shelterCount);
        setTotalReports(reportCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Dashboard | ResQConnect</title>
      </Helmet>

      <Container display="flex" maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi Admin, Welcome back
        </Typography>

        <Grid container spacing={8}>
        <Grid item xs={12} sm={6} md={4}>
            <Box
              boxShadow={3} // Adjust the shadow depth (1-24)
              bgcolor="#A5C9CA"
              p={2}
              borderRadius={"10px"}
            >
              <AppWidgetSummary title="Total Reports" total={totalReports} icon={'ant-design:bar-chart'} sx={{height: "320px", fontSize: '80px'}} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              boxShadow={3}
              bgcolor="#D7E5CA"
              p={2}
              borderRadius={"10px"}
            >
              <AppWidgetSummary title="Total Pending Reports" total={totalShelterCount} color="info" icon={'ant-design:clock-circle'} sx={{height: "320px"}} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              boxShadow={3}
              bgcolor="#A5C9CA"
              p={2}
              borderRadius={"10px"}
            >
              <AppWidgetSummary title="Total Procured Item Count" total={totalCurrentDisasters} color="warning" icon={'ant-design:unordered-list'} sx={{height: "320px"}} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
