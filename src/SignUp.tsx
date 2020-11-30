import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage, FormikValues, FormikHelpers, FieldProps, FormikErrors, FormikProps } from 'formik';

type SignUpProps = Record<string, unknown>;

export type SignUpFormValues = {
    email: string;
    password: string;
    passwordRepeat: string;
};

type SignUpFormErrors = {
    email?: string;
    password?: string;
    passwordRepeat?: string;
};

export const SignUp = (props: SignUpProps) => {
    const [formErrors, setFormErrors] = useState<SignUpFormErrors>({});

    const validate = ({ email, password, passwordRepeat }: SignUpFormValues) => {
        const errors: SignUpFormErrors = {};

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
                <Formik initialValues={{ email: '', password: '', passwordRepeat: '' }} validate={validate} onSubmit={onSubmit}>
                    {({ isSubmitting }: FormikProps<SignUpFormValues>) => (
                        <Form>
                            <Flex direction={'column'} align={'center'} justify={'center'} padding='1em'>
                                <Field name='email'>
                                    {({ field, form }: FieldProps<string, SignUpFormValues>) => (
                                        <FormControl id='email' isInvalid={formErrors.email ? true : false}>
                                            <Input {...field} type='email' name='email' placeholder='Email address' />
                                            <FormErrorMessage isInvalid={formErrors.email}>{formErrors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='password'>
                                    {({ field, form }: FieldProps<string, SignUpFormValues>) => (
                                        <FormControl id='password' isInvalid={formErrors.password ? true : false} marginTop='1em'>
                                            <Input {...field} type='password' name='password' placeholder='Password' />
                                            <FormErrorMessage isInvalid={formErrors.password}>{formErrors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='passwordRepeat'>
                                    {({ field, form }: FieldProps<string, SignUpFormValues>) => (
                                        <FormControl
                                            id='passwordRepeat'
                                            isInvalid={formErrors.passwordRepeat ? true : false}
                                            marginTop='1em'
                                        >
                                            <Input {...field} type='password' name='passwordRepeat' placeholder='Repeat Password' />
                                            <FormErrorMessage isInvalid={formErrors.passwordRepeat}>
                                                {formErrors.passwordRepeat}
                                            </FormErrorMessage>
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
