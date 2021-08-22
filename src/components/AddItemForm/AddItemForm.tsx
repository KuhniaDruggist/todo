import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from '../Todolist/Todolist.module.css';

type AddItemFormPropsType = {
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

    const inputItemClass = `${styles.input} ${error ? styles.error : ''}`;

    return (
        <div>
            <input value={title}
                   className={inputItemClass}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button className={styles.button} onClick={addItem}>Add</button>
            <span className={styles.errorMessage}>{error}</span>
        </div>
    );
}