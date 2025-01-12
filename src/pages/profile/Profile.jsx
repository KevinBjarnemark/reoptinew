import PageSection from '../../components/page/page-section/PageSection';
import Account from './components/account/Account';

/**
 * The profile page component.
 *
 * @returns {JSX.Element}
 */
const Profile = () => {
    return (
        <PageSection>
            <Account />
        </PageSection>
    );
};

export default Profile;
