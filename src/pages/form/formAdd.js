import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { api } from '../apiLia/axiosClientSide';
import { parseCookies } from 'nookies';
import Router from 'next/router';



export default function formAdd() {

    const { register, handleSubmit } = useForm();



    function saveForm(data) {
        
        try {

            api.post('/form/add', data).then((res) => {
                Router.push('/dashboard');
                console.log(res);
            })

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div>
            <Head>
                <title>LIA</title>
            </Head>

            <form onSubmit={handleSubmit(saveForm)}>
                <div>

                    <div>
                        <label htmlFor="title_form">
                            titulo
                        </label>
                        <input
                            {...register('title')}
                            id="title_form"
                            name="title"
                            type="text"
                            required
                            placeholder="titulo do formulário"
                        />
                    </div>

                    <div>
                        <label htmlFor="body_form">
                            descrição
                        </label>
                        <textarea
                            {...register('body')}
                            id="body_form"
                            name="body"
                            required
                            placeholder="campo para a descrição"
                        />
                    </div>

                    <div>
                        <label htmlFor="status_form">
                            status
                        </label>
                        <input
                            {...register('status')}
                            id="status_form"
                            name="status"
                            type="text"
                            required
                            placeholder="status"
                        />
                    </div>

                </div>

                <div>
                    <button type="submit">
                        <span> Salvar </span>
                    </button>
                </div>

            </form>
        </div>
    )
}


export function getServerSideProps(ctx) {

    const { token_lia } = parseCookies(ctx);

    if (!token_lia) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }

    return {
        props: {
            add: 'd'
        }
    };

}