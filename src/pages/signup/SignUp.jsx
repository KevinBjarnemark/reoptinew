
import { useState } from 'react';
import { BasicForm } from '../../components/forms/basic-form/BasicForm';
import PageSection from '../../components/page/page-section/PageSection';
import { debug } from '../../utils/log';
import { backendError } from '../../utils/errorHandling';
  
const SignUp = () => {
    // Toggle dev logs & debugging
    const showDebuging = true;
    const showLogging = true; 

    // Form data
    const formData = new FormData();
    const [formDataDraft, setFormDataDraft] = useState({
        username: "",
        password1: "",
        password2: "",
        birth_date: "",
        image: null,
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const [frontEndError, setFrontEndError] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    /**
     * Validates the form in the frontend by throwing custom errors in order.
     * 
     */
    const validateForm = () => {
        setFrontEndError("");
        // Unicode regex
        const usernameRegex = /^[\w.@+-]+$/;

        // Validate fields (frontend)
        switch(true){
            default: break
            // Username is missing
            case formDataDraft.username.length < 1: {
                throw new Error("Username is missing");
            }
            // Username length
            case formDataDraft.username.length > 150: {
                throw new Error("Username is too long.");
            }
            // Username unicode restrictions (e.g. @)
            case !usernameRegex.test(formDataDraft.username): {
                throw new Error(
                    "Special characters like @, +, and others are not allowed."
                );
            }
            // Password is missing
            case formDataDraft.password1.length < 1: {
                throw new Error("Password is missing.");
            }
            // Password must be a certain length
            case formDataDraft.password1.length < 8: {
                throw new Error("Password must be at least 8 characters.");
            }
            // Passwords must be identical
            case formDataDraft.password1 !== formDataDraft.password2: {
                throw new Error("Passwords must be identical.");
            }
            // Birth date is missing
            case !formDataDraft.birth_date: {
                throw new Error("Birth date is missing.");
            }
            // Birth date cannot be in the future
            case new Date(formDataDraft.birth_date) >= new Date() : {
                throw new Error("Birth date cannot be in the future.");
            }
            // Terms
            case !termsAccepted || !policyAccepted: {
                throw new Error(
                    "You must accept both our terms and privacy policy to continue."
                );
            }
        }
    };

    const handleSubmit = async () => {
        // Validate form (frontend)
        try {
            validateForm()
        }catch (error){
            setFrontEndError(error.message);
            debug(showDebuging, "Frontend validation failed", error.message);
            return;
        }

        // Append form data from draft
        Object.entries(formDataDraft).forEach(([key, value]) => {
            debug(showDebuging, `Appending form data (${key})`, value);
            formData.append(key, value);
        });

        const init = async () => {
            try {
                debug(showLogging, "Image about to be sent", formData.get('image'));
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/users/signup/`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData,
                });

                const jsonResponse = await response.json();
                if (response.ok) {
                    debug(showDebuging, "Sign up successful", jsonResponse);
                    // Save tokens
                    localStorage.setItem("access_token", jsonResponse.access);
                    localStorage.setItem("refresh_token", jsonResponse.refresh);
                    window.location.href = "/"; 
                    return;
                }else {
                    debug(
                        showDebuging, 
                        "Sign up failed (backend)", 
                        backendError(response, jsonResponse)
                    );
                    return;
                    // TODO --> Display backend error alert
                }
            } catch (error) {
                debug(showDebuging, "Sign up failed (frontend)", error);
            }
        };
        await init();
    };

    return (
        <PageSection title="Sign Up">
            <BasicForm
                submitButtonProps={{
                    text: "Sign up",
                    type: "submit",
                    onClick: (e) => {
                        e.preventDefault();
                        handleSubmit();
                    }                    
                }}
            >
                <div className='flex-row-relative align-items-start'>
                    <BasicForm.Image 
                        inputProps={{
                            id: "profile-image",
                            onChange: (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setPreviewImage(URL.createObjectURL(file));
                                    setFormDataDraft(prev => ({
                                        ...prev, 
                                        image: file
                                    }));
                                }
                            }
                        }} 
                        labelText="Click to add a profile image"
                        previewImg={previewImage}
                    />

                    <div className='flex-column-relative'>
                        <BasicForm.Border>
                            <BasicForm.Input 
                                title="Username"
                                inputProps={{
                                    placeholder: "Eg,. Joe",
                                    type: "text",
                                    maxLength: 200,
                                    onChange: (e) => {
                                        setFormDataDraft(prev => ({
                                            ...prev, username: e.target.value
                                        }))
                                    },
                                }} 
                            />
                            <BasicForm.Separator />
                            <BasicForm.Input 
                                title="Password"
                                inputProps={{
                                    placeholder: "",
                                    type: "password",

                                    onChange: (e) => {
                                        setFormDataDraft(prev => ({
                                            ...prev, password1: e.target.value
                                        }))
                                    },
                                }} 
                            />
                            <BasicForm.Separator />
                            <BasicForm.Input
                                title="Confirm password"
                                inputProps={{
                                    placeholder: "",
                                    type: "password",
                                    onChange: (e) => {
                                        setFormDataDraft(prev => ({
                                            ...prev, password2: e.target.value
                                        }))
                                    },
                                }} 
                            />
                            
                            <BasicForm.Separator />
                            <BasicForm.Birthdate 
                                inputProps={{ 
                                    onChange: (e) => {
                                        setFormDataDraft(prev => ({
                                            ...prev, birth_date: e.target.value
                                        }))
                                    }
                                }} 
                            />

                        </BasicForm.Border>
                        
                        {/* Terms and policy */}
                        <BasicForm.Checkbox
                            id="terms-of-service"
                            inputProps={{ 
                                onChange: (e) => setTermsAccepted(e.target.checked) 
                            }}
                            labelHtml={
                                <>
                                    I accept this website&apos;s
                                    <a
                                        style={{
                                            color: "#ffffff",
                                            marginLeft: "10px" 
                                        }}
                                        href='/terms-of-service'>
                                            Terms of Service
                                    </a>
                                </>
                            }
                            
                        />
                        <BasicForm.Checkbox
                            id="privacy-policy"
                            inputProps={{ 
                                onChange: (e) => setPolicyAccepted(e.target.checked) 
                            }}
                            labelHtml={
                                <>
                                    I accept this website&apos;s
                                    <a
                                        style={{
                                            color: "#ffffff",
                                            marginLeft: "10px" 
                                        }}
                                        href='/privacy-policy'>
                                            Privacy Policy
                                    </a>
                                </>
                            }
                        />
                    </div>
                </div>
                <BasicForm.ErrorMessage text={frontEndError} />
            </BasicForm>
        </PageSection>
    );
}

export default SignUp;
