'use client'
import FetchData from '@/app/components/FetchData';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const DeleteModal = ({ did, dc, setdc, url, page }) => {
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const idToDelete = did;
            if (!idToDelete) {
                throw new Error('No ID to delete');
            }

            const resDel = await FetchData({ url: `${url}/${did}`, method: "DELETE", authorization: `Bearer ${token}` });

            if (!resDel.ok) {
                throw new Error('Failed to delete');
            }

            toast.success("Deleted Successfully.");
            setdc(false);

            router.push(`/dashboard/${page}`);
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Failed to delete");
        }
    };

    return (
        <>
            <div id="myModal" className={`modal fade ${dc ? 'show' : ''}`}>
                <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                        <div className="modal-header flex-column">
                            <div className="icon-box">
                                <i className="icon-close"></i>
                            </div>
                            <h4 className="modal-title w-100">Are you sure?</h4>
                        </div>
                        <div className="modal-body">
                            <p>Do you really want to delete these records? This process cannot be undone.</p>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-secondary" onClick={() => setdc(false)}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal-backdrop fade ${dc ? 'show' : ''}`}></div>
        </>
    )
}

export default DeleteModal