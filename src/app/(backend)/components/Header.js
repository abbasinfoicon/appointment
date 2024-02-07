'use client'
import Loading from '@/app/loading';
import { useGetAllUserQuery } from '@/redux/slices/serviceApi';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

const Header = () => {
    const [cookies, , removeCookie] = useCookies(['access_token']);
    const token = cookies.access_token;
    const router = useRouter();

    const { data = [], isLoading, isFetching, isError } = useGetAllUserQuery(token);
    const user = data.data;

    const [isActive, setIsActive] = useState(false);
    const [openNote, setOpenNote] = useState(false);
    const [showUser, setShowUser] = useState(false);

    if (isError) return <p>An error has occurred!</p>
    if (isLoading) return <Loading />
    if (isFetching) return <p>Fetching...</p>

    const hamburgerToggle = () => {
        setIsActive(!isActive);

        const mainWrapper = document.getElementById("main-wrapper");
        mainWrapper.classList.toggle("menu-toggle");
    }
    const openNotification = () => {
        setOpenNote(!openNote);
        setShowUser(false);
    }
    const openUser = () => {
        setShowUser(!showUser);
        setOpenNote(false);
    }
    const removeCookies = () => {
        removeCookie('access_token');
        removeCookie('refresh_token');
        removeCookie('role');
        removeCookie('user_id');

        router.push("/login");
    }

    return (
        <>
            <div className="nav-header">
                <Link href="/dashboard" className="brand-logo">
                    <img className="logo-abbr" src="/assets/images/logo-white.png" alt="" />
                    <img className="logo-compact" src="/assets/images/logo-text-white.png" alt="" />
                    <img className="brand-title" src="/assets/images/logo-text-white.png" alt="" />
                </Link>

                <div className="nav-control">
                    <div className={`hamburger ${isActive ? 'is-active' : ''}`} onClick={hamburgerToggle}>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                    </div>
                </div>
            </div>

            <div className="header ">
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">
                                <div className="search_bar dropdown d-none">
                                    <span className="search_icon p-3 c-pointer" data-toggle="dropdown">
                                        <i className="mdi mdi-magnify"></i>
                                    </span>
                                    <div className="dropdown-menu p-0 m-0">
                                        <form>
                                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <ul className="navbar-nav header-right align-items-center">
                                <li className={`nav-item dropdown notification_dropdown ${openNote ? 'show' : ''}`}>
                                    <Link className="nav-link bell ai-icon" href="#" onClick={openNotification}>
                                        <i className="icon-bell"></i>
                                        <div className="pulse-css"></div>
                                    </Link>

                                    <div className="dropdown-menu dropdown-menu-right">
                                        <ul className="list-unstyled">
                                            <li className="media dropdown-item">
                                                <span className="success"><i className="ti-user"></i></span>
                                                <div className="media-body">
                                                    <Link href="#">
                                                        <p><strong>Martin</strong> has added a <strong>customer</strong> Successfully
                                                        </p>
                                                    </Link>
                                                </div>
                                                <span className="notify-time">3:20 am</span>
                                            </li>
                                            <li className="media dropdown-item">
                                                <span className="primary"><i className="ti-shopping-cart"></i></span>
                                                <div className="media-body">
                                                    <Link href="#">
                                                        <p><strong>Jennifer</strong> purchased Light Dashboard 2.0.</p>
                                                    </Link>
                                                </div>
                                                <span className="notify-time">3:20 am</span>
                                            </li>
                                            <li className="media dropdown-item">
                                                <span className="danger"><i className="ti-bookmark"></i></span>
                                                <div className="media-body">
                                                    <Link href="#">
                                                        <p><strong>Robin</strong> marked a <strong>ticket</strong> as unsolved.
                                                        </p>
                                                    </Link>
                                                </div>
                                                <span className="notify-time">3:20 am</span>
                                            </li>
                                            <li className="media dropdown-item">
                                                <span className="primary"><i className="ti-heart"></i></span>
                                                <div className="media-body">
                                                    <Link href="#">
                                                        <p><strong>David</strong> purchased Light Dashboard 1.0.</p>
                                                    </Link>
                                                </div>
                                                <span className="notify-time">3:20 am</span>
                                            </li>
                                            <li className="media dropdown-item">
                                                <span className="success"><i className="ti-image"></i></span>
                                                <div className="media-body">
                                                    <Link href="#">
                                                        <p><strong> James.</strong> has added a<strong>customer</strong> Successfully
                                                        </p>
                                                    </Link>
                                                </div>
                                                <span className="notify-time">3:20 am</span>
                                            </li>
                                        </ul>
                                        <Link className="all-notification" href="#">See all notifications <i
                                            className="ti-arrow-right"></i></Link>
                                    </div>
                                </li>
                                <li className={`nav-item dropdown header-profile ${showUser ? 'show' : ''}`}>
                                    <Link className="nav-link text-light" href="#" onClick={openUser}>
                                        {user.first_name} {user.last_name} <img src="/assets/images/profile/admin.jpg" width="20" alt="" />
                                    </Link>

                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link href="/dashboard/profile" className="dropdown-item ai-icon">
                                            <i className="icon-user"></i>
                                            <span className="ml-2">Profile </span>
                                        </Link>
                                        <Link href="#" className="dropdown-item ai-icon">
                                            <i className="icon-envelope-open"></i>
                                            <span className="ml-2">Inbox </span>
                                        </Link>
                                    </div>
                                </li>
                                <li className='logout'>
                                    <button className="logout-btn ai-icon" onClick={removeCookies}>
                                        <i className="icon-logout"></i>
                                        <span className="ml-2">Logout </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Header