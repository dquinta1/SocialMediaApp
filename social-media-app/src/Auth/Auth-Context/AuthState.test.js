import 'regenerator-runtime';
import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import AuthState from './AuthState';
import {
	fireEvent,
	render,
	waitFor,
	screen,
} from '@testing-library/react';
import { afterEach } from 'jest-circus';

// create global test component to contain auth state
const TestComponent = ({ username, password }) => {
	const {
		auth,
		signInWithUsernameAndPassword,
		signUpWithUsernameAndPassword,
		signOut,
	} = useContext(AuthContext);

	const clickToSignIn = () => {
		signInWithUsernameAndPassword(username, password);
	};

	const clickToSignUp = () => {
		signUpWithUsernameAndPassword(username, password);
	};

	const clickToSignOut = () => {
		signOut();
	};

	return (
		<>
			<div data-testid='value'>Logged-in User: {auth.token}</div>
			<button onClick={clickToSignIn}>Sign In</button>
			<button onClick={clickToSignUp}>Sign Up</button>
			<button onClick={clickToSignOut}>Sign Out</button>
		</>
	);
};

describe('Authentication', () => {
	let component;
	afterEach(() => component.unmount());

	it('Should log in a previously registered user ', () => {
		component = render(
			<AuthState>
				<TestComponent username={'Bret'} password={'Kulas Light'} />
			</AuthState>
		);

		// simulate button click to Sign In valid user
		fireEvent.click(screen.getByText('Sign In'));

		// wait until promise resolves
		waitFor(() =>
			expect(signInWithUsernameAndPassword).toHaveBeenCalledTimes(1)
		).then(() => {
			// find value of token after Sign In is pressed
			expect(screen.getByText(/^Logged-in User: /.textContent)).toBe(
				'Logged-in User: true'
			);
		});
	});

	it('Should log out a logged-in user ', () => {
		component = render(
			<AuthState>
				<TestComponent username={'Bret'} password={'Kulas Light'} />
			</AuthState>
		);

		// simulate button click to Sign In valid user
		fireEvent.click(screen.getByText('Sign In'));

		// wait until promise resolves
		waitFor(() =>
			expect(signInWithUsernameAndPassword).toHaveBeenCalledTimes(1)
		).then(() => {
			// find value of token after Sign In is pressed
			expect(screen.getByText(/^Logged-in User: /.textContent)).toBe(
				'Logged-in User: true'
			);
		});

		// simulate button click to logout the current user
		fireEvent.click(screen.getByText('Sign Out'));

		// wait until promise resolves
		waitFor(() => expect(signOut).toHaveBeenCalledTimes(1)).then(() => {
			// find value of token after Sign Out is pressed
			expect(screen.getByText(/^Logged-in User: /.textContent)).toBe(
				'Logged-in User: false'
			);
		});
	});

	it('Should NOT log in an invalid user ', () => {
		component = render(
			<AuthState>
				<TestComponent username={'Brettt'} password={'Kulas Light'} />
			</AuthState>
		);

		// simulate button click to Sign In valid user
		fireEvent.click(screen.getByText('Sign In'));

		// wait until promise resolves
		waitFor(() =>
			expect(signInWithUsernameAndPassword).toHaveBeenCalledTimes(1)
		).then(() => {
			// find value of token after Sign In is pressed
			expect(screen.getByText(/^Logged-in User: /.textContent)).toBe(
				'Logged-in User: false'
			);
		});

		// unmount
		component.unmount();

		// rerender
		component = render(
			<AuthState>
				<TestComponent username={'Bret'} password={'KulasLight'} />
			</AuthState>
		);
		// simulate button click to Sign In valid user
		fireEvent.click(screen.getByText('Sign In'));

		// wait until promise resolves
		waitFor(() =>
			expect(signInWithUsernameAndPassword).toHaveBeenCalledTimes(1)
		).then(() => {
			// find value of token after Sign In is pressed
			expect(screen.getByText(/^Logged-in User: /.textContent)).toBe(
				'Logged-in User: false'
			);
		});

		// unmount component
		component.unmount();

		// rerender
		component = render(
			<AuthState>
				<TestComponent username={'Bretttt'} password={'KulasLight'} />
			</AuthState>
		);
		// simulate button click to Sign In valid user
		fireEvent.click(screen.getByText('Sign In'));

		// wait until promise resolves
		waitFor(() =>
			expect(signInWithUsernameAndPassword).toHaveBeenCalledTimes(1)
		).then(() => {
			// find value of token after Sign In is pressed
			expect(screen.getByText(/^Logged-in User: /.textContent)).toBe(
				'Logged-in User: false'
			);
		});
	});

	// TODO: test Registration (next iteration)
});
