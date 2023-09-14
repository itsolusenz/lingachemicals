import React, { Fragment, useState, useEffect } from 'react';

//import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Button, Modal, Typography, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert, TableBody, Table } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
function InventoryTab(props) {
  const methods = useFormContext();
  const { control } = methods;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Box fullWidth sx={{ padding: '20px', borderRadius: '6px' }}>

        <Button onClick={handleOpen}>Add New</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New Details
            </Typography>

            <Controller
              name="sku"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  required
                  label="Column"
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
                  label="Value"
                  autoFocus
                  id="sku"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              onClick={handleOpen}
              startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:plus</FuseSvgIcon>}
            >
              Add
            </Button>

          </Box>
        </Modal>

      </Box>
    </div>
  );
}

export default InventoryTab;
