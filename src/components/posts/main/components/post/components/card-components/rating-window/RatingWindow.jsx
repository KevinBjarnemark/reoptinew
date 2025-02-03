import { useContext, useEffect } from 'react';
import style from './RatingWindow.module.css';
import BasicButton from '@basic-button';
// Contexts
import AlertContext from '@alert-context';
import NotificationContext from '@notification-context';
import GeneralLoadingContext from '@general-loading-context';
import PageDimContext from '@page-dim-context';
import RatePostContext from '@rate-post-context';
// Custom hooks
import useAPI from '@use-api';
// Logging
import { debug } from '@debug';
import PostContext from '@post-context';
import { isObject } from '@helpers';

const Title = ({ text }) => {
    return (
        <div
            className={
                'flex-column-relative ' +
                style['text-section-container'] +
                ' ' +
                style['light-gray-background']
            }
        >
            <h6>{text}</h6>
        </div>
    );
};

const Description = ({ text }) => {
    return (
        <div
            className={
                'flex-column-relative ' +
                style['text-section-container'] +
                ' ' +
                style['dark-gray-background'] +
                ' ' +
                style['border-bottom']
            }
        >
            <p>{text}</p>
        </div>
    );
};

const Icon = ({ icon }) => {
    return (
        <div
            className={
                'flex-column-absolute ' + `${style['rating-icon-container']}`
            }
        >
            <i className={icon}></i>
        </div>
    );
};

const Slider = ({ name, min = 0, max = 100, step = 1 }) => {
    const { ratings, setRatings } = useContext(RatePostContext);

    const handleChange = (event) => {
        setRatings((prev) => ({
            ...prev,
            [name]: parseInt(event.target.value),
        }));
    };

    return (
        <div
            className={
                'flex-column-relative ' + `${style['rating-bar-container']}`
            }
        >
            <div className={`flex-column-relative ${style['rating-bar']}`}>
                <input
                    className={
                        'flex-column-relative ' +
                        `${style['rating-bar-filled']}`
                    }
                    style={{ width: '100%' }}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={ratings[name]}
                    onChange={handleChange}
                ></input>
            </div>
        </div>
    );
};

const RatingItem = (props) => {
    const { name, icon, title, description } = props;

    return (
        <div className={'flex-column-relative ' + style['ratings-container']}>
            <Title text={title} />
            <Description text={description} />

            <div className="flex-row-relative w-100">
                <Icon {...{ icon }} />
                <Slider {...{ name }} />
            </div>
        </div>
    );
};

const RatingWindow = () => {
    const showDebugging = true;
    const { setDim } = useContext(PageDimContext);
    const { loadSinglePost, singlePost, updateSinglePost } =
        useContext(PostContext);

    const { show, closeRatingWindow, ratings, postId } =
        useContext(RatePostContext);
    const { addNotification } = useContext(NotificationContext);
    const { addLoadingPoint, removeLoadingPoint } = useContext(
        GeneralLoadingContext,
    );
    // Custom hooks
    const { addAlert } = useContext(AlertContext);
    const { apiRequest } = useAPI(true);

    useEffect(() => {
        if (show) {
            setDim(true);
        } else if (!isObject(singlePost, true)) {
            setDim(false);
        }
    }, [show, singlePost]);

    const handleClose = () => {
        /*  if (!isArray(singlePost, true)) {
            setDim(false);
        } */
        closeRatingWindow();
    };

    const handleSubmit = async () => {
        const init = async () => {
            addLoadingPoint();
            try {
                const response = await apiRequest({
                    authorizationHeader: true,
                    body: ratings,
                    relativeURL: `/posts/ratings/${postId}/`,
                    debugMessages: {
                        error: "Couln't submit rating",
                        successfulBackEndResponse:
                            'Created rating successfully',
                    },
                    uxMessages: {
                        error: "Couldn't submit rating",
                    },
                });

                if (response) {
                    debug(
                        's',
                        showDebugging,
                        'Submitted rating successfully',
                        response,
                    );
                    if (isObject(singlePost, true)) {
                        loadSinglePost(postId);
                    }
                    // Update the post in the feed without triggering a
                    // standalone post
                    updateSinglePost(postId, true);

                    closeRatingWindow();
                    addAlert('Your rating is submitted.', 'Done');
                    await addNotification(true, 'Rating submitted!');
                } else {
                    debug(
                        'e',
                        showDebugging,
                        "Couldn't submit rating (backend):",
                        response,
                    );
                    await addNotification(false, "Couldn't submit rating :(");
                }
            } catch (error) {
                addAlert(
                    'Hmm, something went wrong. Try refreshing your browser.',
                    'Error',
                );
                debug(
                    'e',
                    showDebugging,
                    '(Frontend) Something went wrong when  ' +
                        'submitting a rating',
                    error,
                );
            } finally {
                removeLoadingPoint();
            }
        };

        await init();
    };

    if (show) {
        return (
            <section className={'flex-column-fixed ' + `${style.container}`}>
                <div
                    className={
                        'flex-column-relative ' + `${style['inner-container']}`
                    }
                >
                    <BasicButton
                        text={'X'}
                        buttonProps={{
                            onClick: handleClose,
                            className:
                                'flex-column-fixed ' +
                                `${style['close-button']}`,
                        }}
                    />
                    <div
                        className={
                            'flex-column-relative ' +
                            style['content-container']
                        }
                    >
                        <RatingItem
                            {...{
                                name: 'saves_money',
                                title: 'Cost-effective',
                                description:
                                    'Set this value high if this post saved you money',
                                icon: 'fa-solid fa-dollar-sign',
                            }}
                        />
                        <RatingItem
                            {...{
                                name: 'saves_time',
                                title: 'Time-saving',
                                description:
                                    'Set this slider high if this post saved you time',
                                icon: 'fa-regular fa-clock',
                            }}
                        />
                        <RatingItem
                            {...{
                                name: 'is_useful',
                                title: 'Useful',
                                description:
                                    'Set this slider high if you found this post useful',
                                icon: 'fa-solid fa-hand-fist',
                            }}
                        />
                        <div
                            className={
                                'flex-column-relative ' +
                                style['submit-button-container']
                            }
                        >
                            <button
                                className={
                                    'flex-column-relative ' +
                                    style['submit-button']
                                }
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default RatingWindow;
