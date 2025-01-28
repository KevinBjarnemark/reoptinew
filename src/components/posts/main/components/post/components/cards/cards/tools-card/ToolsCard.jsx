import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '@c-c/headings/title/Title';
import Subtitle from '@c-c/headings/subtitle/Subtitle';
import ResourceBuilder from '@c-c/builders/resource-builder/ResourceBuilder';

const ToolsCard = (props) => {
    const { post, standalone, editMode } = props;

    return (
        <div
            className={
                `flex-column-absolute ${sharedStyles.post} ` +
                sharedStyles['card-padding']
            }
        >
            <Title title={post.title} standalone={standalone} />
            <Subtitle subtitle="Tools" />
            <ResourceBuilder
                {...{
                    editMode,
                    resource: 'Tool',
                    resources: post.tools,
                }}
            />
        </div>
    );
};

export default ToolsCard;
