import React, { ReactPropTypes, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

type ModalProps = {
    showModal: boolean,
    children?: any,
    closeModal?: () => void
}

const Dialog: React.FC<ModalProps> = ({ showModal, closeModal , children, ...props}) => {

    // Event keyup ESC => closeModal
    useEffect(() => {
        function handlerAddEventKeyUp(event) {
            // console.log("key code => " , event.which, event.key);
            if(event.which === 27 || event.key === "Escape") {
                closeModal();
            }
        }
        
        document.addEventListener('keyup', handlerAddEventKeyUp);
        return () => {
            // Component Will Unmount
            document.addEventListener("keyup", handlerAddEventKeyUp);
        }
    }, []);

    return showModal ? (
        <>
            <div onClick={closeModal} className="animate-slide-up overlay fixed z-40 top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center cursor-pointer"></div>
            <div className="modal-content animate-slide-up fixed top-36 left-1/4 z-50 bg-white py-20 px-20 w-2/4 text-center">
                <button 
                    className="absolute top-3 right-3 bg-gray-900 text-white hover:bg-red-600 flex items-center px-3 py-1 rounded-md focus:outline-none"
                    onClick={closeModal}>Close 
                    <MdClose className="mt-0.5 ml-1"/>
                </button>
                <div className="modal-body">
                    { children }
                </div>
            </div>   
        </>
    ) : null
}

export default Dialog;