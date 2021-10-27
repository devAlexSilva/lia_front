import Head from 'next/head'
import { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/authContext';


export default function Home() {
  const { register, handleSubmit } = useForm();
  const { auth } = useContext(AuthContext)  


  async function login(data){
  await auth(data);

}

  return (
    <div>
      <Head>
        <title>Home</title>
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
          <div>
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
            />
            <label htmlFor="remember_me">
              Remember me
              </label>
          </div>
        </div>

        <div>
          <button type="submit">
            <span> Sign in </span>
          </button>
        </div>
      </form>
    </div>
  )
}
