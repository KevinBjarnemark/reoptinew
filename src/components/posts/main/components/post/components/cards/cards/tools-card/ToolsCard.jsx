import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '../../../card-components/headings/title/Title';
import Subtitle from '../../../card-components/headings/subtitle/Subtitle';
import ResourceBuilder from '../../../card-components/builders/resource-builder/ResourceBuilder';

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
            <ResourceBuilder resources={post?.tools} />
        </div>
    );
};

export default ToolsCard;
