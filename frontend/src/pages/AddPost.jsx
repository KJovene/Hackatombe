import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddPost() {
  const [values, setValues] = useState({
    titre: '',
    description: '',
    image: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      navigate('/login')
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image' && files && files[0]) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setValues(prev => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(files[0])
    } else {
      setValues(prev => ({ ...prev, [name]: value }))
    }
  }

  const validate = () => {
    const errs = {}
    if (!values.titre) errs.titre = "Titre requis"
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return
    try {
      const userId = localStorage.getItem('userId')
      await axios.post('http://localhost:6782/posts', {
        ...values,
        userId
      })
      navigate('/')
    } catch (err) {
      setErrors({ submit: "Erreur lors de la création du post" })
      console.error(err)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="shadow-lg px-8 py-5 border w-96" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">Créer un post</h2>
        <div className="mb-4">
          <label htmlFor="titre" className="block text-gray-700">Titre</label>
          <input
            type="text"
            id="titre"
            name="titre"
            className="w-full px-3 py-2 border"
            value={values.titre}
            onChange={handleChange}
            required
          />
          {errors.titre && <p className="text-red-500">{errors.titre}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 border"
            value={values.description}
            onChange={handleChange}
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="w-full"
            onChange={handleChange}
          />
          {values.image && (
            <img src={values.image} alt="Aperçu" className="mt-2 max-h-32" />
          )}
          {errors.image && <p className="text-red-500">{errors.image}</p>}
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2">Publier</button>
        {errors.submit && <p className="text-red-500 mt-2">{errors.submit}</p>}
      </form>
    </div>
  )
}

export default AddPost