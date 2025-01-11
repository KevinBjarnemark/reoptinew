import { useState } from 'react';
import { BasicForm } from '../../components/forms/basic-form/BasicForm';
import PageSection from '../../components/page/page-section/PageSection';
import { debug } from '../../utils/log';
import { validateCommon } from '../../functions/validation/validate';
import useSubmit from '../../hooks/forms/useSubmit';
import useSimulateLoading from '../../hooks/effects/useSimulateLoading';

const Signup = () => {
    // Toggle dev logs & debugging
    const showDebugging = true;
    // Hooks
    const { submitForm } = useSubmit(showDebugging);
    const { simulateLoading } = useSimulateLoading(showDebugging);
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
    const handleSubmit = async () => {
        await simulateLoading();
        const response = await submitForm({
            validateForm,
            formDataDraft,
            relativeURL: '/users/signup/',
            debugMessages: {
                backendError: 'Sign up failed (backend)',
                frontendError: 'Sign up failed (frontend)',
                successfulBackEndResponse: 'Sign up successful',
            },
        });
        if (response) {
            // Save tokens
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            debug(showDebugging, 'Sign up successful', response);
        }
    };

    return (
        <PageSection title="Sign Up">
            <BasicForm
                submitButtonProps={{
                    text: 'Sign up',
                    onClick: (e) => {
                        e.preventDefault();
                        handleSubmit();
                    },
                }}
            >
                <div className="flex-row-relative align-items-start">
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
                            <BasicForm.Separator />
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

                            <BasicForm.Separator />
                            <BasicForm.Birthdate
                                inputProps={{
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
                            labelHtml={
                                <>
                                    I accept this website&apos;s
                                    <a
                                        style={{
                                            color: '#ffffff',
                                            marginLeft: '10px',
                                        }}
                                        href="/terms-of-service"
                                    >
                                        Terms of Service
                                    </a>
                                </>
                            }
                        />
                        <BasicForm.Checkbox
                            id="privacy-policy"
                            inputProps={{
                                onChange: (e) =>
                                    setPolicyAccepted(e.target.checked),
                            }}
                            labelHtml={
                                <>
                                    I accept this website&apos;s
                                    <a
                                        style={{
                                            color: '#ffffff',
                                            marginLeft: '10px',
                                        }}
                                        href="/privacy-policy"
                                    >
                                        Privacy Policy
                                    </a>
                                </>
                            }
                        />
                    </div>
                </div>
            </BasicForm>
        </PageSection>
    );
};

export default Signup;
