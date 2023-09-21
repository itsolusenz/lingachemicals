import React, { Fragment, useState, useEffect } from 'react';

//import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert, TableBody, Table } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function InventoryTab(props) {
  const methods = useFormContext();
  const { editid } = props;
  const { control } = methods;
  const [fb, setfb] = useState('');
  const [twitter, settwitter] = useState('');
  const [linkedin, setlinkedin] = useState('');
  const [youtube, setyoutube] = useState('');
  const [insta, setinsta] = useState('');
  const [companylist, setcompanylist] = useState('');
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    // Perform localStorage action


    const getCompany = async (a) => {

      const response = await fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company&viewtype=listview&id=' + a);
      const json = await response.json();
      console.log('company', json);
      setfb(json[0].fb);
      settwitter(json[0].twitter);
      setlinkedin(json[0].linkedin);
      setinsta(json[0].insta);
      setyoutube(json[0].youtube);


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
      + str + '&twitter=' + twitter +
      '&fb=' + fb +
      '&linkedin=' + linkedin +
      '&youtube=' + youtube +
      '&insta=' + insta +
      '&status=1');
    fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company'
      + str + '&twitter=' + twitter +
      '&fb=' + fb +
      '&linkedin=' + linkedin +
      '&youtube=' + youtube +
      '&insta=' + insta +
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

      <Box fullWidth sx={{ padding: '20px', borderRadius: '6px', border: '1px solid #557191' }}>
        <form onSubmit={SaveCompany}>
          <div className="row col-md-12" >

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
            <div>
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
          </div>
        </form>
        <ToastContainer style={{ marginTop: '50px' }} />
      </Box>
    </div>
  );
}

export default InventoryTab;
