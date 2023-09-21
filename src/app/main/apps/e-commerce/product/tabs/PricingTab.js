//import TextField from '@mui/material/TextField';
import React, { Fragment, useState, useEffect } from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, Button, FormControl, InputAdornment, InputLabel, Select, MenuItem, FormHelperText, Alert, TableBody, Table } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ContactTab(props) {
  const methods = useFormContext();
  const { control } = methods;
  const { editid } = props;
  const [companylist, setcompanylist] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [pan, setpan] = useState('');
  const [gst, setgst] = useState('');
  const [cin, setcin] = useState('');
  const [additonal, setadditonal] = useState('');
  useEffect(() => {
    // Perform localStorage action

    const getCompany = async (a) => {

      const response = await fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company&viewtype=listview&id=' + a);
      const json = await response.json();
      console.log('company', json);
      setpan(json[0].pan_no);
      setgst(json[0].gst_no);
      setcin(json[0].in_no);
      setadditonal(json[0].addi_details);



    }

    if (editid != null && editid != undefined && editid != '' && editid != 'new') {
      getCompany(editid);
    }








  }, [])

  const SaveCompany = (event) => {
    event.preventDefault();
    setisLoading(true);
    let str = '';

    if (editid != null && editid != undefined && editid != '') {
      str = "&id=" + editid;
    }
    console.log('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company'
      + str + '&pan_no=' + pan +
      '&gst_no=' + gst +
      '&cin_no=' + cin +
      '&addi_details=' + additonal +
      '&status=1');
    fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company'
      + str + '&pan_no=' + pan +
      '&gst_no=' + gst +
      '&cin_no=' + cin +
      '&addi_details=' + additonal +
      '&status=1'
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('yessssssss');
          const id = result[0]['id'];
          const message = result[0]['message'];
          if (id != undefined && message == 'success') {

            setisLoading(false);
            toast.success("Successfully Added");
          }
          else {
            const errormsg = result[0]['errormsg'];
            toast.error(errormsg)
            setisLoading(false);
          }


          console.log(result);
        },
        (error) => {
          console.log('no');
          console.log(error);
          toast.error("Try again..Data not update..");
          setisLoading(false);
        }
      );
  }






  return (
    <div>

      <form onSubmit={SaveCompany}>
        <TextField
          value={gst}
          onChange={(e) => setgst(e.target.value)}
          className="mt-8 mb-16"
          required
          label="GST Number"
          autoFocus
          id="sku"
          variant="outlined"
          fullWidth
        />


        <TextField
          value={pan}
          onChange={(e) => setpan(e.target.value)}
          className="mt-8 mb-16"
          required
          label="PAN Number"
          autoFocus
          id="sku"
          variant="outlined"
          fullWidth
        />


        <TextField
          value={cin}
          onChange={(e) => setcin(e.target.value)}
          className="mt-8 mb-16"
          required
          label="CIN Number"
          autoFocus
          id="sku"
          variant="outlined"
          fullWidth
        />


        <TextField
          value={additonal}
          onChange={(e) => setadditonal(e.target.value)}
          className="mt-8 mb-16"
          required
          label="Additional Details "
          autoFocus
          id="sku"
          variant="outlined"
          fullWidth
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

        {isLoading ?

          <div style={{ border: '1px solid blue', width: '12%', borderRadius: '20px', paddingLeft: '6px' }} className="whitespace-nowrap mx-4"
          >

            <img src="/buttonload3.gif" style={{ height: '35px' }}></img>
          </div>
          :
          <Button type="submit"
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
          // onClick={handleRemoveProduct}

          >
            Submit
          </Button>

        }
      </form>
      <ToastContainer style={{ marginTop: '50px' }} />
    </div>
  );
}

export default ContactTab;
