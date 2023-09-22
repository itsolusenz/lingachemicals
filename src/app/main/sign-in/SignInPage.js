import React, { Fragment, useState, useEffect } from 'react';
import { IconButton, Alert, Stack, OutlinedInput, InputAdornment, TextField, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import Checkbox from '@mui/material/Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';

import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';

import Paper from '@mui/material/Paper';
import jwtService from '../../auth/services/jwtService';
import M1 from '../../auth/logo1.png';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - must be at least 4 chars.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

function SignInPage() {
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    // setValue('email', 'admin@lingachemicals.com', { shouldDirty: true, shouldValidate: true });
    // setValue('password', 'admin', { shouldDirty: true, shouldValidate: true });
  }, [setValue]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [err, seterr] = React.useState('');
  const [suc, setsuc] = React.useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function onSubmit1(email, password) {
    jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: 'manual',
            message: error.message,
          });
        });
      });
  }
  function onSubmit({ email, password }) {

    console.log('https://www.laabamone.com/LingaChemicals/api.php?eventtype=login&email=' + email
      + '&password=' + password);
    fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=login&email=' + email
      + '&password=' + password
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('yessssssss');
          const id = result[0]['id'];
          const message = result[0]['message'];
          if (id != undefined && message == 'success') {
            const logintype = result[0]['logintype'];
            localStorage.setItem("logintype", logintype);
            localStorage.setItem("loginid", id);
            localStorage.setItem("loginname", result[0]['loginname']);
            localStorage.setItem("loginimage", result[0]['loginimage']);
            onSubmit1('admin@lingachemicals.com', 'admin');
            setsuc('Successfully Logged in');
            seterr('');
          }
          else {
            const errormsg = result[0]['errormsg'];
            setsuc('');
            seterr(errormsg);
            // toast.error(errormsg)
            // setisLoading(false);
          }


          console.log(result);
        },
        (error) => {
          console.log('no');
          console.log(error);
          setsuc('');
          seterr(error);
          //  toast.error("Try again..Data not update..");
          //setisLoading(false);
        }
      );
  }
  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">


          <img className="w-48" src={M1} alt="logo" style={{ width: "110px" }} />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Sign in
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Don't have an account?</Typography>
            <Link className="ml-4" to="/sign-up">
              Sign up
            </Link>
          </div>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack sx={{ width: '100%', marginBottom: '10px' }} spacing={2} >
              {err != '' && <Alert severity="warning">{err}</Alert>}
              {suc != '' && <Alert severity="warning">{suc}</Alert>}
            </Stack>
            <br /><br />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  autoFocus
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    required
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>

              )}
            />
            {/* <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                /> */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Remember me"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />

              <Link className="text-md font-medium" to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Sign in
            </Button>

            {/* <div className="flex items-center mt-32">
              <div className="flex-auto mt-px border-t" />
              <Typography className="mx-8" color="text.secondary">
                Or continue with
              </Typography>
              <div className="flex-auto mt-px border-t" />
            </div> */}

            {/* <div className="flex items-center mt-32 space-x-16">
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:facebook
                </FuseSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:twitter
                </FuseSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:github
                </FuseSvgIcon>
              </Button>
            </div> */}
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: 'primary.main' }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: 'primary.light' }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: 'primary.light' }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Welcome to</div>
            <div>LINGA CHEMICALS®</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            Linga Chemicals is on a global mission to support the back bone of India; Agriculture.
            Our world class and environmental friendly products help the farmers in producing greater yield.
          </div>
          {/* <div className="flex items-center mt-32">
            <AvatarGroup
              sx={{
                '& .MuiAvatar-root': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <Avatar src="assets/images/avatars/female-18.jpg" />
              <Avatar src="assets/images/avatars/female-11.jpg" />
              <Avatar src="assets/images/avatars/male-09.jpg" />
              <Avatar src="assets/images/avatars/male-16.jpg" />
            </AvatarGroup>

            <div className="ml-16 font-medium tracking-tight text-gray-400">
              More than 17k people joined us, it's your turn
            </div>
          </div> */}
        </div>
      </Box>
    </div>
  );
}

export default SignInPage;
