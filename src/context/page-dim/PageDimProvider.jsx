import { useState } from 'react';
import PageDimContext from './PageDimContext';

const PageDimProvider = ({ children }) => {
    const [dim, setDim] = useState(false);

    return (
        <PageDimContext.Provider value={{ dim, setDim }}>
            {children}
        </PageDimContext.Provider>
    );
};

export default PageDimProvider;
