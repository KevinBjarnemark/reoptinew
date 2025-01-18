import { useContext } from 'react';
import style from './PageDim.module.css';
import PageDimContext from '../../../context/page-dim/PageDimContext';

const PageDim = () => {
    const { dim } = useContext(PageDimContext);
    if (dim) {
        return <div className={`flex-column-fixed ${style.background}`}></div>;
    }
};

export default PageDim;
