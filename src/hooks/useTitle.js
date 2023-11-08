import { useEffect } from "react"

const useTitle = title =>{
    useEffect(()=>{
        document.title = `Daily Blog | ${title}`;
    },[title])
}

export default useTitle;