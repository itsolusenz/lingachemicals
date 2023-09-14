import React, { Fragment, useState, useEffect } from 'react';

//import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert, TableBody, Table } from '@mui/material';

function InventoryTab(props) {
  const methods = useFormContext();
  const { control } = methods;
  const [fb, setfb] = useState('');
  const [twitter, settwitter] = useState('');
  const [linkedin, setlinkedin] = useState('');
  const [youtube, setyoutube] = useState('');
  const [insta, setinsta] = useState('');
  return (
    <div>
      <Box fullWidth sx={{ padding: '20px', borderRadius: '6px', border: '1px solid #557191' }}>

        <div className="row col-md-12" >

          <div className="col-md-12 " style={{ paddingBottom: '20px' }}>

          </div>
          <div className="col-md-6" style={{ paddingTop: '10px' }}>

            <TextField
              value={fb}
              onChange={(e) => {
                setfb(e.target.value)
                // , setadd2error('') 
              }}
              fullWidth label="Facebook Url" variant="outlined">


            </TextField>
          </div>
          <div className="col-md-6" style={{ paddingTop: '10px' }}>

            <TextField
              value={twitter}
              onChange={(e) => {
                settwitter(e.target.value)
                // , setadd2error('') 
              }}
              fullWidth label="Twitter url" variant="outlined">


            </TextField>
          </div>
          <div className="col-md-6" style={{ paddingTop: '10px' }}>

            <TextField
              value={linkedin}
              onChange={(e) => {
                setlinkedin(e.target.value)
                // , setadd2error('') 
              }}
              fullWidth label="Linkedin url" variant="outlined">


            </TextField>
          </div>
          <div className="col-md-6" style={{ paddingTop: '10px' }}>

            <TextField
              value={insta}
              onChange={(e) => {
                setinsta(e.target.value)
                // , setadd2error('') 
              }}
              fullWidth label="Instagram url" variant="outlined">


            </TextField>
          </div>
          <div className="col-md-6" style={{ paddingTop: '10px' }}>

            <TextField
              value={youtube}
              onChange={(e) => {
                setyoutube(e.target.value)
                // , setadd2error('') 
              }}
              fullWidth label="Youtube url" variant="outlined">


            </TextField>
          </div>
        </div>

      </Box>
    </div>
  );
}

export default InventoryTab;
