import sharedStyle from '@c-shared-style/Shared.module.css';
import Title from '@c-c/headings/title/Title';
import Subtitle from '@c-c/headings/subtitle/Subtitle';
import ResourceBuilder from '@c-c/builders/resource-builder/ResourceBuilder';

const MaterialsCard = (props) => {
    const { post, standalone, editMode } = props;

    return (
        <div
            className={
                `flex-column-absolute ${sharedStyle.post} ` +
                sharedStyle['card-padding']
            }
        >
            <Title {...{ editMode, standalone, title: post.title }} />
            <Subtitle subtitle="Materials" />
            <ResourceBuilder
                {...{
                    editMode,
                    resource: 'Material',
                    resources: post.materials,
                }}
            />
        </div>
    );
};

export default MaterialsCard;
