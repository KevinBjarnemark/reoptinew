import style from './MaterialsCard.module.css';
import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '../../../card-components/headings/title/Title';
import Subtitle from '../../../card-components/headings/subtitle/Subtitle';
import HarmfulContentBanner from '../../../card-components/banners/harmful-content-banner/HarmfulContentBanner';

const MaterialsCard = ({ post, focused }) => {
    return (
        <div
            className={
                `flex-column-absolute ${sharedStyles.post} ` +
                sharedStyles['card-padding']
            }
        >
            <Title title={post.title} focused={focused} />
            <HarmfulContentBanner
                post={post}
                title="Materials"
                data={post?.harmful_materials}
                focused={focused}
            />
            <Subtitle subtitle="Materials" />

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

export default MaterialsCard;
