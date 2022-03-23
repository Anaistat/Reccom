import {signInWithPopup} from "firebase/auth"


const Authentication = (auth:any, provider:any) =>{
    return signInWithPopup(auth, provider).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
}

export default Authentication