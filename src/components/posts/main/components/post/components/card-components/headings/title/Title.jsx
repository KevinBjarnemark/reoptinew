import { useEffect, useContext, useState } from 'react';
import style from './Title.module.css';
import EditedPostContext from '@edited-post-context';
import AlertContext from '@alert-context';
import { debug } from '@debug';

const Title = ({ title, standalone, editMode }) => {
    const showDebugging = true;
    const { addAlert } = useContext(AlertContext);
    const { editedPost, setEditedPost } = useContext(EditedPostContext);
    const [localTitle, setLocalTitle] = useState('');

    /**
     * Ensures the title is retained when toggling the cards
     */
    useEffect(() => {
        setLocalTitle(editedPost.draft.title);
    }, []);

    const handleChange = (e) => {
        try {
            setEditedPost((prev) => ({
                ...prev,
                draft: { ...prev.draft, title: e.target.value },
            }));
        } catch (error) {
            addAlert(
                'Something went wrong when saving the post title ' +
                    'to draft, try refreshing your browser. Note that ' +
                    'your edits will be erased after a browser refresh.',
                'Error',
            );
            debug(
                'e',
                showDebugging,
                'Error when updating edited post draft (title):',
                error,
            );
        }
    };

    const inputProps = !editMode
        ? {
              disabled: true,
              defaultValue: title,
          }
        : {
              disabled: false,
              defaultValue: editedPost.draft.title,
          };

    const titleStyle = standalone ? { fontSize: '150%' } : {};

    return (
        <input
            key={localTitle}
            className={`flex-column-relative ${style['input']}`}
            onChange={handleChange}
            style={{ ...titleStyle }}
            {...inputProps}
        />
    );
};

export default Title;
