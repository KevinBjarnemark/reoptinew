import { expect, test, describe } from '@jest/globals';
import '@testing-library/jest-dom';
import {
    render,
    act,
    screen,
    within,
    fireEvent,
} from '@testing-library/react';
import { testLogs } from '../src/utils/log';
import { TestApp } from '../src/App';
import Home from '../src/pages/home/Home';
import Login from '../src/pages/login/Login';

// Mock the environment
jest.mock('../env.js', () => ({
    env: {
        VITE_API_URL: 'http://127.0.0.1:8000',
        VITE_API_HOST: '127.0.0.1',
        VITE_API_PORT: 8000,
        MODE: 'development',
    },
}));

describe('App', () => {
    test('ensure app loading screen is visible', async () => {
        await act(async () => {
            render(
                <TestApp>
                    <Home />
                </TestApp>,
            );
        });
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    // 1. Changes the username and password input. This means that
    // the formdata should be updated.
    // 2. Submits the form and checks if the formdata state was
    // updated by validating the debug logs.
    test('login page form', async () => {
        await act(async () => {
            render(
                <TestApp>
                    <Login />
                </TestApp>,
            );
        });

        // Simulate user input for username and password
        const form = screen.getByRole('form');
        const usernameInput = within(form).getByPlaceholderText('Eg,. Joe');
        const passwordInput = within(form).getByPlaceholderText('');
        const [, loginButton] = screen.getAllByText('Log in');

        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: 'testUser' } });
            fireEvent.change(passwordInput, {
                target: { value: 'securePassword' },
            });
        });
        await act(async () => {
            fireEvent.click(loginButton);
        });

        // Check if the user clicked the Log in button
        expect(testLogs).toContain('Clicked the log in button:');
        // Check if the form data state was updated correctly
        expect(testLogs).toContainEqual({
            username: 'testUser',
            password: 'securePassword',
        });
    });
});
