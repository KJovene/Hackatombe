import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Validation from '../assets/LoginValidation.jsx'

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const [errors, setErrors] = useState({})

  const handleChanges = (e) => {
    setValues ({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = Validation(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const response = await axios.post('http://localhost:6782/auth/login', values)
      if(response.status === 201) {
        localStorage.setItem('token', response.data.token)
        navigate('/')
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setErrors({ ...errors, email: "L'email ou le mot de passe est incorrect" })
        } else if (err.response.status === 404) {
          setErrors({ ...errors, email: "L'utilisateur n'existe pas" })
        } else if (err.response.status === 500) {
          setErrors({ ...errors, email: "Erreur serveur" })
          console.log('Erreur /auth/login', err)
        }
      } else {
        setErrors({ ...errors, email: "Erreur réseau ou serveur injoignable" })
      }    
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='shadow-lg px-8 py-5 border w-96'>
        <h2 className='text-lg font-bold mb-4'>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700'>Email</label>
            <input type="email" id="email" name="email" placeholder='Email' className='w-full px-3 py-2 border' onChange={handleChanges} required />
            {errors.email && <p className='text-red-500'>{errors.email}</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700'>Mot de passe</label>
            <input type="password" id="password" name="password" placeholder='Mot de passe' className='w-full px-3 py-2 border' onChange={handleChanges} required />
            {errors.password && <p className='text-red-500'>{errors.password}</p>}
          </div>
          <button type='submit' className='w-full bg-green-600 text-white py-2'>Valider</button>
        </form>
        <div className='text-center'>
          <span>Pas de compte ? </span>
          <Link to='/register' className='text-blue-500'>S'inscrire</Link>
        </div>
      </div>
    </div>
  )
}

export default Login