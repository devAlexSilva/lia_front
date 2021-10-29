import Head from 'next/head'
import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'
import { useForm } from 'react-hook-form'
import { api } from './apiLia/axiosClientSide';
import { parseCookies } from 'nookies';
import { axiosClient } from './apiLia/axiosServerSide';
import styles from '../../styles/Home.module.css'
import Router from 'next/router'
import Link from 'next/link'





export default function dashboard(props) {
    const { cancelCookie } = useContext(AuthContext);
    const { handleSubmit } = useForm();

    function logout() {

        cancelCookie();
    }



    async function deleteForm(id) {

        try {

            await api.post(`/form/${id}/delete`);
            Router.push('/dashboard');

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <Head>
                <title>LIA</title>
            </Head>

            <div>
                <h2>pagina home</h2>
            </div>


            <div className={styles.window}>
                <div className={styles.sidebar}>

                </div>


                <div>
                    <button
                        type="submit"
                        onClick={handleSubmit(logout)}>
                        <span> logout </span>
                    </button>
                </div>



                <div className={styles.centerArea}>
                    <div>
                        {
                            props.data.map(item => {
                                return (
                                    <div key={item._id} className={styles.cardForm}>

                                        <li>{item.title}</li>
                                        <li>{item.status}</li>
                                        <li>{item.body}</li>
                                        <li>{item.idOfUser}</li>

                                        <div>
                                            <button
                                                type="submit"
                                                onClick={() => { deleteForm(item._id) }}>
                                                <span> delete </span>
                                            </button>
                                        </div>
                                        <div>
                                            <Link href={'/form/formAdd'}>
                                                <button type="submit">
                                                    <span> + </span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}
//pra mandar para o login após o token expirar
export async function getServerSideProps(ctx) {

    const api = axiosClient(ctx);

    const { token_lia } = parseCookies(ctx);

    if (!token_lia) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }

    const { 'data': dataForm } = await api.get('/form');


    return {

        props: {
            data: dataForm
        }
    }

}