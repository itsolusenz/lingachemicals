//import TextField from '@mui/material/TextField';
import React, { Fragment, useState, useEffect } from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert, TableBody, Table } from '@mui/material';
import ProductImagesTab from './ProductImagesTab';
function ContactTab(props) {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <div>

      <Controller
        name="sku"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="Unit Value"
            autoFocus
            id="sku"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="sku"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="Sales Price"
            autoFocus
            id="sku"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="landmark"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="MRP"
            autoFocus
            id="sku"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <h4> Image</h4>
      <ProductImagesTab />

    </div>
  );
}

export default ContactTab;
