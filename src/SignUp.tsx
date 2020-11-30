import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, FormControl, FormErrorMessage, FormHelperText, Input, Button } from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps, FormikProps } from 'formik';

import { SignUpRequest } from './api/types';
import { ApiContext } from './App';

type Props = Record<string, unknown>;
type SignUpFormValues = SignUpRequest & {
    passwordRepeat: string;
};
type SignUpFormErrors = Partial<SignUpFormValues>;

const initialSignUpFormValues: SignUpFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeat: '',
};

export const SignUp: React.FC<Props> = () => {
    const api = useContext(ApiContext);
    const [formErrors, setFormErrors] = useState<SignUpFormErrors>({});

    const validate = ({ firstName, lastName, email, password, passwordRepeat }: SignUpFormValues) => {
        const errors: SignUpFormErrors = {};

        if (firstName.length === 0) {
            errors.firstName = 'Missing first name';
        }

        if (lastName.length === 0) {
            errors.lastName = 'Missing last name';
        }

        if (email.length === 0) {
            errors.email = 'Missing email';
        } else if (email.length < 5) {
            errors.email = 'Invalid email';
        }

        if (password.length === 0) {
            errors.password = 'Missing password';
        } else if (password.length < 5) {
            errors.password = 'Invalid password';
        }

        if (passwordRepeat.length === 0) {
            errors.passwordRepeat = 'Type in password again';
        } else if (password !== passwordRepeat) {
            errors.passwordRepeat = 'Password missmatch';
        }

        setFormErrors(errors);

        return formErrors;
    };

    const onSubmit = (values: SignUpFormValues, { setSubmitting }: FormikHelpers<SignUpFormValues>) => {
        setSubmitting(true);
        console.log(values);
        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
    };

    return (
        <Flex direction={'row'} align={'center'} justify={'center'} width='100vw' height='100vh'>
            <Box width='50%' height='50%' backgroundColor='blue'>
                <Formik initialValues={initialSignUpFormValues} validate={validate} onSubmit={onSubmit}>
                    {({ isSubmitting }: FormikProps<SignUpFormValues>) => (
                        <Form>
                            <Flex direction={'column'} align={'center'} justify={'center'} padding='1em'>
                                <Field name='firstName'>
                                    {({ field }: FieldProps<string, SignUpFormValues>) => (
                                        <FormControl id='firstName' isInvalid={formErrors.firstName ? true : false}>
                                            <Input {...field} type='text' name='firstName' placeholder='First name' />
                                            <FormErrorMessage>{formErrors.firstName}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='lastName'>
                                    {({ field }: FieldProps<string, SignUpFormValues>) => (
                                        <FormControl id='lastName' isInvalid={formErrors.lastName ? true : false}>
                                            <Input {...field} type='text' name='lastName' placeholder='Last name' marginTop='1em' />
                                            <FormErrorMessage>{formErrors.lastName}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='email'>
                                    {({ field }: FieldProps<string, SignUpFormValues>) => (
                                        <FormControl id='email' isInvalid={formErrors.email ? true : false} marginTop='1em'>
                                            <Input {...field} type='email' name='email' placeholder='Email address' />
                                            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='password'>
                                    {({ field }: FieldProps<string, SignUpFormValues>) => (
                                        <FormControl id='password' isInvalid={formErrors.password ? true : false} marginTop='1em'>
                                            <Input {...field} type='password' name='password' placeholder='Password' />
                                            <FormErrorMessage>{formErrors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='passwordRepeat'>
                                    {({ field }: FieldProps<string, SignUpFormValues>) => (
                                        <FormControl
                                            id='passwordRepeat'
                                            isInvalid={formErrors.passwordRepeat ? true : false}
                                            marginTop='1em'
                                        >
                                            <Input {...field} type='password' name='passwordRepeat' placeholder='Repeat Password' />
                                            <FormErrorMessage>{formErrors.passwordRepeat}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button type='submit' marginTop='1em' width='100%' isLoading={isSubmitting}>
                                    Sign Up
                                </Button>
                                <FormControl>
                                    <Flex justifyContent='center'>
                                        <FormHelperText>
                                            Already have an account ?{' '}
                                            <Link to='/' style={{ fontWeight: 'bold' }}>
                                                Login
                                            </Link>
                                        </FormHelperText>
                                    </Flex>
                                </FormControl>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
};
