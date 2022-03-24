import React, {useContext} from "react";
import "./header.scss"
import {Link, useNavigate} from "react-router-dom";
import AppContext from "../../context/app.context";
import appLanguage from "../../language";
import Authentication from "../../services/Authentication";
import {auth} from "../../configs/firebase";
import {googleProvider} from "../../configs/social";
import AuthController from "../../controllers/AuthController";
import {Candidate, Role, User} from "../../types";
import {useAuthState} from "react-firebase-hooks/auth";
import useTheme from "../../hooks/useTheme";

const Header = () => {

    const { user, setUser, search, setSearch, language, setLanguage } = useContext(AppContext)
    const [authUser] = useAuthState(auth)
    const {theme, setTheme} = useTheme()

    const themes:any = {
        'light': "/Day.png",
        'dark': "/Night.png"
    }
    const lang: any = {
        "ru": "/ru.png",
        "en": "/en.png"
    }

    localStorage.language = language

    let navigate = useNavigate()

    const switchTheme = () =>{
        (theme === 'light')? setTheme('dark'): setTheme('light')
    }

    const authentication = async (auth: any, provider: any) => {
        try {
            const res = await Authentication(auth, provider)
            const candidate: Candidate = {
                uid: res.user.uid,
                name: res.user.displayName,
                photo: res.user.photoURL
            }
            const user: User | undefined = await AuthController.authorize(candidate)
            if (user && user.status === 'Active') {
                setUser(user)
                navigate('/')
            } else {
                setUser(undefined)
                logout()
            }
        }
        catch (e) {
            console.error('Auth error: ', e)
        }
    }

    const logout = () =>{
        auth.signOut().then(()=>{
            setUser(undefined)
            navigate('/')
        })
    }

    return (
        <header className="header-container">
            <div>
                <Link to="/">

                    <img src="/logo.png" alt="logo" width="42" height="40" className="logo-name"/>

                    <svg
                        className="logo-icons"
                        width="200px" height="43px">
                        <text kerning="auto" fontFamily="Myriad Pro" fontSize="40px" x="0px" y="35px"><tspan fontSize="40px" fontFamily="Arial Rounded MT Bold">Reccom</tspan></text>
                    </svg>
                </Link>
            </div>
            <div className="search">
                <input type="text" placeholder="search" className="search-field" value={search} onChange={e=>setSearch(e.target.value)}/>
                <button className="search-btn">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#121212" fillOpacity="0.5"/>
                </svg>
                </button>
                <button className="theme-switcher" onClick={switchTheme}>
                    <img src={themes[theme]} alt="theme" width="45" height="25"/>
                </button>
                <button className="language-switcher" onClick={()=>(language === "en")? setLanguage("ru"): setLanguage("en")}>
                    <img src={lang[language]} alt="lang" width="25" height="18"/>
                    {language}
                </button>
            </div>

            <div className="user-header">
                {
                    authUser ?
                        <>
                            <Link to={`/user/${user?.id}`} className='user-header__link'>
                                <img className='user-header__avatar' src={authUser.photoURL || ''} alt={authUser.displayName || ''} width={14} height={14}/>
                                <span className='user-header__nickname'>{authUser.displayName || ''}</span>
                            </Link>
                            {
                                user && user.role === Role.Admin &&
                                <Link to='/admin' className='user-header__admin-panel'>
                                    {appLanguage[language].admin}
                                </Link>

                            }

                            <button className="user-header__logout" onClick={() => logout()}>{appLanguage[language].logout}</button>
                        </>
                        :
                        <button className="user-header__login" onClick={()=>authentication(auth, googleProvider)}>
                            <img className="user-header__icon" src="https://freesvg.org/img/1534129544.png" width="20" height="20" alt="google"/>
                            {appLanguage[language].login}
                        </button>
                }

            </div>

        </header>
    );
};

export default Header