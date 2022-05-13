import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './EditableSpan.module.css';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    let [title, setTitle] = useState<string>('');
    let [editMode, setEditMode] = useState<boolean>(false);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode();
        }
    }

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.changeTaskTitle(title);
    }

    return (
        editMode
            ? <TextField
                style={ { width: '100%' } } value={ title }
                onChange={ onChangeHandler }
                onBlur={ activateViewMode }
                onKeyDown={ onKeyPressHandler }
                autoFocus
            />
            : <span
                className={ styles.title }
                onDoubleClick={ activateEditMode }
              >
                {props.title}
              </span>
    );
});
