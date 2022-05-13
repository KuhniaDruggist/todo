import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import {Button, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    placeholder?: string
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string>('');

    const addItem = () => {
        let addedItem = title.trim();

        if (!addedItem) {
            setError('Field is required!');
            setTitle('');
            return;
        }
        props.addItem(addedItem);
        setTitle('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            if (e.currentTarget.value === ' ') return;
            setError('');
        }
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem();
    }
    const onBlurHandler = () => {
        let addedItem = title.trim();
        if (!addedItem) setTitle('');
        error && setError('');
    }

    return (
        <div>
            <TextField
                size="small"
                variant="outlined"
                value={ title }
                error={ !!error }
                label={ error ? 'Error' : '' }
                helperText={ error }
                onChange={ onChangeHandler }
                onBlur={ onBlurHandler }
                onKeyDown={ onKeyPressHandler }
                placeholder={ props.placeholder }
            />
            <Button
                style={ {
                    minWidth: '30px',
                    marginTop: '5px',
                    marginLeft: '10px',
                    padding: '4px 6px'
                } }
                variant="contained"
                size={ 'small' }
                disableElevation
                onClick={ addItem }
            >
                Add
            </Button>
        </div>
    );
});
