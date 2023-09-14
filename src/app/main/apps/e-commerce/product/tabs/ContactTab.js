//import TextField from '@mui/material/TextField';
import React, { Fragment, useState, useEffect } from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert, TableBody, Table } from '@mui/material';

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
            label="Flat, House no., Building, Company, Apartment *"
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
            label="Area, Street, Sector, Village"
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
            label="Landmark"
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
            label="Street "
            autoFocus
            id="sku"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="City "
            autoFocus
            id="sku"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="postcode"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="PostCode "
            autoFocus
            id="sku"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="Country"
            autoFocus
            id="sku"
            variant="outlined"
            fullWidth
          />
        )}
      />


      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Phone (work)"
            id="quantity"
            variant="outlined"
            type="number"
            fullWidth
          />
        )}
      />
      <Controller
        name="mobile"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Mobile"
            id="sku"
            variant="outlined"
            type="number"
            fullWidth
          />
        )}
      />
      <Controller
        name="website"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Website"
            id="sku"
            variant="outlined"
            type="number"
            fullWidth
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="email"
            id="quantity"
            variant="outlined"
            type="number"
            fullWidth
          />
        )}
      />
      <Controller
        name="phonewhat"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Whatsapp Mobile"
            id="sku"
            variant="outlined"
            type="number"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default ContactTab;
