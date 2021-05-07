import React, { useEffect, useState } from 'react';
import { FiChevronsUp } from "react-icons/fi";
import { useWindowScroll } from 'react-use';

export function ScrollToTopBtn(): any {

    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisible] = useState(false);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    useEffect(() => {
        if(pageYOffset > 500) {
            setVisible(true);
        }
        else {
            setVisible(false);
        }

    }, [pageYOffset]);

    if(!visible) {
        return false;
    }

    return (
        <div className="scroll-to-top hover:bg-white hover:text-red-600 hover:border-red-600" onClick={scrollToTop}>
            <i className="icon__scroll-to-top mt-2.5">
                <FiChevronsUp/>
            </i>
        </div>
    )
}

