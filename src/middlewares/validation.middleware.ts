export function validateLoginRoute(req, res, next) {
  const { email, password } = req.body;
  const regEmail = /^[a-z0-9_-]{2,64}@[a-z0-9_-]{2,63}\.[a-z0-9_-]{2,63}$/;
  const regPassword = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}/

  if(!regEmail.test(email) || !regPassword.test(password)) {
    res.render('signIn', { errorMessage: 'Invalid email or password' });
  } else {
    next();
  }
}

export function validateRegisterRoute(req, res, next) {
  const { email, password, passwordConfirmation, role } = req.body;
  const regEmail = /^[a-z0-9_-]{2,64}@[a-z0-9_-]{2,63}\.[a-z0-9_-]{2,63}$/;
  const regPassword = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}/
  const roles = ['Guest', 'User', 'Supervisor', 'Admin'];

  if(!regEmail.test(email) || !regPassword.test(password)
      || !roles.includes(role) || password !== passwordConfirmation) {
    res.render('signUp', { errorMessage: 'Invalid data' });
  } else {
    next();
  }
}
