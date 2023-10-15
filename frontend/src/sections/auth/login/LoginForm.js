import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleClick = async () => {
    try {
      const apiUrl = 'http://192.168.151.85:4000/admin/login';
      const loginData = {
        email,
        password,
      };

      const response = await axios.post(apiUrl, loginData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('role', "admin");
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        {/* Add onChange handlers to update email and password state */}
        <TextField name="email" label="Email" onChange={handleEmailChange} value={email} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handlePasswordChange} // Update password state
          value={password} // Bind value to the password state
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
