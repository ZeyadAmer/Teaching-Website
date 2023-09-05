import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

const Navbar = () => {
    const signOut = async () => {
        await axios.get('/user/logout', {
            headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
        });
        setFlag(false)
        window.location.reload();
    }
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        async function cookieChecker() {
            if (Cookies.get('jwt') != null) {
                setFlag(true)
            }
        }
        cookieChecker()
    }, flag)
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Ctrl+C Ctrl+V</h1>
                </Link>
                <div>
                    <Link to="/login">
                        {!flag ? (<h4 id="signIn">Log in</h4>) : (null)}
                    </Link>
                    <Link to="/signup">
                        {!flag ? (<h4 id="signUp">Sign up</h4>) : (null)}
                    </Link>
                    <Link onClick={signOut}>
                        {flag ? (<h4 id="signOut">Sign out</h4>) : (null)}
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar