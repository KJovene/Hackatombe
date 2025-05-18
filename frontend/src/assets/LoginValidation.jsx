function Validation(values) {
  let error = {}
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

  if(!values.email) {
    error.email = "L'email est requis"
  } else if(!regex.test(values.email)) {
    error.email = "L'email n'est pas valide"
  }

  if(!values.password) {
    error.password = "Le mot de passe est requis"
  } else if(values.password.length < 6) {
    error.password = "Le mot de passe doit contenir au moins 6 caractères"
  }

  return error
}

export default Validation