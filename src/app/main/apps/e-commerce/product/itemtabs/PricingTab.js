//import TextField from '@mui/material/TextField';
import React, { Fragment, useState, useEffect } from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, FormControl, InputAdornment, InputLabel, Select, MenuItem, FormHelperText, Alert, TableBody, Table } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import ProductImagesTab from './ProductImagesTab';
function ContactTab(props) {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <div>



      <h4> Image</h4>
      <ProductImagesTab />
    </div>
  );
}

export default ContactTab;
