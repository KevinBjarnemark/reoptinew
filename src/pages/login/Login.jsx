import { useState, useContext } from 'react';
import BasicForm from '../../components/forms/basic-form/BasicForm';
import PageSection from '../../components/page/page-section/PageSection';
import UserContext from '../../context/UserContext';
import useAPI from '@use-api';
import { validateCommon } from '../../functions/validation/validate';
import useSimulateLoading from '@use-simulate-loading';
import NotificationContext from '@notification-context';
import BorderSeparator from '@border-separator';
import { useNavigate } from 'react-router-dom';
import { debug } from '@debug';

const Login = () => {
    const showDebugging = true;
    const { setIsAuthenticated } = useContext(UserContext);
    const { addNotification } = useContext(NotificationContext);
    const { apiRequest } = useAPI(showDebugging);
    const { simulateLoading } = useSimulateLoading();
    const navigate = useNavigate();

    // Form data
    const [formDataDraft, setFormDataDraft] = useState({
        username: '',
        password: '',
    });

    /**
     * Adapter used for inserting the formDataDraft (local state).
     */
    const validateForm = () => {
        validateCommon(formDataDraft);
    };

    /**
     * Submits the login form data to the backend.
     *
     * This function also validates the fields before sending
     * to the backend.
     */
    const handleLogIn = async (e) => {
        e.preventDefault();
        // Used in tests
        debug(showDebugging, 'Clicked the log in button', formDataDraft);
        // Simulated loading effect
        await simulateLoading();
        const response = await apiRequest({
            validateForm,
            formDataDraft,
            relativeURL: '/users/login/',
            debugMessages: {
                error: 'Error when loggin in',
                successfulBackEndResponse: 'Log in successful',
            },
            uxMessages: {
                error: "Couldn't log you in, try refreshing your browser.",
            },
        });
        if (response) {
            // Save tokens
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            // Mark the user as authenticated
            setIsAuthenticated(true);
            navigate('/');
            window.scrollTo(0, 0);
            await addNotification(true, 'Authenticated!');
        } else {
            await addNotification(false, 'Authentication failed.');
        }
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
