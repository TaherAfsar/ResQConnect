import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import {
    TextField,
    Button,
    makeStyles,
    Snackbar, // Import Snackbar component from MUI
} from '@mui/material';

const token = localStorage.getItem('token');
console.log(token)
function StaffForm() {
    const inputStyle = {
        marginTop: "30px",
        width: "500px"
    }
    console.log(token)
    const [formData, setFormData] = useState({
        name: '',
        branch: '',
        gender: '',
        phone: '',
        email: '',
        password: '',
        staffType: '',
        role: 'staff',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData)
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.post('http://192.168.151.85:4000/user/create-user', formData, { headers });
            if (response.data.message === 'user added') {
                setResponseMessage('User added successfully');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        style={inputStyle}
                        label="Name"
                        name="name"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        style={inputStyle}
                        label="branch"
                        name="branch"
                        variant="outlined"
                        value={formData.branch}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        style={inputStyle}
                        label="Staff Type"
                        name="stafftype"
                        variant="outlined"
                        value={formData.stafftype}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        style={inputStyle}
                        label="Email"
                        name="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        style={inputStyle}
                        label="phone"
                        name="phone"
                        variant="outlined"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        style={inputStyle}
                        label="gender"
                        name="gender"
                        variant="outlined"
                        value={formData.gender}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        style={inputStyle}
                        label="password"
                        name="password"
                        variant="outlined"
                        value={formData.password}
                        type='password'
                        onChange={handleChange}
                    />
                </div>
                <Button
                    style={inputStyle}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>


            </form>

            {/* Snackbar to display the response message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Adjust the duration as needed
                onClose={handleSnackbarClose}
                message={responseMessage}
            />
        </div>
    );
}

export default StaffForm;

