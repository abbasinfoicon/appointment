import Link from 'next/link'
import React from 'react'

const Banner = ({ img, title, parents, banner }) => {
    return (
        <>
            {
                img ? <div className="dez-bnr-inr overlay-black-middle img" style={{ backgroundImage: `url(/assets/images/banner/${img})` }}>
                    <div className="container">
                        <div className="dez-bnr-inr-entry">
                            <h1 className="text-white">{title}</h1>
                        </div>
                    </div>
                </div> : null
            }

            {
                banner ? <div className="dez-bnr-inr overlay-black-middle banner" style={{ backgroundImage: `${process.env.BASE_URL}/${banner}/` }}>
                    <div className="container">
                        <div className="dez-bnr-inr-entry">
                            <h1 className="text-white">{title}</h1>
                        </div>
                    </div>
                </div > : null
            }


            {
                title ? <div className="breadcrumb-row">
                    <div className="container">
                        <ul className="list-inline">
                            <li><Link href="/">Home</Link></li>
                            {parents ? <li><Link href={`/${parents}`}>{parents}</Link></li> : null}
                            <li>{title}</li>
                        </ul>
                    </div>
                </div> : null
            }
        </>
    )
}

export default Banner