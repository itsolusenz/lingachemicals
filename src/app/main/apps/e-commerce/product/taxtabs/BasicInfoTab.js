import React, { Fragment, useState, useEffect } from 'react';
import clsx from 'clsx';
import { IconButton, OutlinedInput, InputAdornment, TextField, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { stubTrue } from 'lodash';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten, styled } from '@mui/material/styles';
import FuseUtils from '@fuse/utils';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
function BasicInfoTab(props) {
  //console.log('editid', props)
  const methods = useFormContext();
  const { editid } = props;
  //console.log('editid', editid)
  const { control, formState, watch } = methods;
  const { errors } = formState;
  const [Countrylist, setCountrylist] = useState([]);
  const [taxname, settaxname] = useState('');
  const [taxper, settaxper] = useState('');
  const [compid, setcompid] = useState('');
  const [errorcname, seterrorcname] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [status, setstatus] = useState('');


  //const images = watch('images');
  useEffect(() => {
    // Perform localStorage action

    const getUsergroup = async (a) => {

      const response = await fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=tax&viewtype=listview&id=' + a);
      const json = await response.json();
      console.log('company', json);
      settaxname(json[0].name);
      settaxper(json[0].taxpercentage);
      setstatus(json[0].status);




    }


    if (editid != null && editid != undefined && editid != '' && editid != 'new') {
      getUsergroup(editid);
    }






  }, [])



  const SaveCompany = (event) => {
    event.preventDefault();
    setisLoading(true);
    let str = '';
    if (editid != null && editid != undefined && editid != '' && editid != 'new') {
      str = "&id=" + editid;
    }
    const loginid = localStorage.getItem("loginid");

    console.log('https://www.laabamone.com/LingaChemicals/api.php?eventtype=tax'
      + str + '&name=' + taxname +
      '&taxpercentage=' + taxper +
      '&userid=' + loginid + '&status=' + status)
    fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=tax'
      + str + '&name=' + taxname +
      '&taxpercentage=' + taxper +
      '&userid=' + loginid + '&status=' + status

    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('success');
          const id = result[0]['id'];
          const message = result[0]['message'];
          if (id != undefined && message == 'success') {



            setisLoading(false);
            if (str != '') {
              toast.success("Successfully Updated");
            }
            else {
              toast.success("Successfully Added");
            }

            setTimeout(function () {
              //  window.location.href = "/apps/e-commerce/usergroup/" + id;
            }, 4000)


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
    <div >

      <form className='w-full' onSubmit={SaveCompany}>
        <div className='flex space-x-16 mb-16 '>

          <div className='w-full'>
            <TextField
              value={taxname}
              onChange={(e) => settaxname(e.target.value)}
              className=""
              required
              label="Tax Name"
              autoFocus
              variant="outlined"
              fullWidth
            /></div>
          <div className='w-full'>
            <TextField
              value={taxper}
              onChange={(e) => settaxper(e.target.value)}
              className=""
              required
              label="Tax Percentage"
              autoFocus
              variant="outlined"
              fullWidth
            />
          </div>
        </div>


        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={(e) => setstatus(e.target.value)}
          >
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={0}>Inactive</MenuItem>

          </Select>
        </FormControl>

        <div>
          <br />
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
        </div>
      </form>
      <ToastContainer style={{ marginTop: '50px' }} />
    </div >
  );

}

export default BasicInfoTab;
