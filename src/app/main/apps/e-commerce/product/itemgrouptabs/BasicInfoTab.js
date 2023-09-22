import React, { Fragment, useState, useEffect } from 'react';
import clsx from 'clsx';
import { IconButton, OutlinedInput, InputAdornment, TextField, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import ProductImagesTab from './ProductImagesTab';
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
  const [companyname, setcompanyname] = useState('');
  const [parentname, setparentname] = useState('');
  const [desc, setdesc] = useState('');
  const [compid, setcompid] = useState('');
  const [errorcname, seterrorcname] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [imagefile, setimagefile] = useState('');
  const [companylist, setcompanylist] = useState('');
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [status, setstatus] = useState('');


  //const images = watch('images');
  useEffect(() => {
    // Perform localStorage action

    const getUsergroup = async (a) => {

      const response = await fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=itemgroup&viewtype=listview&id=' + a);
      const json = await response.json();
      console.log('company', json);
      setcompanyname(json[0].name);
      setparentname(json[0].parent_name);
      setdesc(json[0].desc);  
      setstatus(json[0].status);
      setCreateObjectURL(json[0].image)
      setcompanylist(json);


    }


    if (editid != null && editid != undefined && editid != '' && editid != 'new') {
      getUsergroup(editid);
    }







  }, [])

  const SaveProfileimage = (id) => {


    let url = "https://www.laabamone.com/LingaChemicals/api.php"
    const formData = new FormData();
    formData.append('eventtype', 'addprofile_image');
    formData.append('id', id);
    formData.append('tablename', 'itemgroup');
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
          window.location.href = "/apps/e-commerce/itemgroup/" + id;
        }, 4000)

      })
      .catch((error) => {
        toast.error("Error in Product image updation...");
        setTimeout(function () {
          window.location.href = "/apps/e-commerce/itemgroup/" + id;
        }, 4000)
        setisLoading(false);
        console.log({ status: `upload failed ${error}` });
      })

  }

  const SaveCompany = async (event) => {
    event.preventDefault();
    setisLoading(true);
    let str = '';
    if (editid != null && editid != undefined && editid != '' && editid != 'new') {
      str = "&id=" + editid;
    }
    // const logtype = localStorage.getitem("logintype");
    const logid = await localStorage.getItem("loginid");

    console.log('https://www.laabamone.com/LingaChemicals/api.php?eventtype=itemgroup'
      + str + '&name=' + companyname + '&parent_name=' + parentname +
      '&desc=' + desc +
      '&user_id=' + logid + '&status=' + status)
    fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=itemgroup'
      + str + '&name=' + companyname + '&parent_name=' + parentname +
      '&desc=' + desc +
      '&user_id=' + logid + '&status=' + status

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
                //  window.location.href = "/apps/e-commerce/usergroup/" + id;
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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <div >

      <form className='w-full' onSubmit={SaveCompany}>
        <div className='flex space-x-16 mb-16 '>


          <div className='w-full'>
            <TextField
              value={companyname}
              onChange={(e) => setcompanyname(e.target.value)}
              className=""
              required
              label="Item Group Name"
              autoFocus
              variant="outlined"
              fullWidth
            /></div>
          <div className='w-full'>
            <TextField
              value={parentname}
              onChange={(e) => setparentname(e.target.value)}
              className=""
              required
              label="Item Group Parent Name"
              autoFocus
              variant="outlined"
              fullWidth
            /></div>
        </div>


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
