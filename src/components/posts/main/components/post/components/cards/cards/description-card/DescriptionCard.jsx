import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '@c-c/headings/title/Title';
import Subtitle from '@c-c/headings/subtitle/Subtitle';

const DescriptionCard = ({ post, focused }) => {
    return (
        <div
            className={
                `flex-column-absolute ${sharedStyles.post} ` +
                sharedStyles['card-padding']
            }
        >
            <Title title={post.title} focused={focused} />
            <Subtitle subtitle="Description" />
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
                    value={post.description}
                ></textarea>
            </div>
        </div>
    );
};

export default DescriptionCard;
