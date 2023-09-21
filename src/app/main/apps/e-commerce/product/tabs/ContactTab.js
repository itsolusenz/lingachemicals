//import TextField from '@mui/material/TextField';
import React, { Fragment, useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';

import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert, TableBody, Table } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ContactTab(props) {
  const methods = useFormContext();
  const { control } = methods;
  const { editid } = props;
  const [countryerror, setcountryerror] = useState('');
  const [stateerror, setstateerror] = useState('');
  const [cityerror, setcityerror] = useState('');
  const [postcodeerror, setpostcodeerror] = useState('');
  const [add1error, setadd1error] = useState('');
  const [add2error, setadd2error] = useState('');
  const [phoneerror, setphoneerror] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [add1, setadd1] = useState('');
  const [add2, setadd2] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [countryval, setcountryval] = useState('');
  const [postcode, setpostcode] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [website, setwebsite] = useState('');
  const [phonewhat, setphonewhat] = useState('');
  const [phonew, setphonew] = useState('');
  const [landmark, setlandmark] = useState('');
  const [Countrylist, setCountrylist] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [companylist, setcompanylist] = useState('');
  useEffect(() => {
    // Perform localStorage action
    const getCompany = async (a) => {

      const response = await fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company&viewtype=listview&id=' + a);
      const json = await response.json();
      console.log('company', json);
      setadd1(json[0].flat);
      setadd2(json[0].street);
      setcity(json[0].city);
      setstate(json[0].state);
      setcountryval(json[0].countryval);
      setpostcode(json[0].postcode);
      setphonew(json[0].phonew);
      setphone(json[0].mobile);
      setphonewhat(json[0].phonewhat);
      setwebsite(json[0].website);
      setemail(json[0].email);


      setcompanylist(json);


    }
    const getCountry = async (a) => {

      const response = await fetch('https://www.laabamone.com/appoint_api.php?eventtype=countylist');
      const json = await response.json();
      console.log(json);
      setCountrylist(json);


    }

    if (editid != null && editid != undefined && editid != '' && editid != 'new') {
      getCompany(editid);
    }

    getCountry();






  }, [])

  const SaveCompany = (event) => {
    event.preventDefault();
    setisLoading(true);
    let str = '';

    if (editid != null && editid != undefined && editid != '') {
      str = "&id=" + editid;
    }
    console.log('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company'
      + str + '&country=' + countryval +
      '&state=' + state +
      '&city=' + city +
      '&postcode=' + postcode +
      '&flat=' + add1 +
      '&street=' + add2 +
      '&landmark=' + landmark +
      '&mobile=' + phone +
      '&phonew=' + phonew +
      '&phonewhat=' + phonewhat +
      '&website=' + website +
      '&email=' + email +
      '&status=1');
    fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company'
      + str + '&country=' + countryval +
      '&state=' + state +
      '&city=' + city +
      '&postcode=' + postcode +
      '&flat=' + add1 +
      '&street=' + add2 +
      '&landmark=' + landmark +
      '&mobile=' + phone +
      '&phonew=' + phonew +
      '&phonewhat=' + phonewhat +
      '&website=' + website +
      '&email=' + email +
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
          value={add1}
          onChange={(e) => setadd1(e.target.value)}

          className="mt-8 mb-16"
          required
          label="Flat, House no., Building, Company, Apartment *"
          autoFocus
          id="sku"
          variant="outlined"
          fullWidth
        />


        <TextField
          value={add2}
          onChange={(e) => setadd2(e.target.value)}
          className="mt-8 mb-16"
          required
          label="Area, Street, Sector, Village"
          autoFocus
          id="sku"
          variant="outlined"
          fullWidth
        />


        <TextField
          value={landmark}
          onChange={(e) => setlandmark(e.target.value)}
          className="mt-8 mb-16"
          label="Landmark"
          autoFocus
          id="sku"
          variant="outlined"
          fullWidth
        />

        <TextField
          value={state}
          onChange={(e) => setstate(e.target.value)}
          className="mt-8 mb-16"
          required
          label="State "
          autoFocus
          id="sku"
          variant="outlined"
          fullWidth
        />


        <TextField
          value={city}
          onChange={(e) => setcity(e.target.value)}
          className="mt-8 mb-16"
          required
          label="City "
          autoFocus
          id="sku"
          variant="outlined"
          fullWidth
        />


        <TextField
          value={postcode}
          onChange={(e) => setpostcode(e.target.value)}
          className="mt-8 mb-16"
          required
          label="PostCode "
          autoFocus
          id="sku"
          variant="outlined"
          fullWidth
        />

        <Autocomplete
          value={countryval}
          inputValue={countryval}
          onInputChange={(event, newInputValue) => {
            {
              // alert(newInputValue);
              setcountryval(newInputValue);
              setcountryerror('')
            }
          }}
          disablePortal
          id="combo-box-demo"
          options={Countrylist.map((a, b) => a.countries_name)}
          // options={Countrylist}
          //sx={{ width: 300 }}
          renderInput={(params) =>
            <TextField {...params}
              value={countryval}
              error={!!countryerror}
              helperText={countryerror}
              label="Country*" />}
        />





        <TextField
          value={phonew}
          onChange={(e) => setphonew(e.target.value)}
          className="mt-8 mb-16"
          label="Phone (work)"
          id="quantity"
          variant="outlined"
          type="number"
          fullWidth
        />


        <TextField
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          className="mt-8 mb-16"
          label="Mobile"
          id="sku"
          variant="outlined"
          type="number"
          fullWidth
        />


        <TextField
          value={website}
          onChange={(e) => setwebsite(e.target.value)}
          className="mt-8 mb-16"
          label="Website"
          id="sku"
          variant="outlined"
          type="text"
          fullWidth
        />


        <TextField
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="mt-8 mb-16"
          label="email"
          id="quantity"
          variant="outlined"
          type="email"
          fullWidth
        />


        <TextField
          value={phonewhat}
          onChange={(e) => setphonewhat(e.target.value)}
          className="mt-8 mb-16"
          label="Whatsapp Mobile"
          id="sku"
          variant="outlined"
          type="number"
          fullWidth
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
