import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const useIdFromUrl = () => {
    const location = useLocation();
    const [urlId, setUrlId] = useState("");

    useEffect(() => {
        const currentPath = location.pathname;
        let urlParts = currentPath.split('/')
        setUrlId(urlParts[urlParts.length-1]);
    }, []);

    return urlId;
}

export default useIdFromUrl;
