import { useState, useEffect } from 'react';
import GeneralLoadingContext from './GeneralLoadingContext';
import { debug } from '@debug';

const AppLoadingProvider = ({ children }) => {
    // Config
    const showDebugging = false;
    // States
    const [generalLoading, setGeneralLoading] = useState(false);
    const [loadingPoints, setLoadingPoints] = useState([]);

    const addLoadingPoint = () => {
        setLoadingPoints((prev) => [...prev, '.']);
        debug('d', showDebugging, 'Added a loading point.', '');
    };
    const removeLoadingPoint = () => {
        setLoadingPoints((prev) => prev.slice(0, -1));
        debug('d', showDebugging, 'Removed a loading point.', '');
    };

    useEffect(() => {
        if (loadingPoints.length > 0) {
            setGeneralLoading(true);
        } else {
            setGeneralLoading(false);
        }
    }, [loadingPoints]);

    return (
        <GeneralLoadingContext.Provider
            value={{ generalLoading, addLoadingPoint, removeLoadingPoint }}
        >
            {children}
        </GeneralLoadingContext.Provider>
    );
};

export default AppLoadingProvider;
