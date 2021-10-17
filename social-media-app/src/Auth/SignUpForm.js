import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
    userName: yup.string().trim().matches(/^([a-z]|[A-Z])+([a-z]|[A-Z]|\d)*$/, 
    'username may only contain letters and numbers and may only begin with a letter').required('No username provided'),
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().trim().email().required('No email provided'),
    phone: yup.string().trim().matches(phoneRegExp,
     "Phone number does not match pattern: 123-456-7890").required('No phone number provided'),
    dob: yup.date().typeError('This field must be in the form of mm/dd/yyyy or mm-dd-yyyy').required('No date of birth provided'),
    zipcode: yup.string().trim().matches(/^[0-9]{5}(?:-[0-9]{4})?$/,
     'Zipcode does not match pattern: 77005').required('No zipcode provided'),
    password: yup.string().trim().min(8, 'Password must be at least 8 characters').required('No password provided'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

const SignUpForm = () => {
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        // TODO: store data into server  
        console.log(data)
    };

    return (
        
        <div className="sign-up-div">

            <h1 className="signup-header">Sign Up</h1>
            <form onSubmit={ handleSubmit(onSubmit) } className="signup-form">

                <input className="form-input" {...register('userName')} placeholder="Username"/>
                <p>{ errors.userName?.message }</p>

                <input className="form-input" {...register('firstName')} placeholder="First Name"/>
                <p>{ errors.firstName?.message }</p>

                <input className="form-input" {...register('lastName')} placeholder="Last Name"/>
                <p>{ errors.lastName?.message }</p>

                <input className="form-input" {...register('email')} placeholder="Email"/>
                <p>{ errors.email?.message }</p>

                <input className="form-input" {...register('phone')} placeholder="Phone"/>
                <p>{ errors.phone?.message }</p>

                <input className="form-input" {...register('dob')} placeholder="Date of Birth"/>
                <p>{ errors.dob?.message }</p>

                <input className="form-input" {...register('zipcode')} placeholder="Zipcode"/>
                <p>{ errors.zipcode?.message }</p>

                <input className="form-input" {...register('password')} placeholder="Password"/>
                <p>{ errors.password?.message }</p>

                <input className="form-input" {...register('confirmPassword')} placeholder="Confirm Password"/>
                <p>{ errors.confirmPassword && 'Passwords do not match' }</p>

                <input type="submit"/>
            </form>
        </div>
    )
}

export default SignUpForm
