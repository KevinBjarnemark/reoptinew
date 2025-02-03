import { useContext } from 'react';
import style from './Ranks.module.css';
import ListUsers from '../../../../components/users/list-users/ListUsers';
import PopUpContext from '@pop-up-context';

const Ranks = (props) => {
    const showDebugging = true;
    // Props
    const { userProfile } = props;
    const { openPopUp } = useContext(PopUpContext);

    const listFollowers = () => {
        openPopUp(
            'Followers',
            <ListUsers {...{ users: userProfile?.followers }} />,
        );
    };
    const listFollowings = () => {
        openPopUp(
            'Followings',
            <ListUsers {...{ users: userProfile?.following }} />,
        );
    };

    return (
        <section className={'flex-column-relative ' + style['container']}>
            <button
                className="flex-column-relative"
                onClick={() => {
                    listFollowers();
                }}
            >
                Followers {userProfile?.followers?.length || 0}
            </button>
            <button
                className="flex-column-relative"
                onClick={() => {
                    listFollowings();
                }}
            >
                Following {userProfile?.following?.length || 0}
            </button>
        </section>
    );
};

export default Ranks;
