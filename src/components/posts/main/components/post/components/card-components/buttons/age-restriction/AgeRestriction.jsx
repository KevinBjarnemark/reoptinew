import { useContext } from 'react';
import style from './AgeRestriction.module.css';
import AlertContext from '@alert-context';
import { isArray } from '@helpers';
import { debug } from '@debug';
import { VALIDATION_RULES } from '@constants';

const AgeRestriction = ({
    harmfulMaterialCategories,
    harmfulToolCategories,
    harmfulPost,
}) => {
    const showDebugging = true;
    const { addAlert } = useContext(AlertContext);

    /**
     * A local function that fires info alerts when a post contain content
     * that may not be safe for children.
     *
     * @param {bool}  name The type of harmful content (eg., Tools or Material)
     * @param {object} contentArray example: [{name: "Chemical Substances"}]
     * @returns {void} Returns any type
     * @throws Errors must be handled by the caller
     */
    const fireAlert = (name, contentArray) => {
        if (isArray(contentArray)) {
            const length = contentArray.length;

            const concatenatedString = contentArray
                .map((i, index) => {
                    if (index === length - 1 && length > 1) {
                        // Add "and" for the last item
                        return `and ${i}`;
                    }
                    // Add all other items normally
                    return i;
                })
                // Join the names with a comma
                .join(', ');

            addAlert(
                `This post may include ${name.toLowerCase()} that are not ` +
                    `safe for children. ${name} such as ` +
                    concatenatedString +
                    '.',
                'Info',
            );
        } else {
            return null;
        }
    };

    const handleClick = () => {
        try {
            if (harmfulPost) {
                addAlert(
                    'The outcome of this post may be dangerous for children.' +
                        '',
                    'Info',
                );
            }
            fireAlert('Materials', harmfulMaterialCategories);
            fireAlert('Tools', harmfulToolCategories);
        } catch (error) {
            debug(
                'e',
                showDebugging,
                'Error when concatenating age-restricted content for a post:',
                error,
            );
            addAlert(
                'Something went wrong when gathering data about ' +
                    'age-restricted content. Since our system failed, this ' +
                    'post may include harmful content for children.',
                'Error',
            );
        }
    };

    if (
        isArray(harmfulMaterialCategories, true) ||
        isArray(harmfulToolCategories, true) ||
        harmfulPost
    ) {
        return (
            <div className={`flex-column-absolute ${style['container']}`}>
                <button onClick={handleClick}>
                    <h3>
                        +{`${VALIDATION_RULES.AGE_RESTRICTED_CONTENT_AGE}`}
                    </h3>
                </button>
            </div>
        );
    }

    return null;
};

export default AgeRestriction;
