import React, { Fragment, useState, useEffect } from 'react';

import { TextField, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import ProductImagesTab from './ProductImagesTab';
import { stubTrue } from 'lodash';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [Countrylist, setCountrylist] = useState([]);
  const [companyname, setcompanyname] = useState('');
  const [desc, setdesc] = useState('');
  const [tag, settag] = useState('');
  const [errorcname, seterrorcname] = useState('');
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    // Perform localStorage action


    const getCountry = async (a) => {

      const response = await fetch('https://www.laabamone.com/appoint_api.php?eventtype=countylist');
      const json = await response.json();
      console.log(json);
      setCountrylist(json);


    }


    getCountry();





  }, [])

  const SaveCompany = (event) => {
    event.preventDefault();
    setisLoading(true);
    let str = '';
    fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company'
      + str + '&name=' + companyname +
      '&description=' + desc +
      '&tag=' + tag

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
          value={companyname}
          onChange={(e) => setcompanyname(e.target.value)}
          className="mt-8 mb-16"
          error={!!errorcname}
          required
          helperText={'required'}
          label="Company Name"
          autoFocus
          variant="outlined"
          fullWidth
        />


        <h4>Product Image</h4>
        <ProductImagesTab />

        <TextField
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
          className="mt-8 mb-16"
          id="description"
          label="Description"
          type="text"
          multiline
          rows={5}
          variant="outlined"
          fullWidth
        />


        {/*}  <Controller
        name="categories"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            freeSolo
            options={[]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select multiple categories"
                label="Categories"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />*/}


        <Autocomplete
          className="mt-8 mb-16"
          multiple
          freeSolo
          options={[]}
          value={tag}
          onChange={(event, newValue) => {
            //onChange(newValue);
            settag(newValue);
          }}
          renderInput={(params) => (

            <TextField
              {...params}
              placeholder="Select multiple tags"
              label="Tags"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
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
      <ToastContainer />
    </div >
  );
}

export default BasicInfoTab;
