import * as React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import ProductImagesTab from './ProductImagesTab';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function BasicInfoTab(props) {
    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;
    const [age, setAge] = React.useState('');
    // const [contentState, setcontentState] = React.useState({});
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
    const onContentStateChange = (a) => {
        console.log('a', a);
    }
    return (
        <div>
            <Editor
                // editorState={editorState}
                // initialContentState={contentState}
                //toolbarOnFocus
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                // onEditorStateChange={onEditorStateChange}
                onContentStateChange={onContentStateChange}
            />




        </div>
    );
}

export default BasicInfoTab;
