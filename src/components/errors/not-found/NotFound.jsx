import style from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={'flex-column-relative ' + style['container']}>
            <h2>Couln&apos;t not find what you&apos;re looking for....</h2>
            <p>Are you sure you typed in the correct URL?</p>
        </div>
    );
};

export default NotFound;
