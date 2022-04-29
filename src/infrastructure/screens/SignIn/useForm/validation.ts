interface IValidation {
  isLogin: boolean;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validation = (props: IValidation) => {
  const errors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  //Validation for name
  if (!props.isLogin && !props.name.trim()) {
    errors.name = 'This field is required';
  } else if (
    !props.isLogin &&
    props.name.trim() &&
    !/^[A-Za-z0-9]{3,16}$/.test(props.name.trim())
  ) {
    errors.name = 'Username should be 3-16 characters and should´t include any special character!';
  } else {
    errors.name = '';
  }

  //Validation for email
  if (!props.email.trim()) {
    errors.email = 'This field is required';
  } else if (
    props.email.trim() &&
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(props.email.trim())
  ) {
    errors.email = 'Email should be a valid email adress';
  } else {
    errors.email = '';
  }

  //Validation for password
  if (!props.password.trim()) {
    errors.password = 'This field is required';
  } else if (
    props.password.trim() &&
    !/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*-.])[a-zA-Z0-9!@#$%^&*-.]{8,20}$/.test(
      props.password.trim()
    )
  ) {
    errors.password =
      'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character';
  } else {
    errors.password = '';
  }

  //Validation for confirmPwassword
  if (!props.isLogin && !props.confirmPassword.trim()) {
    errors.confirmPassword = 'This field is required';
  } else if (
    !props.isLogin &&
    props.confirmPassword.trim() &&
    props.confirmPassword !== props.password
  ) {
    errors.confirmPassword = 'Password don´t match';
  } else {
    errors.confirmPassword = '';
  }

  return errors;
};

export default validation;
