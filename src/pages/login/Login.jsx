
import { useState, useContext } from 'react';
import { BasicForm } from '../../components/forms/basic-form/BasicForm';
import PageSection from '../../components/page/page-section/PageSection';
import { debug } from '../../utils/log';
import { backendError } from '../../utils/errorHandling';
import { fetchAPI } from '../../utils/fetch';
import UserContext from '../../context/UserContext';
import AlertContext from '../../context/alert-context/AlertContext'; 

const Login = () => {
    const {setIsAuthenticated} = useContext(UserContext);
    const {addAlert} = useContext(AlertContext);
    const showDebugging = true;

    // Form data
    const formData = new FormData();
    const [formDataDraft, setFormDataDraft] = useState({
        username: "",
        password: "",
    });
    const [frontEndError, setFrontEndError] = useState("");

    /**
     * Validates the form in the frontend by throwing custom errors in order.
     * 
     * @throws Errors must be handled by the caller.
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
            case formDataDraft.password.length < 1: {
                throw new Error("Password is missing.");
            }
            // Password must be a certain length
            case formDataDraft.password.length < 8: {
                throw new Error("Password must be at least 8 characters.");
            }
        }
    };

    /**
     * Submits the login form data to the backend. 
     * 
     * This function 
     * 
     * This function also validates the fields before sending
     * to the backend. 
     */
    const handleSubmit = async () => {
        // Validate form before sending to the backend 
        try {
            validateForm()
        }catch (error){
            setFrontEndError(error.message);
            debug(showDebugging, "Frontend validation failed", error.message);
            addAlert(error.message, "Error");
            return;
        }
        // Handle submission
        try {
            // Append form data from draft
            Object.entries(formDataDraft).forEach(([key, value]) => {
                debug(showDebugging, `Appending form data (${key})`, value);
                formData.append(key, value);
            });
            // Send form data to backend
            const response = await fetchAPI("/users/login/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            });

            const jsonResponse = await response.json();
            if (response.ok) {
                debug(showDebugging, "Log in successful", jsonResponse);
                // Save tokens
                localStorage.setItem("access_token", jsonResponse.access);
                localStorage.setItem("refresh_token", jsonResponse.refresh);
                // Mark the user as authenticated
                setIsAuthenticated(true);
                return; // Ensure the function stops here
            }else {
                debug(
                    showDebugging, 
                    "Sign up failed (backend)", 
                    backendError(response, jsonResponse)
                );
                addAlert(jsonResponse.error_message, "Server Error");
                return; // Ensure the function stops here
            }
        } catch (error) {
            debug(showDebugging, "Sign up failed (frontend)", error);
            addAlert("Unexpected error.", "Error");
        }
    };

    return (
        <PageSection title="Log in">
            <BasicForm
                submitButtonProps={{
                    text: "Log in",
                    onClick: (e) => {
                        e.preventDefault();
                        handleSubmit();
                    }                    
                }}
            >
                <div className='flex-row-relative align-items-start'>
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
                                            ...prev, password: e.target.value
                                        }))
                                    },
                                }} 
                            />
                        </BasicForm.Border>
                    </div>
                </div>
            </BasicForm>
        </PageSection>
    );
}

export default Login;
