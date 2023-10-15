// UserTypeSelection.js
import React, { useState } from 'react';
import {
    Popover,
    Box,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

export default function UserTypeSelection({ open, onClose, onCreateUser }) {
    const [userTypeSelection, setUserTypeSelection] = useState('');

    const handleUserTypeSelection = (event) => {
        setUserTypeSelection(event.target.value);
    };

    const handleCreateUser = () => {
        onCreateUser(userTypeSelection);
        onClose();
    };

    return (
        <Popover
            open={open}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
            <Box p={2} minWidth={200}>
                <Typography variant="subtitle1" gutterBottom>
                    Select User Type
                </Typography>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>User Type</InputLabel>
                    <Select
                        value={userTypeSelection}
                        onChange={handleUserTypeSelection}
                        label="User Type"
                    >
                        <MenuItem value="Teacher">Teacher</MenuItem>
                        <MenuItem value="Procurement Officer">Procurement Officer</MenuItem>
                        <MenuItem value="Staff Member">Staff Member</MenuItem>
                    </Select>
                </FormControl>
                {userTypeSelection && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateUser}
                    >
                        Create User
                    </Button>
                )}
            </Box>
        </Popover>
    );
}
