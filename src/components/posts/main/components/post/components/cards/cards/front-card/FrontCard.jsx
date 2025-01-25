import style from './FrontCard.module.css';
import sharedStyles from '../../../../SharedStyles.module.css';
import Title from '../../../card-components/headings/title/Title';
import Image from '../../../card-components/image/Image';
import EngagementPanel from '../../../card-components/engagement-panel/EngagementPanel';

const FrontCard = ({ post, renderPost, focused }) => {
    return (
        <div className={`flex-row-absolute ${sharedStyles.post}`}>
            <button
                className={
                    'flex-column-relative ' +
                    sharedStyles['card-button'] +
                    ' ' +
                    sharedStyles['card-padding']
                }
                onClick={() => {
                    if (!focused) {
                        renderPost(post.id);
                    }
                }}
            >
                <Title title={post.title} focused={focused} />
                <Image image={{ src: post.image }} />
            </button>
            <EngagementPanel
                savesMoney={0}
                savesTime={0}
                isUseful={0}
                postId={post?.id}
                likes={post?.likes}
                comments={post?.comments?.length}
            />
        </div>
    );
};

export default FrontCard;
