import { useState, useContext } from 'react';
import { BasicForm } from '../../components/forms/basic-form/BasicForm';
import PageSection from '../../components/page/page-section/PageSection';
import UserContext from '../../context/UserContext';
import useSubmit from '../../hooks/forms/useSubmit';

const Login = () => {
    const showDebugging = true;
    const { setIsAuthenticated } = useContext(UserContext);
    const { submitForm } = useSubmit(showDebugging);

    // Form data
    const [formDataDraft, setFormDataDraft] = useState({
        username: '',
        password: '',
    });

    /**
     * Validates the form in the frontend by throwing custom errors in order.
     *
     * @throws Errors must be handled by the caller.
     */
    const validateForm = () => {
        // Unicode regex
        const usernameRegex = /^[\w.@+-]+$/;

        // Validate fields (frontend)
        switch (true) {
            default:
                break;
            // Username is missing
            case formDataDraft.username.length < 1: {
                throw new Error('Username is missing');
            }
            // Username length
            case formDataDraft.username.length > 150: {
                throw new Error('Username is too long.');
            }
            // Username unicode restrictions (e.g. @)
            case !usernameRegex.test(formDataDraft.username): {
                throw new Error(
                    'Special characters like @, +, and ' +
                        'others are not allowed.',
                );
            }
            // Password is missing
            case formDataDraft.password.length < 1: {
                throw new Error('Password is missing.');
            }
            // Password must be a certain length
            case formDataDraft.password.length < 8: {
                throw new Error('Password must be at least 8 characters.');
            }
        }
    };

    /**
     * Submits the login form data to the backend.
     *
     * This function also validates the fields before sending
     * to the backend.
     */
    const handleSubmit = async () => {
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
