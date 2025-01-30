import { useContext } from 'react';
import sharedStyles from '../../../../SharedStyles.module.css';
import checkboxBuilderStyle from '@c-builder/CheckboxBuilder.module.css';
import Title from '@c-c/headings/title/Title';
import Subtitle from '@c-c/headings/subtitle/Subtitle';
import CheckboxBuilder from '@c-builder/CheckboxBuilder';
import {
    HARMFUL_TOOL_CATEGORIES,
    HARMFUL_MATERIAL_CATEGORIES,
} from '@constants';
import EditedPostContext from '@edited-post-context';

const SafetyCard = (props) => {
    const { post, standalone, editMode } = props;
    const { editedPost, setEditedPost } = useContext(EditedPostContext);

    const handleDangerousOutcome = (e) => {
        setEditedPost((prev) => ({
            // Spread previous values
            ...prev,
            // Target the draft
            draft: {
                ...prev.draft,
                harmful_post: e.target.checked ? true : false,
            },
        }));
    };

    return (
        <div
            className={
                `flex-column-absolute ${sharedStyles.post} ` +
                sharedStyles['card-padding']
            }
        >
            <Title {...{ editMode, standalone, title: post.title }} />
            <Subtitle subtitle="Safety" />

            <h6 className="mt-4 text-center w-100">Dangerous outcome</h6>
            <p>
                Please check the box below if the outcome of this post could be
                directly or indirectly dangerous for children, even if the
                materials and tools are considered safe.
            </p>
            <div
                className={`flex-row-relative ${checkboxBuilderStyle['item']}`}
            >
                <label
                    className={
                        'flex-column-relative ' + checkboxBuilderStyle['label']
                    }
                    htmlFor="dangerous-outcome"
                >
                    The outcome of this post may be dangerous for children
                </label>
                <div
                    className={
                        'flex-column-absolute ' +
                        checkboxBuilderStyle['checkbox-container']
                    }
                >
                    <input
                        className={
                            'flex-column-relative ' +
                            checkboxBuilderStyle['checkbox']
                        }
                        id="dangerous-outcome"
                        type="checkbox"
                        defaultChecked={editedPost.draft.harmful_post}
                        onChange={handleDangerousOutcome}
                    ></input>
                </div>
            </div>

            <CheckboxBuilder
                {...{
                    editMode,
                    entry: 'harmful_material_categories',
                    title: 'Harmful Material Categories',
                    description:
                        'If your post includes any of the following ' +
                        'harmful material categories, please enable ' +
                        'those boxes.',
                    choicesArray: HARMFUL_MATERIAL_CATEGORIES,
                }}
            />
            <CheckboxBuilder
                {...{
                    editMode,
                    entry: 'harmful_tool_categories',
                    title: 'Harmful Tool Categories',
                    description:
                        'If your post includes any of the following ' +
                        'harmful tool categories, please enable those boxes.',
                    choicesArray: HARMFUL_TOOL_CATEGORIES,
                }}
            />
        </div>
    );
};

export default SafetyCard;
