import Head from 'next/head'
import { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/authContext';
import { api } from './apiLia/axiosClientSide';
import { parseCookies } from 'nookies';


export default function Home() {
  const { register, handleSubmit } = useForm();
  const { auth } = useContext(AuthContext)


  async function login({ email, password }) {

    await auth({ email, password });

    const { token_lia } = parseCookies();
    api.defaults.headers['authorization'] = `Bearer ${token_lia}`;

  }

  return (
    <div>
      <Head>
        <title>LIA</title>
      </Head>

      <form onSubmit={handleSubmit(login)}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div>

          <div>
            <label htmlFor="email-address">
              Email address
              </label>
            <input
              {...register('email')}
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
            />
          </div>

          <div>
            <label htmlFor="password">
              Password
            </label>
            <input
              {...register('password')}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
            />
          </div>

        </div>

        <div>
          <button type="submit">
            <span> Login </span>
          </button>
        </div>

      </form>
    </div>
  )
}
