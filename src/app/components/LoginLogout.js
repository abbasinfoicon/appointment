'use client'
import React from 'react';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import { useGetAllUserQuery } from '@/redux/slices/serviceApi';
import Loading from '../loading';

const LoginLogout = () => {
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;
    const { data = [], isLoading, isFetching, isError } = useGetAllUserQuery(token);
    const user = data?.data;
    const role = data?.data?.roles;

    if (token) {
        if (isError) return <p>An error has occurred!</p>
        if (isLoading) return <Loading />
        if (isFetching) return <p>Fetching...</p>

        // Handle 403 Forbidden error
        if (data && data.error && data.error.includes('Invalid token')) {
            // Display a message or redirect to login page
            return <p>Invalid token. Please log in again.</p>
        }
    }

    return (
        cookies.access_token ? (
            <li>
                <Link href={`${role === "Admin" || role === "Doctor" ? '/dashboard' : '/my-account'}`}>
                    <i className='fa fa-user'></i> {user.first_name} {user.last_name}
                </Link>
            </li>
        ) : (
            <li>
                <Link href='/login'>
                    <i className='fa fa-sign-out'></i> Login
                </Link>
            </li>
        )
    )
}

export default LoginLogout