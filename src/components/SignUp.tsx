import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useToast, Box, Flex, FormControl, FormErrorMessage, FormHelperText, Input, Button } from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps, FormikProps } from 'formik';

import { SignUpRequest } from '../api/types';
import { ApiContext } from '../App';

import { isEmailValid, isPasswordStrongEnough } from '../utils';

type Props = Record<string, unknown>;
type SignUpFormValues = SignUpRequest & {
    password_repeat: string;
};
type SignUpFormErrors = Partial<SignUpFormValues>;

export const SignUp: React.FC<Props> = () => {
    const api = useContext(ApiContext);
    const history = useHistory();
    const toast = useToast();

    const [formErrors, setFormErrors] = useState<SignUpFormErrors>({});
    const [showPasswordView, setShowPasswordView] = useState<boolean>(false);
    const [showRepeatPasswordView, setShowRepeatPasswordView] = useState<boolean>(false);

    const initialSignUpFormValues: SignUpFormValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_repeat: '',
    };

    const validate = ({ first_name, last_name, email, password, password_repeat }: SignUpFormValues) => {
        const errors: SignUpFormErrors = {};

        if (first_name.length === 0) {
            errors.first_name = 'Missing first name';
        }

        if (last_name.length === 0) {
            errors.last_name = 'Missing last name';
        }

        if (email.length === 0) {
            errors.email = 'Missing email';
        } else if (!isEmailValid(email)) {
            errors.email = 'Invalid email';
        }

        if (password.length === 0) {
            errors.password = 'Missing password';
        } else if (!isPasswordStrongEnough(password)) {
            errors.password =
                'Password should include at least one lower, one upper, one digit and one special char and be at least 8 characters long';
        }

        if (password_repeat.length === 0) {
            errors.password_repeat = 'Type in password again';
        } else if (password !== password_repeat) {
            errors.password_repeat = 'Password missmatch';
        }

        setFormErrors(errors);
        return formErrors;
    };

    const onSubmit = async (values: SignUpFormValues, { setSubmitting }: FormikHelpers<SignUpFormValues>) => {
        setSubmitting(true);

        try {
            await api.signUp(values);
            history.push('/login', { email: values.email });
            toast({
                title: 'Profile was created successfully.',
                description: 'Log into your new account',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'An error occurred.',
                description: error.message ?? "Coudln't create user account",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction={'row'} align={'center'} justify={'center'} width='100vw' height='100vh'>
            <Box width='50%' height='50%' backgroundColor='blue'>
                <Formik
                    initialValues={initialSignUpFormValues}
                    validateOnBlur={true}
                    validateOnChange={false}
                    validate={validate}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }: FormikProps<SignUpFormValues>) => (
                        <Form>
                            <Flex direction={'column'} align={'center'} justify={'center'} padding='1em'>
                                <Field name='first_name'>
                                    {({ field }: FieldProps<string, SignUpFormValues>) => (
                                        <FormControl id='first_name' isInvalid={formErrors.first_name ? true : false}>
                                            <Input {...field} type='text' name='first_name' placeholder='First name' />
                                            <FormErrorMessage>{formErrors.first_name}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='last_name'>
                                    {({ field }: FieldProps<string, SignUpFormValues>) => (
                                        <FormControl id='last_name' isInvalid={formErrors.last_name ? true : false}>
                                            <Input {...field} type='text' name='last_name' placeholder='Last name' marginTop='1em' />
                                            <FormErrorMessage>{formErrors.last_name}</FormErrorMessage>
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
                                            <Box position='relative'>
                                                <Input
                                                    {...field}
                                                    type={showPasswordView ? 'text' : 'password'}
                                                    name='password'
                                                    placeholder='Password'
                                                />
                                                {showPasswordView ? (
                                                    <ViewOffIcon
                                                        width='1em'
                                                        height='1em'
                                                        position='absolute'
                                                        top='calc(50% - (1em / 2))'
                                                        right='1em'
                                                        cursor='pointer'
                                                        onClick={() => setShowPasswordView(false)}
                                                    />
                                                ) : (
                                                    <ViewIcon
                                                        width='1em'
                                                        height='1em'
                                                        position='absolute'
                                                        top='calc(50% - (1em / 2))'
                                                        right='1em'
                                                        cursor='pointer'
                                                        onClick={() => setShowPasswordView(true)}
                                                    />
                                                )}
                                            </Box>
                                            <FormErrorMessage>{formErrors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='password_repeat'>
                                    {({ field }: FieldProps<string, SignUpFormValues>) => (
                                        <FormControl
                                            id='password_repeat'
                                            isInvalid={formErrors.password_repeat ? true : false}
                                            marginTop='1em'
                                        >
                                            <Box position='relative'>
                                                <Input
                                                    {...field}
                                                    type={showRepeatPasswordView ? 'text' : 'password'}
                                                    name='password_repeat'
                                                    placeholder='Repeat Password'
                                                />
                                                {showRepeatPasswordView ? (
                                                    <ViewOffIcon
                                                        width='1em'
                                                        height='1em'
                                                        position='absolute'
                                                        top='calc(50% - (1em / 2))'
                                                        right='1em'
                                                        cursor='pointer'
                                                        onClick={() => setShowRepeatPasswordView(false)}
                                                    />
                                                ) : (
                                                    <ViewIcon
                                                        width='1em'
                                                        height='1em'
                                                        position='absolute'
                                                        top='calc(50% - (1em / 2))'
                                                        right='1em'
                                                        cursor='pointer'
                                                        onClick={() => setShowRepeatPasswordView(true)}
                                                    />
                                                )}
                                            </Box>
                                            <FormErrorMessage>{formErrors.password_repeat}</FormErrorMessage>
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
                                            <Link to='/login' style={{ fontWeight: 'bold' }}>
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
