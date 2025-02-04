import style from './TermsStyle.module.css';
const PrivacyPolicy = () => {
    return (
        <div className={'flex-column-relative'}>
            <p className={style.p}>
                Welcome to our platform. By accessing or using our services,
                you agree to be bound by the following terms and conditions.
            </p>
            <p className={style.p}>
                By accessing and using this application, you agree to be bound
                by the most up-to-date version of our Privacy Policy. Our
                policies can be found on our website.
            </p>
            <h4 className={style.h4}>Information We Collect</h4>
            <p className={style.p}>
                We collect user-submitted information such as posts, comments,
                and images. Additionally, we use cookies to manage session
                information securely.
            </p>
            <h4 className={style.h4}>Use of Cookies</h4>
            <p className={style.p}>
                Cookies are used in this application to improve security and
                provide a better user experience. Specifically, we use CSRF
                (Cross-Site Request Forgery) tokens to secure user sessions.
                You can manage cookies in your browser settings, though
                disabling cookies may affect app functionality.
            </p>
            <h4 className={style.h4}>Data Storage</h4>
            <p className={style.p}>
                The application integrates with Cloudinary for image storage
                and uses PostgreSQL databases for storing user data in testing,
                development, and production environments. Databases are
                configured to isolate real user data from testing environments
                to protect user information.
                <br />
                <br />
            </p>
            <h4 className={style.h4}>Third-Party Services</h4>
            <p className={style.p}>
                We use Cloudinary for image storage and Heroku for deployment.
                These third-party services may collect additional data as
                outlined in their respective privacy policies.
                <br />
                <br />
            </p>
            <h4 className={style.h4}>Data Deletion</h4>
            <p className={style.p}>
                To delete your data, including posts and comments, please
                delete your account. Posts can be deleted individually by
                opening the edit view.
                <br />
                <br />
                Users may upload a profile image. The only way to remove the
                profile image is by deleting your account, which will
                permanently delete all associated data, including your profile,
                posts, comments, and other contributions.
            </p>
        </div>
    );
};

export default PrivacyPolicy;
