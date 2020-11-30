import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, FormControl, FormErrorMessage, FormHelperText, Input, Button } from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps, FormikProps } from 'formik';

import { LoginRequest } from './api/types';

type Props = Record<string, never>;
type LoginFormErrors = Partial<LoginRequest>;

const initialLoginFormValues: LoginRequest = {
    email: '',
    password: '',
};

export const Login: React.FC<Props> = () => {
    const [formErrors, setFormErrors] = useState<LoginFormErrors>({});

    const validate = ({ email, password }: LoginRequest) => {
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

    const onSubmit = (values: LoginRequest, { setSubmitting }: FormikHelpers<LoginRequest>) => {
        setSubmitting(true);
        console.log('submit');
        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
    };

    return (
        <Flex direction={'row'} align={'center'} justify={'center'} width='100vw' height='100vh'>
            <Box width='50%' height='50%' backgroundColor='blue'>
                <Formik initialValues={initialLoginFormValues} validate={validate} onSubmit={onSubmit}>
                    {({ isSubmitting }: FormikProps<LoginRequest>) => (
                        <Form>
                            <Flex direction={'column'} align={'center'} justify={'center'} padding='1em'>
                                <Field name='email'>
                                    {({ field }: FieldProps) => (
                                        <FormControl id='email' isInvalid={formErrors.email ? true : false}>
                                            <Input {...field} type='email' name='email' placeholder='Email address' />
                                            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='password'>
                                    {({ field }: FieldProps) => (
                                        <FormControl id='password' isInvalid={formErrors.password ? true : false} marginTop='1em'>
                                            <Input {...field} type='password' name='password' placeholder='Password' />
                                            <FormErrorMessage>{formErrors.password}</FormErrorMessage>
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
