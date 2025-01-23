import style from './ToolsCard.module.css';
import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '../../../card-components/headings/title/Title';
import Subtitle from '../../../card-components/headings/subtitle/Subtitle';

const ToolsCard = ({ post, focused }) => {
    return (
        <div
            className={
                `flex-column-absolute ${sharedStyles.post} ` +
                sharedStyles['card-padding']
            }
        >
            <Title title={post.title} focused={focused} />
            <Subtitle subtitle="Tools" />
            <div
                className={`flex-column-relative ${sharedStyles['text-section']}`}
            >
                <textarea
                    className={`flex-column-relative ${sharedStyles['textarea']}`}
                    disabled
                    value={'TODO'}
                ></textarea>
            </div>
        </div>
    );
};

export default ToolsCard;
