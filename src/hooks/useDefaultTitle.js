import { useEffect } from "react"

const useDefaultTitle = title => {
    useEffect(() => {
        document.title = title;
    }, [title])
};
export default useDefaultTitle;