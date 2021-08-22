import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './EditableSpan.module.css';

type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
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
            ? <input value={title}
                     onChange={onChangeHandler}
                     onBlur={activateViewMode}
                     onKeyPress={onKeyPressHandler}
                     autoFocus
            />
            : <span className={styles.title} onDoubleClick={activateEditMode}>{props.title}</span>
    );
}