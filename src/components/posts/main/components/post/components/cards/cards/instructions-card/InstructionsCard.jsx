import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '@c-c/headings/title/Title';
import Subtitle from '@c-c/headings/subtitle/Subtitle';

const InstructionsCard = ({ post, focused }) => {
    return (
        <div
            className={
                `flex-column-absolute ${sharedStyles.post} ` +
                sharedStyles['card-padding']
            }
        >
            <Title title={post.title} focused={focused} />
            <Subtitle subtitle="Instructions" />
            <div
                className={
                    'flex-column-relative ' + sharedStyles['text-section']
                }
            >
                <textarea
                    className={
                        'flex-column-relative ' + sharedStyles['textarea']
                    }
                    disabled
                    value={post.instructions}
                ></textarea>
            </div>
        </div>
    );
};

export default InstructionsCard;
