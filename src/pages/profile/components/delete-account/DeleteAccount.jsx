import { useRef, useState, useContext } from 'react';
import style from './DeleteAccount.module.css';
import BasicForm from '../../../../components/forms/basic-form/BasicForm';
import BorderSeparator from '@border-separator';
import UserContext from '../../../../context/UserContext';
import AlertContext from '../../../../context/alert-context/AlertContext';
import GeneralLoadingContext from '@general-loading-context';
import NotificationContext from '@notification-context';
import { validateCommon } from '../../../../functions/validation/validate';
import useSimulateLoading from '../../../../hooks/effects/useSimulateLoading';
import useSubmit from '../../../../hooks/forms/useSubmit';
import { debug } from '@debug';
import PopUp from '../../../../components/pop-ups/pop-up/PopUp';
import BasicButton from '@basic-button';
import { clearAuthTokens } from '../../../../functions/authentication/accessToken';
import { useNavigate } from 'react-router-dom';

const FormContent = () => {
    const showDebugging = true;
    const { profile, setIsAuthenticated } = useContext(UserContext);
    const { addNotification } = useContext(NotificationContext);
    const { addLoadingPoint, removeLoadingPoint } = useContext(
        GeneralLoadingContext,
    );
    const navigate = useNavigate();
    const { addAlert } = useContext(AlertContext);
    const { simulateLoading } = useSimulateLoading(showDebugging);
    const { submitData } = useSubmit(showDebugging);
    const formDataDraft = useRef({
        username: '',
        password: '',
        confirm_password: '',
    });

    /* Submit button props */
    const submitButtonProps = {
        text: 'Delete account',
        className: style['delete-button'],
        style: {
            backgroundColor: '#fe5a5a',
        },
        onClick: (e) => {
            e.preventDefault();
            handleSubmit();
        },
    };

    /**
     * Checks if the username is available and adds it to the draft
     */
    const prepareForm = async () => {
        // Add username to draft
        if (profile?.username) {
            formDataDraft.current.username = profile.username;
            return true;
        }
        debug(showDebugging, "Couldn't find your username", profile?.username);
        await addNotification(false, "Couldn't find your username.");
        addAlert(
            'An unexpected error occurred, try refreshing the browser.',
            'Error',
        );
        return false;
    };

    /**
     * Validates common fields.
     *
     * @throws Errors must be handled by the caller.
     */
    const validateForm = () => {
        addLoadingPoint();
        try {
            // Validate form before sending to the backend
            validateCommon(formDataDraft.current);
            return true;
        } catch (error) {
            const errorMessage =
                error.message || 'Validation failed. Please try again.';
            debug(showDebugging, 'Frontend validation failed', errorMessage);
            addAlert(errorMessage, 'Error');
            return false;
        } finally {
            removeLoadingPoint();
        }
    };

    /**
     * Uses the onSubmit hook to submit the login form data to the
     * backend.
     */
    const handleSubmit = async () => {
        const formIsReady = await prepareForm();
        const formIsValidated = validateForm();

        // Stop further execution if it's prepared and validated
        if (!formIsReady || !formIsValidated) {
            return;
        }
        await simulateLoading();
        const response = await submitData({
            relativeURL: '/users/delete-account/',
            fetchObject: {
                method: 'DELETE',
                headers: {
                    // eslint-disable-next-line max-len
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: formDataDraft.current.password,
                }),
            },
            debugMessages: {
                backendError: 'Account deletion failed (backend)',
                frontendError: 'Account deletion (frontend)',
                successfulBackEndResponse: 'Account deletion successful',
            },
        });
        if (response) {
            clearAuthTokens();
            await addNotification(true, 'Account deleted.');
            debug(
                showDebugging,
                'Successfully deleted your account',
                response,
            );
            setIsAuthenticated(false);
            navigate('/home');
        } else {
            await addNotification(false, "Couldn't delete your account.");
        }
    };

    return (
        <BasicForm submitButtonProps={{ ...submitButtonProps }}>
            <div className="flex-column-relative">
                <BasicForm.Border>
                    <BasicForm.Input
                        title="Password"
                        inputProps={{
                            placeholder: '',
                            type: 'password',
                            onChange: (e) => {
                                formDataDraft.current.password =
                                    e.target.value;
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
                                formDataDraft.current.confirm_password =
                                    e.target.value;
                            },
                        }}
                    />
                </BasicForm.Border>
            </div>
        </BasicForm>
    );
};

const DeleteAccount = () => {
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleClosePasswordConfirm = () => {
        setShowPasswordConfirm(false);
    };

    return (
        <>
            <BasicButton
                text={'Delete account'}
                buttonProps={{
                    className: `flex-column-absolute ${style['delete-button']}`,
                    onClick: () => {
                        setShowPasswordConfirm(true);
                    },
                }}
            />

            <PopUp
                title={'Confirm password'}
                show={showPasswordConfirm}
                handleClose={handleClosePasswordConfirm}
            >
                <FormContent />
            </PopUp>
        </>
    );
};

export default DeleteAccount;
