import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    placeholder?: string
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string>('');

    const addItem = () => {
        if (!title) {
            setError('Field is required!');
            return;
        }
        props.addItem(title.trim());
        setTitle('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error && e.key === ' ') {
            return;
        }

        error && setError('');

        if (e.key === 'Enter') {
            addItem();
        }
    }

    return (
        <div>
            <TextField
                size="small"
                variant="outlined"
                value={title}
                error={!!error}
                label={error ? 'Error' : ''}
                helperText={error}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                placeholder={props.placeholder}
            />
            <Button style={{
                minWidth: '30px',
                marginTop: '5px',
                marginLeft: '10px',
                padding: '4px 6px'
            }} variant="contained"
                    size={'small'}
                    disableElevation
                    onClick={addItem}>Add
            </Button>
        </div>
    );
}