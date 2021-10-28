import Head from 'next/head'
import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'
import { useForm } from 'react-hook-form'


export default function dashboard() {
    const { cancelCookie } = useContext(AuthContext);
    const { handleSubmit } = useForm();

    function logout() {

        cancelCookie();
    }

    return (
        <div>
            <Head>
                <title>LIA</title>
            </Head>

            <div>
                <h2>pagina home</h2>
            </div>

            <div>
                <button
                    type="submit"
                    onClick={handleSubmit(logout)}>
                    <span> logout </span>
                </button>
            </div>
        </div>
    )
}