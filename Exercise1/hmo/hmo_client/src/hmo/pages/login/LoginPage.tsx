// import { ChangeEvent, FormEvent, useState } from "react"
// import { useAppDispatch } from "../../redux/store"
// import { login } from "../../services/auth.service"
// import { setSession } from "../../auth/auth.utils"
// import { setStaff } from "../../redux/auth/auth.slice"

// export default function LoginPage() {
//     const [userData, setUserData] = useState({
//         email: '',
//         password: ''
//     })
//     const dispatch = useAppDispatch()

//     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target
//         setUserData({ ...userData, [name]: value })
//     }

//     const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//         event.preventDefault()
//         try {
//             const authUser = await login(userData.email, userData.password);
//             dispatch(setStaff(authUser.staff))
//             setSession(authUser)
//         } catch (error) {
//             console.log(error)
//         }

//     }

//     return <form onSubmit={handleSubmit}>
//         <input name='email' value={userData.email} onChange={handleChange} />
//         <input name='password' value={userData.password} onChange={handleChange} />
//         <button>Login</button>
//     </form>
// }

import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../services/auth.service";
import { setSession } from "../../auth/auth.utils";
import { setStaff } from "../../redux/auth/auth.slice";
import './loginPage.scss'; // קובץ CSS עבור עיצוב הדף
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [userData, setUserData] = useState({
        id: '',
        password: ''
    });
    const dispatch = useAppDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const authUser = await login(userData.id, userData.password);
            dispatch(setStaff(authUser.staff));
            setSession(authUser);
        } catch (error:any) {
            console.log(error);
            alert(error.response.data)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input 
                name='id' 
                value={userData.id} 
                onChange={handleChange} 
                className="login-input" 
                placeholder="id"
            />
            <input 
                name='password' 
                value={userData.password} 
                onChange={handleChange} 
                type="password" 
                className="login-input" 
                placeholder="Password"
            />
            <button className="login-button">Login</button>
            <div className="team-member-message">
                איש צוות יקר. אם לא נרשמת לחץ <Link to="/signin">כאן</Link>
            </div>

        </form>
        
    );
}
