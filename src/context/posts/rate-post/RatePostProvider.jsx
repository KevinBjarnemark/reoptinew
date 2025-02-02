import { useState } from 'react';
import RatePostContext from './RatePostContext';

const RatePostProvider = ({ children }) => {
    const [show, setShow] = useState(false);
    const [postId, setPostId] = useState(false);
    const defaultRatings = {
        saves_money: 0,
        saves_time: 0,
        is_useful: 0,
    };
    const [ratings, setRatings] = useState(defaultRatings);

    const openRatingWindow = (postId, initialRatings) => {
        setPostId(postId);
        setRatings(initialRatings);
        setShow(true);
    };

    const closeRatingWindow = () => {
        setRatings(defaultRatings);
        setPostId(null);
        setShow(false);
    };

    return (
        <RatePostContext.Provider
            value={{
                openRatingWindow,
                closeRatingWindow,
                show,
                ratings,
                setRatings,
                postId,
            }}
        >
            {children}
        </RatePostContext.Provider>
    );
};

export default RatePostProvider;
