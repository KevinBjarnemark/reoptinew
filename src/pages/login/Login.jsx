import { useState, useContext } from 'react';
import BasicForm from '../../components/forms/basic-form/BasicForm';
import PageSection from '../../components/page/page-section/PageSection';
import UserContext from '../../context/UserContext';
import BorderSeparator from '@border-separator';
import { debug } from '@debug';

const Login = () => {
    const showDebugging = true;
    const { login } = useContext(UserContext);

    // Form data
    const [formDataDraft, setFormDataDraft] = useState({
        username: '',
        password: '',
    });

    /**
     * Submits the login form data to the backend.
     *
     */
    const handleLogIn = async (e) => {
        e.preventDefault();
        debug('t', showDebugging, 'Clicked the log in button:', formDataDraft);
        await login(formDataDraft);
    };

    return (
        <PageSection title="Log in">
            <BasicForm
                submitButtonProps={{
                    text: 'Log in',
                    onClick: handleLogIn,
                }}
            >
                <div className="flex-row-relative align-items-start">
                    <div className="flex-column-relative">
                        <BasicForm.Border>
                            <BasicForm.Input
                                title="Username"
                                inputProps={{
                                    placeholder: 'Eg,. Joe',
                                    type: 'text',
                                    maxLength: 200,
                                    onChange: (e) => {
                                        setFormDataDraft((prev) => ({
                                            ...prev,
                                            username: e.target.value,
                                        }));
                                    },
                                }}
                            />
                            <BorderSeparator />
                            <BasicForm.Input
                                title="Password"
                                inputProps={{
                                    placeholder: '',
                                    type: 'password',
                                    onChange: (e) => {
                                        setFormDataDraft((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }));
                                    },
                                }}
                            />
                        </BasicForm.Border>
                    </div>
                </div>
            </BasicForm>
        </PageSection>
    );
};

export default Login;
