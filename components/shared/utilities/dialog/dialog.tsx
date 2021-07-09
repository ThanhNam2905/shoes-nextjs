import React, { MutableRefObject, ReactPropTypes, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

type DialogProps = {
    showModal: boolean,
    children?: any,
    closeModal?: () => void,
    icon?: JSX.Element,
    className?: string; 
    target?: any;
}

const Dialog: React.FC<DialogProps> = ({ showModal, closeModal , children, icon, className, target }: DialogProps) => {

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
            <div className="modal">
                <div onClick={closeModal} className="animate-fade overlay fixed z-40 top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center cursor-pointer"></div>
                <div className={`modal-content ${className} `} ref={target}>
                    { icon ? (
                        <button 
                            className="absolute top-3 right-3 bg-gray-900 text-white hover:bg-red-600 flex items-center px-3 py-1 rounded-md focus:outline-none"
                            onClick={closeModal}>Close 
                            { icon }
                        </button>
                    ) : ""}
                
                    <div className="modal-body">
                        { children }
                    </div>
                </div>   
            </div>  
        </>
    ) : null
}

export default Dialog;