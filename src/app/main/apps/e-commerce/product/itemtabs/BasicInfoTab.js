import React, { Fragment, useState, useEffect } from 'react';
import { IconButton, OutlinedInput, InputAdornment, TextField, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { getPickersToolbarTextUtilityClass } from '@mui/x-date-pickers/internals/components/pickersToolbarTextClasses';
import { lighten, styled } from '@mui/material/styles';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import clsx from 'clsx';
import FuseUtils from '@fuse/utils';
import axios from 'axios';
function BasicInfoTab(props) {
  const methods = useFormContext();
  const { editid } = props;
  const { control, formState } = methods;
  const { errors } = formState;
  const [age, setAge] = React.useState('');
  const [companylist, setcompanylist] = useState('');
  const [itemid, setitemid] = useState('');
  const [itemparentid, setitemparentid] = useState('');
  const [itemgrouplist, setitemgrouplist] = useState('');
  const [taxlist, settaxlist] = useState('');
  const [itemcode, setitemcode] = useState('');
  const [itemname, setitemname] = useState('');
  const [itemuom, setitemuom] = useState('');
  const [itemsdesc, setitemsdesc] = useState('');
  const [itemdesc, setitemdesc] = useState('');
  const [compid, setcompid] = useState('');
  const [tax, settax] = useState('');
  const [hsn, sethsn] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [status, setstatus] = useState('');
  const [imagefile, setimagefile] = useState('');
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  useEffect(() => {
    // Perform localStorage action
    const getTax = async () => {

      const response = await fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=tax&viewtype=listview');
      const json = await response.json();
      console.log('company', json);
      if (json[0].count > 0) {
        settaxlist(json);
      }


    }


    const getCompany = async () => {

      const response = await fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company&viewtype=listview');
      const json = await response.json();
      console.log('company', json);
      if (json[0].count > 0) {
        setcompanylist(json);
      }


    }


    const getItemgroup = async () => {

      const response = await fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=itemgroup&viewtype=listview');
      const json = await response.json();
      console.log('company', json);
      if (json[0].count > 0) {
        setitemgrouplist(json);
      }


    }
    const getUsergroup = async (a) => {

      const response = await fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=item&viewtype=listview&id=' + a);
      const json = await response.json();
      console.log('company', json);
      setitemparentid(json[0].itemparentid);
      setitemid(json[0].itemid);
      setitemcode(json[0].itemcode);
      setitemname(json[0].itemname);
      setitemuom(json[0].itemuom);
      setitemsdesc(json[0].itemsdesc);
      setitemdesc(json[0].itemdesc);
      setcompid(json[0].compid);
      settax(json[0].tax);
      sethsn(json[0].hsn);
      setcompid(json[0].compname);
      setstatus(json[0].status);
      setCreateObjectURL(json[0].image)
      /*  setcompanyname(json[0].name);
        setdesc(json[0].desc);
        setemail(json[0].email);
        setpassword(json[0].password);
        setcompid(json[0].usergrp_name);
        setstatus(json[0].status);
        setCreateObjectURL(json[0].image)
        setcompanylist(json);*/


    }


    if (editid != null && editid != undefined && editid != '' && editid != 'new') {
      getUsergroup(editid);
    }
    getItemgroup();
    getCompany();
    getTax();




  }, [])
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },

  ];
  const SaveProfileimage = (id) => {


    let url = "https://www.laabamone.com/LingaChemicals/api.php"
    const formData = new FormData();
    formData.append('eventtype', 'addprofile_image');
    formData.append('id', id);
    formData.append('tablename', 'item');
    formData.append('image', imagefile);
    let config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios.post(url, formData, config)
      .then((response) => {

        console.log('result', response);
        setisLoading(false);
        toast.success("Successfully Added");
        setTimeout(function () {
          window.location.href = "/apps/e-commerce/item/" + id;
        }, 4000)

      })
      .catch((error) => {
        toast.error("Error in Product image updation...");
        setTimeout(function () {
          window.location.href = "/apps/e-commerce/item/" + id;
        }, 4000)
        setisLoading(false);
        console.log({ status: `upload failed ${error}` });
      })

  }
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
  if (itemgrouplist.length > 0 && taxlist.length > 0) {
    return (
      <div>
        <form className='w-full' onSubmit={SaveCompany}>
          <div className='flex space-x-16 mb-16 '>
            <div className='w-full'>
              <Autocomplete

                value={itemid}
                inputValue={itemid}
                onInputChange={(event, newInputValue) => {
                  {
                    // console.log(event, 'event')
                    //alert(event);
                    setitemid(newInputValue);
                  }
                }}
                disablePortal
                // id="combo-box-demo"
                options={itemgrouplist.map((a, b) => a.name)}
                renderInput={(params) =>
                  <TextField {...params}
                    className=""
                    required
                    value={itemid}
                    label="Select Item Group" />}
              />
            </div>
            <div className='w-full'>
              <Autocomplete

                value={itemparentid}
                inputValue={itemparentid}
                onInputChange={(event, newInputValue) => {
                  {
                    // console.log(event, 'event')
                    //alert(event);
                    setitemparentid(newInputValue);
                  }
                }}
                disablePortal
                // id="combo-box-demo"
                options={itemgrouplist.map((a, b) => a.parent_name)}
                renderInput={(params) =>
                  <TextField {...params}
                    className=""
                    required
                    value={itemparentid}
                    label="Select Item Parent Group" />}
              />
            </div>
          </div>



          <TextField
            value={itemcode}
            onChange={(e) => setitemcode(e.target.value)}
            className="mt-8 mb-16"
            required
            label="Code"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />


          <TextField
            value={itemname}
            onChange={(e) => setitemname(e.target.value)}
            className="mt-8 mb-16"

            required

            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />


          <TextField

            className="mt-8 mb-16"
            value={itemuom}
            onChange={(e) => setitemuom(e.target.value)}
            required

            label="UOM"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />









          <TextField
            value={itemsdesc}
            onChange={(e) => setitemsdesc(e.target.value)}
            className="mt-8 mb-16"
            id="description"
            label="Short Description"
            type="text"
            multiline
            rows={3}
            variant="outlined"
            fullWidth
          />

          <h4><br /> Image</h4>
          <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
            <Controller
              name="images"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  component="label"
                  htmlFor="button-file"
                  className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                >
                  <input
                    accept="image/*"
                    className="hidden"
                    id="button-file"
                    type="file"
                    onChange={async (e) => {
                      function readFileAsync() {
                        return new Promise((resolve, reject) => {
                          const file = e.target.files[0];
                          setimagefile(e.target.files[0]);
                          setCreateObjectURL(URL.createObjectURL(e.target.files[0]))
                          if (!file) {
                            return;
                          }
                          const reader = new FileReader();

                          reader.onload = () => {
                            resolve({
                              id: FuseUtils.generateGUID(),
                              url: `data:${file.type};base64,${btoa(reader.result)}`,
                              type: 'image',
                            });
                          };

                          reader.onerror = reject;

                          reader.readAsBinaryString(file);
                        });
                      }

                      const newImage = await readFileAsync();

                      onChange([newImage]);
                    }}
                  />
                  <FuseSvgIcon size={32} color="action">
                    heroicons-outline:upload
                  </FuseSvgIcon>
                </Box>
              )}
            />
            <Controller
              name="featuredImageId"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) =>
                createObjectURL != null && createObjectURL != undefined && createObjectURL != 'null' && createObjectURL != '' && <div


                  role="button"
                  tabIndex={0}
                  className={clsx(
                    'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',

                  )}

                >
                  <FuseSvgIcon className="productImageFeaturedStar">heroicons-solid:star</FuseSvgIcon>
                  <img className="max-w-none w-auto h-full" src={createObjectURL} alt="product" />
                </div>


              }
            />
          </div>


          <br></br>
          <Autocomplete

            value={tax}
            inputValue={tax}
            onInputChange={(event, newInputValue) => {
              {
                // console.log(event, 'event')
                //alert(event);
                settax(newInputValue);
              }
            }}
            disablePortal
            // id="combo-box-demo"
            options={taxlist.map((a, b) => a.name)}
            renderInput={(params) =>
              <TextField {...params}
                className=""
                required
                value={tax}
                label="Select Tax" />}
          /> <br></br>
          <Autocomplete

            value={hsn}
            inputValue={hsn}
            onInputChange={(event, newInputValue) => {
              {
                // console.log(event, 'event')
                //alert(event);
                sethsn(newInputValue);
              }
            }}
            disablePortal
            // id="combo-box-demo"
            options={taxlist.map((a, b) => a.name)}
            renderInput={(params) =>
              <TextField {...params}
                className=""
                required
                value={hsn}
                label="Select HSN" />}
          /> <br></br>
          <Autocomplete

            value={compid}
            inputValue={compid}
            onInputChange={(event, newInputValue) => {
              {
                // console.log(event, 'event')
                //alert(event);
                setcompid(newInputValue);
              }
            }}
            disablePortal
            // id="combo-box-demo"
            options={companylist.map((a, b) => a.name)}
            renderInput={(params) =>
              <TextField {...params}
                className=""
                required
                value={compid}
                label="Select Company" />}
          /><br />
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

        </form>
        <ToastContainer style={{ marginTop: '50px' }} />
      </div>
    );
  }
  else {
    return (<>Loading.</>);
  }
}

export default BasicInfoTab;
