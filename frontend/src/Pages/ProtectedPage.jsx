import React from 'react';
import useAuth from '../Auth/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedPage({ children }) {
	const { status, error } = useAuth();
	let location = useLocation();

	switch (status) {
		case 'loading':
			return <h1>Loading...</h1>;
		case 'error':
			if (error?.response?.status === 401) {
				return <Navigate to='/login' state={{ from: location }} />;
			} else {
				return <h1>Connection Error</h1>;
			}
		case 'success':
			return children;
	}
}
