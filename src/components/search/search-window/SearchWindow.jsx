import { useState, useEffect, useContext, useRef } from 'react';
import style from './SearchWindow.module.css';
import PostSearchContext from '@post-search-context';
import { toSnakeCase, snakeToNormal } from '@helpers';
import ScreenContext from '@screen-context';

const BoolItem = ({ inputProps, name, icon = null }) => {
    return (
        <div
            className={
                `flex-row-relative ${style['section-item']} ` + 'no-decoration'
            }
        >
            {icon ? <i className={`flex-column-absolute ${icon}`}></i> : null}
            <h5>{name}</h5>
            <input
                className={'flex-column-absolute ' + style['checkbox']}
                type="checkbox"
                {...inputProps}
            ></input>
        </div>
    );
};
const ButtonItem = ({ props, name, icon = null }) => {
    const { screenWidth } = useContext(ScreenContext);

    return (
        <button
            className={
                `flex-row-relative ${style['section-item']} ` + 'no-decoration'
            }
            {...props}
        >
            {icon && screenWidth > 500 ? (
                <i className={`flex-column-absolute ${icon}`}></i>
            ) : null}
            <h5>{name}</h5>
        </button>
    );
};

const Bools = (props) => {
    const { title, bools, setState } = props;

    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions((prev) => !prev);
    };

    const handleChange = (e, name) => {
        if (e.target.checked) {
            // Add item
            setState((prev) => [...prev, name]);
        } else {
            // Remove item
            setState((prev) => prev.filter((bool) => bool !== name));
        }
    };

    return (
        <>
            <div
                className={
                    'flex-column-absolute ' + style['options-container']
                }
            >
                <h6
                    className={
                        'flex-column-relative ' + style['section-title']
                    }
                >
                    {title}
                </h6>

                <ButtonItem
                    {...{
                        name: showOptions ? 'X' : snakeToNormal(bools[0].name),
                        icon: showOptions ? null : bools[0].icon,
                        props: { onClick: toggleOptions },
                    }}
                />

                <div
                    className={
                        'flex-column-absolute ' +
                        style['options-container-items']
                    }
                >
                    {showOptions ? (
                        <div
                            className={
                                'flex-column-relative ' + style['options']
                            }
                        >
                            {bools.map((bool) => (
                                <BoolItem
                                    key={bool.name}
                                    {...{
                                        name: bool.name,
                                        icon: bool.icon,
                                        inputProps: {
                                            onChange: (e) => {
                                                handleChange(
                                                    e,
                                                    toSnakeCase(bool.name),
                                                );
                                            },
                                        },
                                    }}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

const Options = (props) => {
    const { title, state, setState, options } = props;
    const [showOptions, setShowOptions] = useState(false);
    const [previewIcon, setPreviewIcon] = useState(options[0].icon);

    const toggleOptions = () => {
        setShowOptions((prev) => !prev);
    };

    const handleChange = (name, icon) => {
        setPreviewIcon(icon);
        setState(name);
        toggleOptions();
    };

    return (
        <>
            <div
                className={
                    'flex-column-absolute ' + style['options-container']
                }
            >
                <h6
                    className={
                        'flex-column-relative ' + style['section-title']
                    }
                >
                    {title}
                </h6>

                <ButtonItem
                    {...{
                        name: showOptions ? 'X' : snakeToNormal(state),
                        icon: showOptions ? null : previewIcon,
                        props: { onClick: toggleOptions },
                    }}
                />

                <div className={'flex-column-relative ' + style['options']}>
                    {showOptions ? (
                        <div
                            className={
                                'flex-column-absolute ' + style['options']
                            }
                        >
                            {options.map((option) => (
                                <ButtonItem
                                    key={option.name}
                                    {...{
                                        name: option.name,
                                        icon: option.icon,
                                        props: {
                                            onClick: () => {
                                                handleChange(
                                                    toSnakeCase(option.name),
                                                    option.icon,
                                                );
                                            },
                                        },
                                    }}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

const SearchBar = (props) => {
    const { state, setState, onClick } = props;

    const handleChange = (e) => {
        setState(e.target.value);
    };

    return (
        <div className={'flex-row-relative ' + style['search-bar-container']}>
            <input
                className={'flex-column-absolute ' + style['text-input']}
                name="comment"
                type="text"
                defaultValue={state}
                onChange={handleChange}
            ></input>

            <button
                className={'flex-column-absolute ' + style['search-button']}
                onClick={onClick}
            >
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    );
};

const SearchWindow = () => {
    const {
        showSeachWindow,
        setShowSeachWindow,
        setAlsoSearchIn,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        view,
        setView,
        applyFilter,
    } = useContext(PostSearchContext);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target)
            ) {
                // Toggle search window
                setShowSeachWindow((prev) => !prev);
            }
        };

        // Add event listeners
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };

        // setShowSearchWindow is in itself not a dependency,
        // but since it's imported from context, ES Lint is flagging
        // it as one unnecessarily.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (showSeachWindow) {
        return (
            <section
                ref={containerRef}
                className={'flex-column-fixed ' + style['container']}
            >
                <section
                    className={'flex-row-relative ' + style['top-section']}
                >
                    <div
                        className={'flex-column-relative ' + style['section']}
                    >
                        <Options
                            {...{
                                title: 'Sort by',
                                state: sortBy,
                                setState: setSortBy,
                                options: [
                                    {
                                        name: 'Date',
                                        icon: 'fa-solid fa-calendar-days',
                                    },
                                    {
                                        name: 'Likes',
                                        icon: 'fa-solid fa-heart',
                                    },
                                    {
                                        name: 'Comments',
                                        icon: 'fa-solid fa-comment',
                                    },
                                ],
                            }}
                        />
                    </div>
                    <div
                        className={'flex-column-relative ' + style['section']}
                    >
                        <Options
                            {...{
                                title: 'View',
                                state: view,
                                setState: setView,
                                options: [
                                    {
                                        name: 'Show all posts',
                                        icon: null,
                                    },
                                    {
                                        name: 'Only users you follow',
                                        icon: null,
                                    },
                                ],
                            }}
                        />
                    </div>
                    <div
                        className={'flex-column-relative ' + style['section']}
                    >
                        <Bools
                            {...{
                                setState: setAlsoSearchIn,
                                title: 'Also search in',
                                bools: [
                                    {
                                        name: 'Description',
                                        dbName: 'description',
                                    },
                                    {
                                        name: 'Tags',
                                        dbName: 'tags',
                                    },
                                    {
                                        name: 'Materials',
                                        dbName: 'materials',
                                    },
                                    {
                                        name: 'Tools',
                                        dbName: 'tools',
                                    },
                                ],
                            }}
                        />
                    </div>
                </section>

                <SearchBar
                    {...{
                        state: searchQuery,
                        setState: setSearchQuery,
                        onClick: applyFilter,
                    }}
                />
            </section>
        );
    }
    return null;
};

export default SearchWindow;
