'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import LoginLogout from './LoginLogout';
import dynamic from "next/dynamic";
import { useCookies } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import ContactData from '../(backend)/dashboard/contact/ContactData';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState(false);
    const pathname = usePathname();
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;
    const role = cookies.role;
    const [dataContact, setDataContact] = useState([]);
    const [dataSocial, setDataSocial] = useState([]);

    useEffect(() => {
        window.onscroll = function () { myFunction() };

        var header = document.getElementById("myHeader");
        var sticky = header.offsetTop;

        function myFunction() {
            if (window.scrollY > sticky) {
                header.classList.add("is-fixed");
            } else {
                header.classList.remove("is-fixed");
            }
        }

        setDataContact(ContactData.contact);
        setDataSocial(ContactData.social);
    }, []);

    const isSpecialitiesPage = pathname.startsWith('/specialities');
    const isBlogPage = pathname.startsWith('/blog');

    return (
        <>
            <header className={pathname.startsWith('/dashboard') ? 'd-none' : 'site-header header header-style-2 mo-left'}>
                <div className="top-bar">
                    <div className="container">
                        <div className="row d-flex justify-content-between">
                            <div className="dez-topbar-left">
                                <ul className="social-line text-center pull-right last_child">
                                    {
                                        dataContact.slice(1).map(item => (
                                            <li key={item.id}><Link href={`${item.name === 'Phone' ? 'tel:' : 'mailto:'}${item.content}`}><i className={`icon-${item.icon}`}></i> <span>{item.content}</span> </Link></li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="dez-topbar-right">
                                <ul className="social-line text-center pull-right">
                                    {
                                        dataSocial.map(item => (
                                            <li key={item.id}><Link href={item.link} className={`fa fa-${item.icon}`} target='_blank'></Link></li>
                                        ))
                                    }

                                    <LoginLogout />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sticky-header  main-bar-wraper navbar-expand-lg" id='myHeader'>
                    <div className="main-bar clearfix ">
                        <div className="container clearfix">
                            <div className="logo-header mostion">
                                <Link href="/"><img src="/assets/images/logo.png" width="193" height="89" alt="" /></Link>
                            </div>
                            <button className={`navbar-toggler collapsed navicon justify-content-end ${menu ? "open" : ""}`} type="button" onClick={() => setMenu(!menu)}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>

                            <div className="extra-nav">
                                <div className="extra-cell">
                                    <button id="quik-search-btn" type="button" className="site-button" onClick={() => setOpen(!open)}><i className="fa fa-search"></i></button>
                                </div>
                            </div>

                            <div className={`dez-quik-search bg-primary ${open ? "open" : ""}`}>
                                <form action="#">
                                    <input name="search" defaultValue="" type="text" className="form-control" placeholder="Type to search" />
                                    <span id="quik-search-remove" onClick={() => setOpen(!open)}><i className="fa fa-remove"></i></span>
                                </form>
                            </div>

                            <div className={`header-nav navbar-collapse collapse justify-content-end ${menu ? "show" : ""}`}>
                                <div className="logo-header mostion"><Link href="/"><img src="/assets/images/logo.png" width="193" height="89" alt="" /></Link></div>
                                <ul className="nav navbar-nav align-items-center">
                                    <li className={pathname === '/' ? 'active' : ''}><Link href="/">Home</Link></li>
                                    <li className={pathname === '/about' ? 'active' : ''}><Link href="/about">About</Link></li>
                                    <li className={isSpecialitiesPage ? 'active' : ''}><Link href="/specialities">Specialities</Link></li>
                                    <li className={pathname === '/facilities' ? 'active' : ''}><Link href="/facilities">Facilities</Link></li>
                                    <li className={isBlogPage ? 'active' : ''}><Link href="/blog">Blog</Link></li>
                                    <li className={pathname === '/gallery' ? 'active' : ''}><Link href="/gallery">Gallery</Link></li>
                                    <li className={pathname === '/contact' ? 'active' : ''}><Link href="/contact">Contact</Link></li>

                                    {role !== "Admin" || role !== "Doctor" ? <li className="btn btn-appointment"><Link href={token ? "/doctor" : "/appointment"}>Appointment</Link></li> : null}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </header >

            <ToastContainer />
        </>
    )
}


export default dynamic(() => Promise.resolve(Header), { ssr: false })