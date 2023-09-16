import * as React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import ProductImagesTab from './ProductImagesTab';
function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },

  ];
  return (
    <div>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Item Group" />}
      /><br></br>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Item Sub Group" />}
      /><br></br>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Brand" />}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Code"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="UOM"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />







      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="description"
            label="Short Description"
            type="text"
            multiline
            rows={3}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <h4>Product Image</h4>
      <ProductImagesTab />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label=" Tax" />}
      />
      <br></br>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="HSN Code" />}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="description"
            label="Description"
            type="text"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Company" />}
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


    </div>
  );
}

export default BasicInfoTab;
