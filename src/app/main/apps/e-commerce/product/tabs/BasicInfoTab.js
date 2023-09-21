import React, { Fragment, useState, useEffect } from 'react';
import clsx from 'clsx';
import { TextField, Box, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import ProductImagesTab from './ProductImagesTab';
import { stubTrue } from 'lodash';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten, styled } from '@mui/material/styles';
import FuseUtils from '@fuse/utils';
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
  const [desc, setdesc] = useState('');
  const [tag, settag] = useState('');
  const [errorcname, seterrorcname] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [imagefile, setimagefile] = useState('');
  const [companylist, setcompanylist] = useState('');
  const [tagarr, settagarr] = useState([]);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  //const images = watch('images');
  useEffect(() => {
    // Perform localStorage action
    const getCompany = async (a) => {

      const response = await fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company&viewtype=listview&id=' + a);
      const json = await response.json();
      console.log('company', json);
      setcompanyname(json[0].name);
      setdesc(json[0].description);
      if (json[0].tag != '') {
        const str = json[0].tag;

        if (str.search(",") > 0) {
          let res = str.split(",");
          // settagarr(str.split(","));
        }
        else {
          // settagarr([`${json[0].tag}`]);
        }
        // settagarr(json[0].tag);
      }

      setCreateObjectURL(json[0].compimage)
      setcompanylist(json);


    }


    if (editid != null && editid != undefined && editid != '' && editid != 'new') {
      getCompany(editid);
    }







  }, [])
  console.log(tagarr, 'ff')
  const SaveProfileimage = (id) => {


    let url = "https://www.laabamone.com/LingaChemicals/api.php"
    const formData = new FormData();
    formData.append('eventtype', 'addprofile_image');
    formData.append('id', id);
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
          window.location.href = "/apps/e-commerce/products/" + id;
        }, 4000)

      })
      .catch((error) => {
        toast.error("Error in Product image updation...");
        setTimeout(function () {
          window.location.href = "/apps/e-commerce/products/" + id;
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
    console.log('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company'
      + str + '&name=' + companyname +
      '&description=' + desc +
      '&tag=' + tag + '&status=1')
    fetch('https://www.laabamone.com/LingaChemicals/api.php?eventtype=company'
      + str + '&name=' + companyname +
      '&description=' + desc +
      '&tag=' + tag + '&status=1'

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
                window.location.href = "/apps/e-commerce/products/" + id;
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
              createObjectURL != '' && <div


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
          options={tagarr}
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
      <ToastContainer style={{ marginTop: '50px' }} />
    </div >
  );
}

export default BasicInfoTab;
