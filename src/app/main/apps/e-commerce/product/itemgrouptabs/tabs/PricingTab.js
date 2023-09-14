//import TextField from '@mui/material/TextField';
import React, { Fragment, useState, useEffect } from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, FormControl, InputAdornment, InputLabel, Select, MenuItem, FormHelperText, Alert, TableBody, Table } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';

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
            label="GST Number"
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
            label="PAN Number"
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
            label="CIN Number"
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
            label="Additional Details "
            autoFocus
            id="sku"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        control={control}
        name="birthday"
        render={({ field }) => (
          <DateTimePicker
            {...field}
            className="mt-8 mb-16 w-full"
            clearable
            showTodayButton
            renderInput={(_props) => (
              <TextField
                {..._props}
                className="mt-32"
                id="birthday"
                label="Incorporation Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FuseSvgIcon size={20}>heroicons-solid:calender</FuseSvgIcon>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        )}
      />

    </div>
  );
}

export default ContactTab;
