"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ScrollTop = (props) => {
    const location = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>
};

export default ScrollTop;