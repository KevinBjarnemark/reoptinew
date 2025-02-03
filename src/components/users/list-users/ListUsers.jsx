import { useContext } from 'react';
import PopUpContext from '../../../context/pop-up/PopUpContext';
import style from './ListUsers.module.css';
import { Link } from 'react-router-dom';

const ListUsers = (props) => {
    // Props
    const { users } = props;

    const { closePopUp } = useContext(PopUpContext);

    return (
        <section className={'flex-column-relative ' + style['container']}>
            {users.map((username) => (
                <Link
                    key={username}
                    className={
                        'flex-column-relative no-decoration ' +
                        style['user-item']
                    }
                    to={`profile/${username}`}
                    onClick={closePopUp}
                >
                    <p>{username}</p>
                </Link>
            ))}
        </section>
    );
};

export default ListUsers;
