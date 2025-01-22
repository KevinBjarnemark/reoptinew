import { useState, useContext } from 'react';
import style from './Signup.module.css';
import BasicForm from '../../components/forms/basic-form/BasicForm';
import PageSection from '../../components/page/page-section/PageSection';
import { debug } from '@debug';
import { validateCommon } from '../../functions/validation/validate';
import useAPI from '@use-api';
import useSimulateLoading from '@use-simulate-loading';
import NotificationContext from '@notification-context';
import { useNavigate } from 'react-router-dom';
import BorderSeparator from '@border-separator';
import UserContext from '../../context/UserContext';

const Signup = () => {
    // Toggle dev logs & debugging
    const showDebugging = true;
    // Contexts
    const { setIsAuthenticated } = useContext(UserContext);
    const { addNotification } = useContext(NotificationContext);
    // Hooks
    const { apiRequest } = useAPI(showDebugging);
    const { simulateLoading } = useSimulateLoading(showDebugging);
    const navigate = useNavigate();
    // UseStates
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [formDataDraft, setFormDataDraft] = useState({
        username: '',
        password: '',
        confirm_password: '',
        birth_date: '',
        image: null,
    });

    /**
     * Validates common fields and checks if the user agrees to all
     * terms and policies.
     *
     * @throws Errors must be handled by the caller.
     */
    const validateForm = () => {
        // Common fields
        validateCommon(formDataDraft);
        // Terms
        if (!termsAccepted || !policyAccepted) {
            throw new Error(
                'You must accept both our terms and privacy ' +
                    'policy to continue.',
            );
        }
    };

    /**
     * Uses the onSubmit hook to submit the login form data to the
     * backend.
     */
    const handleSignup = async () => {
        await simulateLoading();
        const response = await apiRequest({
            validateForm,
            formDataDraft,
            relativeURL: '/users/signup/',
            debugMessages: {
                error: 'Error when signing up',
                successfulBackEndResponse: 'Sign up successful',
            },
            uxMessages: {
                error: "Couldn't sign you up, try refreshing your browser. ",
            },
        });
        if (response) {
            // Save tokens
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            debug(showDebugging, 'Sign up successful', response);
            await addNotification(true, 'Welcome!');
            setIsAuthenticated(true);
            navigate(`/profile/${formDataDraft.username}`);
            window.scrollTo(0, 0);
        } else {
            await addNotification(false, "Couldn't sign you up :(");
        }
    };

    return (
        <PageSection title="Sign Up">
            <BasicForm
                submitButtonProps={{
                    text: 'Sign up',
                    onClick: (e) => {
                        e.preventDefault();
                        handleSignup();
                    },
                }}
            >
                <div className={style['form-container']}>
                    <BasicForm.Image
                        inputProps={{
                            id: 'profile-image',
                            onChange: (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setPreviewImage(URL.createObjectURL(file));
                                    setFormDataDraft((prev) => ({
                                        ...prev,
                                        image: file,
                                    }));
                                }
                            },
                        }}
                        labelText="Click to add a profile image"
                        previewImg={previewImage}
                    />

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
                            <BorderSeparator />
                            <BasicForm.Input
                                title="Confirm password"
                                inputProps={{
                                    placeholder: '',
                                    type: 'password',
                                    onChange: (e) => {
                                        setFormDataDraft((prev) => ({
                                            ...prev,
                                            confirm_password: e.target.value,
                                        }));
                                    },
                                }}
                            />

                            <BorderSeparator />
                            <BasicForm.Input
                                inputProps={{
                                    type: 'date',
                                    onChange: (e) => {
                                        setFormDataDraft((prev) => ({
                                            ...prev,
                                            birth_date: e.target.value,
                                        }));
                                    },
                                }}
                            />
                        </BasicForm.Border>

                        {/* Terms and policy */}
                        <BasicForm.Checkbox
                            id="terms-of-service"
                            inputProps={{
                                onChange: (e) =>
                                    setTermsAccepted(e.target.checked),
                            }}
                            label={{
                                text: "I accept this website's",
                                link: {
                                    name: 'Terms of Service',
                                    url: '/terms-of-service',
                                },
                            }}
                        />
                        <BasicForm.Checkbox
                            id="privacy-policy"
                            inputProps={{
                                onChange: (e) =>
                                    setPolicyAccepted(e.target.checked),
                            }}
                            label={{
                                text: "I accept this website's",
                                link: {
                                    name: 'Privacy Policy',
                                    url: '/privacy-policy',
                                },
                            }}
                        />
                    </div>
                </div>
            </BasicForm>
        </PageSection>
    );
};

export default Signup;
