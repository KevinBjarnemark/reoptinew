import { useRef, useState, useContext } from 'react';
import style from './DeleteAccount.module.css';
import BasicForm from '../../../../components/forms/basic-form/BasicForm';
import BorderSeparator from '@border-separator';
import UserContext from '@user-context';
import AlertContext from '@alert-context';
import GeneralLoadingContext from '@general-loading-context';
import NotificationContext from '@notification-context';
import { validateCommon } from '../../../../functions/validation/validate';
import useSimulateLoading from '@use-simulate-loading';
import useAPI from '@use-api';
import { debug } from '@debug';
import BasicButton from '@basic-button';
import { clearAuthTokens } from '@authentication/accessToken';
import { useNavigate } from 'react-router-dom';
import PopUpContext from '../../../../context/pop-up/PopUpContext';

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
    const { apiRequest } = useAPI(showDebugging);
    const formDataDraft = useRef({
        username: '',
        password: '',
        confirm_password: '',
    });
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
    const { closePopUp } = useContext(PopUpContext);

    /**
     * Checks if the username is available and adds it to the draft
     */
    const prepareForm = async () => {
        // Add username to draft
        if (profile?.username) {
            formDataDraft.current.username = profile.username;
            return true;
        }
        debug(
            'e',
            showDebugging,
            "Couldn't find the user's username:",
            profile,
        );
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
            // Not logged as an error as the errors are directed towards
            // the user
            debug(
                'd',
                showDebugging,
                'Frontend validation failed:',
                errorMessage,
            );
            addAlert(errorMessage, 'Error');
            return false;
        } finally {
            removeLoadingPoint();
        }
    };

    const handleAccountDeletion = async (e) => {
        e.preventDefault();
        if (deleteButtonDisabled) {
            return;
        }

        setDeleteButtonDisabled(true);
        try {
            const formIsReady = await prepareForm();
            const formIsValidated = validateForm();

            // Stop further execution if it's prepared and validated
            if (!formIsReady || !formIsValidated) {
                return;
            }
            await simulateLoading();
            const response = await apiRequest({
                relativeURL: '/users/delete-account/',
                method: 'DELETE',
                authorizationHeader: true,
                body: {
                    password: formDataDraft.current.password,
                },
                debugMessages: {
                    error: 'Error when deleting account',
                    successfulBackEndResponse: 'Account deletion successful',
                },
                uxMessages: {
                    error:
                        'Something went wrong when attempting to delete your ' +
                        'account. Try refreshing your browser.',
                },
            });
            if (response) {
                clearAuthTokens();
                closePopUp();
                debug(
                    's',
                    showDebugging,
                    'Successfully deleted account:',
                    response,
                );
                setIsAuthenticated(false);
                navigate('/');
                window.scrollTo(0, 0);
                addAlert('Your account has been deleted.', 'Done');
            } else {
                debug(
                    'e',
                    showDebugging,
                    "Couldn't delete account:",
                    response,
                );
                await addNotification(false, "Couldn't delete your account.");
            }
        } catch (error) {
            debug(
                'd',
                showDebugging,
                'Something went wrong when attempting to delete ' +
                    'account, errors should already be logged.',
                error,
            );
        } finally {
            setDeleteButtonDisabled(false);
        }
    };

    /* Submit button props */
    const submitButtonProps = {
        text: 'Delete account',
        className: style['delete-button'],
        style: {
            backgroundColor: '#fe5a5a',
            cursor: deleteButtonDisabled ? 'not-allowed' : 'pointer',
        },
        onClick: handleAccountDeletion,
        disabled: deleteButtonDisabled,
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
    const { openPopUp } = useContext(PopUpContext);

    return (
        <BasicButton
            text={'Delete account'}
            buttonProps={{
                className:
                    'flex-column-absolute ' + `${style['delete-button']}`,
                onClick: () => {
                    openPopUp('Confirm password', <FormContent />);
                },
            }}
        />
    );
};

export default DeleteAccount;
