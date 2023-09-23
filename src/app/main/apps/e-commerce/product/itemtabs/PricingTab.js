//import TextField from '@mui/material/TextField';
import React, { Fragment, useState, useEffect } from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, FormControl, InputAdornment, InputLabel, Select, MenuItem, FormHelperText, Alert, TableBody, Table } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import ProductImagesTab from './ProductImagesTab';
function ContactTab(props) {
  const methods = useFormContext();
  const { control } = methods;
  const SaveCompany = (event) => {
    event.preventDefault();
    setisLoading(true);
    let str = '';
    if (editid != null && editid != undefined && editid != '' && editid != 'new') {
      str = "&id=" + editid;
    }
    console.log('https://www.laabamone.com/LingaChemicals/api.php?eventtype=item'
      + str + '&itemparentid=' + itemparentid +
      '&itemid=' + itemid +
      '&itemcode=' + itemcode +
      '&itemname=' + itemname +
      '&itemuom=' + itemuom +
      '&itemsdesc=' + itemsdesc +
      '&itemdesc=' + itemdesc +
      '&compid=' + compid +
      '&tax=' + tax +
      '&hsn=' + hsn + '&status=' + status)
    fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=item'
      + str + '&itemparentid=' + itemparentid +
      '&itemid=' + itemid +
      '&itemcode=' + itemcode +
      '&itemname=' + itemname +
      '&itemuom=' + itemuom +
      '&itemsdesc=' + itemsdesc +
      '&itemdesc=' + itemdesc +
      '&compid=' + compid +
      '&tax=' + tax +
      '&hsn=' + hsn + '&status=' + status

    )

      .then((res) => res.json())
      .then(
        (result) => {
          console.log('yessssssss');
          const id = result[0]['id'];
          const message = result[0]['message'];
          if (id != undefined && message == 'success') {


            if (imagefile.name != null && imagefile.name != '' && imagefile.name != '') {
              SaveProfileimage(id);
            }
            else {
              setisLoading(false);
              if (str != '') {
                toast.success("Successfully Updated");
              }
              else {
                toast.success("Successfully Added");
              }

              setTimeout(function () {
                window.location.href = "/apps/e-commerce/item/" + id;
              }, 4000)
            }

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

      <form className='w-full' onSubmit={SaveCompany}>

        <h4> Image</h4>
        <ProductImagesTab />

      </form>

    </div>
  );
}

export default ContactTab;
