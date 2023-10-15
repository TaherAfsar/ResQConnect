import React, { useState, useEffect } from 'react';
import { TextField, Button, makeStyles, Snackbar, Card } from '@mui/material';
import { collection, addDoc, GeoPoint, Timestamp } from 'firebase/firestore'; // Import GeoPoint from Firestore
import { setKey, fromAddress } from 'react-geocode';
import PlacesAutocomplete from 'react-places-autocomplete';
import { db } from '../utils/firebase';
import Nav from '../layouts/dashboard/nav/index';

const today = new Date();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const date = today.getDate();
const currentDate = `${month}/${date}/${year}`;
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

// Function to load the Google Maps JavaScript API script
const loadScript = (url, callback) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onload = callback;
  document.head.appendChild(script);
};

function AddUpcomingDisaster() {
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const inputStyle = {
    marginTop: '30px',
    width: '500px',
  };

  const form = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const [formData, setFormData] = useState({
    type: '',
    date: '',
    location: '',
    status: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setKey(process.env.REACT_APP_gMapsAPIKey); // Replace with your actual API key

      // Use react-geocode to convert location to coordinates
      const response = await fromAddress(formData.location);
      const { lat, lng } = response.results[0].geometry.location;

      // Create a GeoPoint
      const geoPoint = new GeoPoint(lat, lng);

      // Use Geocoding API to get detailed address information including the city
      const geoResponse = await fromAddress(formData.location);
      const city = extractCityFromGeoResponse(geoResponse);
      const timestamp = Timestamp.fromDate(formData.date);
      alert(city);
      // Create a data object with only the necessary fields
      const data = {
        type: formData.type,
        date: timestamp,
        location: geoPoint,
        status: formData.status,
        radius: formData.radius,
        city,
      };

      // Add data to Firestore
      const docRef = await addDoc(collection(db, 'disaster'), data);
      console.log('Document added with ID: ', docRef.id);
      setResponseMessage('Item added successfully');
      alert('Disaster Added Successfully');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const extractCityFromGeoResponse = (response) => {
    const addressComponents = response.results[0].address_components;
    for (let i = 0; i < addressComponents.length; i += 1) {
      const component = addressComponents[i];
      if (component.types.includes('locality')) {
        return component.long_name;
      }
    }
    return '';
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual Google Maps API key
    const apiKey = process.env.REACT_APP_gMapsAPIKey;

    // Load the Google Maps JavaScript API script
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_gMapsAPIKey}&libraries=places`,
      () => {
        setGoogleMapsLoaded(true);
      }
    );
  }, []);

  return (
    <div>
      <Card>
        <div>
          <Nav />

          {googleMapsLoaded ? (
            <form onSubmit={handleSubmit} style={form}>
              <h1>Add Upcoming Disaster</h1>
              <div>
                <TextField
                  style={inputStyle}
                  label="Disaster Type"
                  name="type"
                  variant="outlined"
                  value={formData.type}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  style={inputStyle}
                  name="date"
                  variant="outlined"
                  value={formData.date}
                  onChange={handleChange}
                  type="date"
                />
              </div>
              <div>
                <TextField
                  style={inputStyle}
                  name="status"
                  label="Enter status"
                  variant="outlined"
                  value={formData.status}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div>
                <TextField
                  style={inputStyle}
                  name="radius"
                  label="Enter radius of disaster in meter"
                  variant="outlined"
                  value={formData.radius}
                  onChange={handleChange}
                  type="number"
                />
              </div>
              <div>
                <PlacesAutocomplete
                  value={formData.location}
                  onChange={(value) => setFormData({ ...formData, location: value })}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <TextField
                        style={inputStyle}
                        label="Location"
                        variant="outlined"
                        {...getInputProps({ placeholder: 'Search Places...' })}
                      />
                      <div>
                        {loading ? <div>Loading...</div> : null}

                        {suggestions.map((suggestion) => {
                          const style = {
                            backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                          };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                style,
                              })}
                            >
                              {suggestion.description}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </div>

              <Button style={inputStyle} type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          ) : (
            <p>Loading Google Maps...</p>
          )}

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={responseMessage}
          />
        </div>
      </Card>
    </div>
  );
}

export default AddUpcomingDisaster;
