import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage, FormikValues, FormikHelpers, FieldProps, FormikProps } from 'formik';

type LoginProps = Record<string, unknown>;
type LoginFormValues = {
    email: string;
    password: string;
};
type LoginFormErrors = {
    email?: string;
    password?: string;
};

export const Login = (props: LoginProps) => {
    const [formErrors, setFormErrors] = useState<LoginFormErrors>({});

    const validate = ({ email, password }: LoginFormValues) => {
        const errors: LoginFormErrors = {};

        if (email.length < 5) {
            errors.email = 'Invalid email';
        }

        if (password.length < 5) {
            errors.password = 'Invalid password';
        }

        setFormErrors(errors);

        return formErrors;
    };

    const onSubmit = (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
        setSubmitting(true);
        console.log('submit');
        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
    };

    return (
        <Flex direction={'row'} align={'center'} justify={'center'} width='100vw' height='100vh'>
            <Box width='50%' height='50%' backgroundColor='blue'>
                <Formik initialValues={{ email: '', password: '' }} validate={validate} onSubmit={onSubmit}>
                    {({ isSubmitting }: FormikProps<LoginFormValues>) => (
                        <Form>
                            <Flex direction={'column'} align={'center'} justify={'center'} padding='1em'>
                                <Field name='email'>
                                    {({ field, form }: FieldProps) => (
                                        <FormControl id='email' isInvalid={formErrors.email ? true : false}>
                                            <Input {...field} type='email' name='email' placeholder='Email address' />
                                            <FormErrorMessage isInvalid={formErrors.email}>{formErrors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='password'>
                                    {({ field, form }: FieldProps) => (
                                        <FormControl id='password' isInvalid={formErrors.password ? true : false} marginTop='1em'>
                                            <Input {...field} type='password' name='password' placeholder='Password' />
                                            <FormErrorMessage isInvalid={formErrors.password}>{formErrors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button type='submit' marginTop='1em' width='100%' isLoading={isSubmitting}>
                                    Login
                                </Button>
                                <FormControl>
                                    <Flex justifyContent='center'>
                                        <FormHelperText>
                                            Don&apos;t have an account ?{' '}
                                            <Link to='/signup' style={{ fontWeight: 'bold' }}>
                                                Sign Up
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
