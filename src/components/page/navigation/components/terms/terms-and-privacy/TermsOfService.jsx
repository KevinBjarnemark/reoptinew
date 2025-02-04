import style from './TermsStyle.module.css';

const TermsOfService = () => {
    return (
        <div className={'flex-column-relative'}>
            <p className={style.p}>
                Welcome to our platform. By accessing or using our services,
                you agree to be bound by the following terms and conditions.
            </p>
            <p className={style.p}>
                By accessing and using this application, you agree to be bound
                by the most up-to-date version of our Terms of Service. Our
                terms can be found on our website. This application allows
                users to post, share, and interact with posts and comments.
                <br />
                <br />
            </p>
            <h4 className={style.h4}>Use at Your Own Risk</h4>
            <p className={style.p}>
                Users are solely responsible for the content they post,
                including posts and comments. The application does not verify
                the safety of content existing inposts.
                <br />
                <br />
            </p>
            <h4 className={style.h4}>Cloudinary Images</h4>
            <p className={style.p}>
                Images uploaded to the application are hosted through
                Cloudinary. By uploading images, users agree to Cloudinary’s
                terms of use and acknowledge that images may be subject to
                Cloudinary’s policies and practices.
                <br />
                <br />
            </p>
            <h4 className={style.h4}>Comments</h4>
            <p className={style.p}>
                Currently, users cannot delete individual comments. The only
                way to remove comments associated with an account is to delete
                the entire account, or the post itself.
                <br />
                <br />
            </p>
            <h4 className={style.h4}>Account and Account Management</h4>
            <p className={style.p}>
                When creating an account, users are responsible for maintaining
                the security of their accounts.
            </p>
            <h4 className={style.h4}>Liability</h4>
            <p className={style.p}>
                We are not liable for any damages or harm arising from the use
                of this application, including damages due to harmful content
                in posts, use of images, or any issues resulting from user
                interaction.
            </p>
            <h4 className={style.h4}>Account Deletion</h4>
            <p className={style.p}>
                Users may delete their accounts at any time. To prevent
                accidental deletions, users must confirm their request through
                an additional security step. Upon deletion, user data will be
                securely removed from our database.
            </p>
            <h4 className={style.h4}>Content Creation and Management</h4>
            <p className={style.p}>
                Users can create posts containing text and images. Posts must
                comply with our content guidelines and community standards.
                Users retain ownership of their content but grant us a license
                to display and distribute it on our platform.
            </p>
            <h4 className={style.h4}>Post Editing and Deletion</h4>
            <p className={style.p}>
                Users can edit and delete their posts. Deleted posts will be
                permanently removed. To prevent accidental deletions, users
                will be required to confirm their action.
            </p>
            <h4 className={style.h4}>Searching and Filtering</h4>
            <p className={style.p}>
                Users can search for content based on various parameters such
                as title, tags, description, and materials used. Sorting
                options based on creation date, likes, and comments are
                available.
            </p>
            <h4 className={style.h4}>User Engagement</h4>
            <p className={style.p}>
                Users can like, comment on, and rate posts. Ratings are based
                on usefulness, time-saving, and cost-effectiveness.
                Non-authenticated users cannot interact with posts.
            </p>
            <h4 className={style.h4}>Following Users</h4>
            <p className={style.p}>
                Users may follow and unfollow other users. A feed based on
                followed users’ content is available.
            </p>
            <h4 className={style.h4}>Safety and Age Restrictions</h4>
            <p className={style.p}>
                Posts containing potentially harmful content must be marked
                accordingly. Users under 18 will not have access to
                age-restricted posts.
            </p>
        </div>
    );
};

export default TermsOfService;
