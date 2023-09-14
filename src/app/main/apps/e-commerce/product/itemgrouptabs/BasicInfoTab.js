import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import ProductImagesTab from './ProductImagesTab';
function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const tags = {
    "value": [
      {
        "id": "a0bf42ca-c3a5-47be-8341-b9c0bb8ef270",
        "title": "Api"
      },
      {
        "id": "c6058d0d-a4b0-4453-986a-9d249ec230b1",
        "title": "Frontend"
      },
      {
        "id": "d3ef4226-ef2c-43b0-a986-3e3e07f32799",
        "title": "Bug"
      },
      {
        "id": "51483dd3-cb98-4400-9128-4bd66b455807",
        "title": "Backend"
      },
      {
        "id": "91658b8a-f382-4b0c-a53f-e9390351c2c5",
        "title": "Urgent"
      },
      {
        "id": "2b884143-419a-45ca-a7f6-48f99f4e7798",
        "title": "Discuss"
      }
    ]
  };
  return (
    <div>
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
            label="Group Name"
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
            label="Parent Group "
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <h4> Image</h4>
      <ProductImagesTab />

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
            label="Status "
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
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
      />

      <Controller
        name="tags"
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
                placeholder="Select multiple tags"
                label="Tags"
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
