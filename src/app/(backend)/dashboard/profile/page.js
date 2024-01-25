"use client"
import Loading from '@/app/loading'
import { useGetAllUserQuery } from '@/redux/slices/serviceApi'
import Link from 'next/link'
import React from 'react'
import { useCookies } from 'react-cookie'

const Profile = () => {
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;
    const { data = [], isLoading, isFetching, isError } = useGetAllUserQuery(token);
    const user = data?.data;
    const role = data?.data?.roles;

    if (token) {
        if (isError) return <p>An error has occurred!</p>
        if (isLoading) return <Loading />
        if (isFetching) return <p>Fetching...</p>
        if (!user) return null;
    } else {
        return <p>No access token available.</p>
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6 p-md-0">
                    <div className="welcome-text">
                        <h4>Hi, {user.first_name} welcome back!</h4>
                        <p className="mb-0">{user.roles}</p>
                    </div>
                </div>

                <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Profile</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="profile">
                        <div className="profile-head">
                            <div className="photo-content">
                                <div className="cover-photo mh-285"></div>
                                <div className="profile-photo">
                                    <img src={user?.image ? user?.image : `/assets/images/profile/${role=='Admin'?'admin':'profile'}.jpg`} className="img-fluid rounded-circle" alt={role} />                                    
                                </div>
                            </div>

                            <div className="profile-info">
                                <div className="row justify-content-center">
                                    <div className="col-xl-8">
                                        <div className="row">
                                            <div className="col-xl-1 col-sm-4 border-right-1 prf-col">
                                                <div className="profile-name">
                                                    <h4 className="text-primary">{user.id}</h4>
                                                    <p>User Id</p>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-sm-4 border-right-1 prf-col">
                                                <div className="profile-name">
                                                    <h4 className="text-primary">{user.first_name} {user.last_name} </h4>
                                                    <p>Name</p>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-sm-4 border-right-1 prf-col">
                                                <div className="profile-email">
                                                    <h4 className="text-muted">{user.email}</h4>
                                                    <p>Email</p>
                                                </div>
                                            </div>

                                            <div className="col-xl-3 col-sm-4 prf-col">
                                                <div className="profile-call">
                                                    <h4 className="text-muted">{user.phone_no}</h4>
                                                    <p>Phone No.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="profile-statistics">
                                <div className="text-center mt-4 border-bottom-1 pb-3">
                                    <div className="row">
                                        <div className="col">
                                            <h3 className="m-b-0">150</h3><span>Follower</span>
                                        </div>
                                        <div className="col">
                                            <h3 className="m-b-0">140</h3><span>Place Stay</span>
                                        </div>
                                        <div className="col">
                                            <h3 className="m-b-0">45</h3><span>Reviews</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <Link href="/dashboard/profile/edit" className="btn btn-primary pl-5 pr-5 mr-3 mb-4">Edit Profile</Link>
                                        <Link href="/dashboard/profile/change-password" className="btn btn-dark pl-5 pr-5 mb-4">Change Password</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="profile-about-me">
                                <div className="pt-4 border-bottom-1 pb-4">
                                    <h4 className="text-primary">About Me</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, sunt vitae suscipit similique necessitatibus inventore illum, ad explicabo aspernatur natus eveniet rem accusantium officia tenetur voluptates at officiis nihil provident!</p>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                                </div>
                            </div>

                            <div className="profile-personal-info">
                                <h4 className="text-primary mb-4">Personal Information</h4>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <h5 className="f-w-500">ID <span className="pull-right">:</span>
                                        </h5>
                                    </div>
                                    <div className="col-9"><span>{user.id}</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <h5 className="f-w-500">Name <span className="pull-right">:</span>
                                        </h5>
                                    </div>
                                    <div className="col-9"><span>{user.first_name} {user.last_name}</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <h5 className="f-w-500">Email <span className="pull-right">:</span>
                                        </h5>
                                    </div>
                                    <div className="col-9"><span>{user.email}</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <h5 className="f-w-500">Location <span className="pull-right">:</span></h5>
                                    </div>
                                    <div className="col-9"><span>{user.address}</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <h5 className="f-w-500">City <span className="pull-right">:</span></h5>
                                    </div>
                                    <div className="col-9"><span>{user.city}</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <h5 className="f-w-500">State <span className="pull-right">:</span>
                                        </h5>
                                    </div>
                                    <div className="col-9"><span>{user.state}</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <h5 className="f-w-500">Gender <span className="pull-right">:</span></h5>
                                    </div>
                                    <div className="col-9"><span>{user.gender}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile