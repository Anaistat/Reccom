import React, {useLayoutEffect, useState} from "react";
const useTheme = () =>{
    const [theme, setTheme] = useState<string>(localStorage.theme?localStorage.theme:'light')
    localStorage.theme = theme

    useLayoutEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])
    return {theme, setTheme}
}

export default useTheme