import { useState } from 'react';
import EditedPostContext from './EditedPostContext';

const EditedPostProvider = ({ children }) => {
    const [editedPost, setEditedPost] = useState({ data: {}, draft: {} });

    const clearEditedPost = () => {
        setEditedPost({ data: {}, draft: {} });
    };

    return (
        <EditedPostContext.Provider
            value={{
                editedPost,
                setEditedPost,
                clearEditedPost,
            }}
        >
            {children}
        </EditedPostContext.Provider>
    );
};

export default EditedPostProvider;
