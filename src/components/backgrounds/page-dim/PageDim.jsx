import { useContext } from 'react';
import style from './PageDim.module.css';
import PageDimContext from '@page-dim-context';

const PageDim = () => {
    const { dim } = useContext(PageDimContext);
    if (dim) {
        return <div className={`flex-column-fixed ${style.background}`}></div>;
    }
};

export default PageDim;
