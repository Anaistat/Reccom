import React, {useEffect, useState} from 'react'
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Main from "./pages/Main/Main";
import Header from "./components/Header/header";
import UserProfile from "./pages/UserProfile/userProfile";
import ReviewDescription from "./pages/ReviewDescription/reviewDescription"
import AdminPanel from "./pages/Admin/adminPanel";
import NewReview from "./pages/NewReview/newReview";
import AppContext from "./context/app.context";
import {Candidate, User} from "./types";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./configs/firebase";
import Preloader from "./components/preloader/preloader";
import AuthController from "./controllers/AuthController";
import EditReview from "./pages/EditReview/editReview";

function App() {

    const [language, setLanguage] = useState<string>(localStorage.language?localStorage.language:"en")
    const [search, setSearch] = useState<string>("")
    const [user, setUser] = useState<User | undefined>(undefined)
    const [authUser, loading, error] = useAuthState(auth)


    useEffect(() => {
        if (!authUser) return
        const candidate: Candidate = {
            name: authUser.displayName || 'Anonymous',
            photo: authUser.photoURL || 'https://assets.cdn-shop.com/meinfoto5-de/assets/img/icons/user-icon-37ab5e38a8.svg',
            uid: authUser.uid,
        }
        AuthController.authorize(candidate).then(user => {
            if (user) {
                setUser(user)
            }
            else {
                setUser(undefined)
            }
        })
    }, [authUser])


  return (
    <AppContext.Provider value={ {language, setLanguage, search, setSearch, user, setUser} }>
        <BrowserRouter>
            <div className="App">
                {
                    loading ?
                        <Preloader/>
                    :
                    error?
                        <p>{error.message}</p>
                    :
                    <>
                        <Header/>
                        <Routes>
                            <Route path='/'>
                                <Route index element={<Main/>}/>
                                <Route path="user/:id" element={
                                    user?<UserProfile/>:<Main/>
                                }/>
                                <Route path="review/:id" element={<ReviewDescription/>}/>
                                <Route path="admin" element={
                                    (user?.role === 'Admin')?<AdminPanel/>:<Main/>
                                }/>
                                <Route path="new-review" element={
                                    user?<NewReview/>:<Main/>
                                }/>
                                <Route path="edit/:id" element={
                                    user?<EditReview/>:<Main/>
                                }/>
                            </Route>
                        </Routes>
                    </>
                }
            </div>
        </BrowserRouter>
    </AppContext.Provider>

  );
}

export default App;
