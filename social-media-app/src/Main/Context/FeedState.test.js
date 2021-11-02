import 'regenerator-runtime';
import React, { useContext } from 'react';
import AuthContext from '../../Auth/Auth-Context/AuthContext';
import AuthState from '../../Auth/Auth-Context/AuthState';
import FeedContext from './feed-context';
import FeedState from './FeedState';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';

// simulates an authenticated user in the Auth Context
const MockAuthComponent = ({ username, password }) => {
	const { auth, signInWithUsernameAndPassword } = useContext(AuthContext);

	const clickToSignIn = () => {
		signInWithUsernameAndPassword(username, password);
	};

	return (
		<>
			<div data-testid='value'>Logged-in User: {auth.token}</div>
			<button onClick={clickToSignIn}>Sign In</button>
		</>
	);
};

// create global test component to contain feed state
const TestComponent = ({ follower, followerID, criteria }) => {
	const { user, followers, posts, addFollower, removeFollower, filterPosts } =
		useContext(FeedContext);

	const clickToAddFollower = () => {
		addFollower(follower);
	};

	const clickToRemoveFollower = () => {
		removeFollower(followerID);
	};

	const clickToFilterPosts = () => {
		filterPosts(criteria);
	};

	return (
		<>
			<div data-testid='user'>Logged-in User: {user.username}</div>
			<div data-testid='followers'>Followers: {followers.length}</div>
			<div data-testid='posts'>Posts: {posts.length}</div>
			<button onClick={clickToAddFollower}>Add Follower</button>
			<button onClick={clickToRemoveFollower}>Remove Follower</button>
			<button onClick={clickToFilterPosts}>Filter Posts</button>
		</>
	);
};

describe('Article Actions', () => {
	let component;

    // setup: mount mock component
	beforeAll(() => {
		component = render(
			<AuthState>
				<MockAuthComponent username={'Bret'} password={'Kulas Light'} />
				<FeedState>
					<TestComponent
						follower={{
							id: '2',
							name: 'Ervin Howell',
							headline: 'status',
							src: 'img.png',
						}}
						followerID={2}
						criteria={'Ervin'}
					/>
				</FeedState>
			</AuthState>
		);
	});

    // teardown: unmount mock component
	afterAll(() => component.unmount());

    // Since Profile uses the context from FeedState, this test validates Profile 
    it('Should fetch the logged in user profile username ', () => {
		// wait until user has been loaded
		waitFor(() =>
			expect(updateUser).toHaveBeenCalledTimes(1)
		).then(() => {
			// find username on screen after user is loaded
			expect(screen.getByText(/^Logged-in User: /.textContent)).toBe(
				'Logged-in User: Bret'
			);
		});
	});

	it('Should fetch all articles for current logged in user ', () => {
		// wait until all posts are fetched
		waitFor(() =>
			expect(updatePosts).toHaveBeenCalledTimes(1)
		).then(() => {
			// find length after posts are loaded onto screen
			expect(screen.getByText(/^Posts: /.textContent)).toBe(
				'Posts: 40'
			);
		});
	});

    it('Should remove articles when removing a follower ', () => {
		// simulate button click to Remove a Follower
		fireEvent.click(screen.getByText('Remove Follower'));

		// wait until promise resolves
		waitFor(() =>
			expect(removeFollower).toHaveBeenCalledTimes(1)
		).then(() => {
			// find number of followers after a follower was removed
			expect(screen.getByText(/^Followers: /.textContent)).toBe(
				'Followers: 2'
			);
            // find number of posts after a follower was removed
			expect(screen.getByText(/^Posts: /.textContent)).toBe(
				'Posts: 30'
			);
		});
	});

    it('Should add articles when adding a follower ', () => {
		// simulate button click to Add a new Follower
		fireEvent.click(screen.getByText('Add Follower'));

		// wait until promise resolves
		waitFor(() =>
			expect(addFollower).toHaveBeenCalledTimes(1)
		).then(() => {
			// find number of followers after new follower was added
			expect(screen.getByText(/^Followers: /.textContent)).toBe(
				'Followers: 3'
			);
            // find number of posts after new follower was added
			expect(screen.getByText(/^Posts: /.textContent)).toBe(
				'Posts: 40'
			);
		});
	});

    it('Should fetch subset of articles for current logged in user given search keyword ', () => {
		// simulate button click to filter Posts
		fireEvent.click(screen.getByText('Filter Posts'));

		// wait until promise resolves
		waitFor(() =>
			expect(filterPosts).toHaveBeenCalledTimes(1)
		).then(() => {
            // find number of posts after being filtered on search criteria: 'Ervin'
			expect(screen.getByText(/^Posts: /.textContent)).toBe(
				'Posts: 10'
			);
		});
	});
});

