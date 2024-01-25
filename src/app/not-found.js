import React from 'react'
import Banner from './components/Banner'
import Link from 'next/link'

const Custom404 = () => {
    return (
        <>
            <Banner title="Page not found" />

            <div className="container pb-5">
                <div className="section-content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-notfound text-center">
                                <form method="post">
                                    <strong>4<i className="fa fa-frown-o text-primary"></i>4</strong>
                                    <h5 className="m-b20 text-uppercase">Page not found</h5>
                                    <Link href="/" className="site-button "><span>Go to home</span></Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Custom404
