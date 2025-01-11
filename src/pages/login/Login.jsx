import { useState, useContext } from 'react';
import { BasicForm } from '../../components/forms/basic-form/BasicForm';
import PageSection from '../../components/page/page-section/PageSection';
import UserContext from '../../context/UserContext';
import useSubmit from '../../hooks/forms/useSubmit';
import { validateCommon } from '../../functions/validation/validate';
import useSimulateLoading from '../../hooks/effects/useSimulateLoading';
import NotificationContext from '@notification-context';

const Login = () => {
    const showDebugging = true;
    const { setIsAuthenticated } = useContext(UserContext);
    const { addNotification } = useContext(NotificationContext);
    const { submitForm } = useSubmit(showDebugging);
    const { simulateLoading } = useSimulateLoading();

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
    const handleSubmit = async () => {
        await simulateLoading();
        const response = await submitForm({
            validateForm,
            formDataDraft,
            relativeURL: '/users/login/',
            debugMessages: {
                backendError: 'Log in failed (backend)',
                frontendError: 'Log in failed (frontend)',
                successfulBackEndResponse: 'Log in successful',
            },
        });
        if (response) {
            // Save tokens
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            // Mark the user as authenticated
            setIsAuthenticated(true);
            await addNotification(true, 'Authenticated!');
        } else {
            await addNotification(false, "Couldn't authenticate");
        }
    };

    return (
        <PageSection title="Log in">
            <BasicForm
                submitButtonProps={{
                    text: 'Log in',
                    onClick: (e) => {
                        e.preventDefault();
                        handleSubmit();
                    },
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
                            <BasicForm.Separator />
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
