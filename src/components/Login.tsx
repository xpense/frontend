import React, { useState, useContext } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useToast, Box, Flex, FormLabel, FormControl, FormErrorMessage, FormHelperText, Input, Button } from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps, FormikProps } from 'formik';

import { LoginRequest } from '../api/types';
import { ApiContext } from '../App';

type Props = Record<string, never>;
type LoginFormErrors = Partial<LoginRequest>;

export const Login: React.FC<Props> = () => {
    const api = useContext(ApiContext);
    const history = useHistory();
    const location = useLocation<{ email: string }>();
    const toast = useToast();

    const [formErrors, setFormErrors] = useState<LoginFormErrors>({});

    const initialLoginFormValues: LoginRequest = {
        email: location.state ? location.state.email : '',
        password: '',
    };

    const validate = ({ email, password }: LoginRequest) => {
        const errors: LoginFormErrors = {};

        if (email.length <= 0) {
            errors.email = 'Missing email';
        }

        if (password.length <= 0) {
            errors.password = 'Missing password';
        }

        setFormErrors(errors);
        return formErrors;
    };

    const onSubmit = async (values: LoginRequest, { setSubmitting }: FormikHelpers<LoginRequest>) => {
        setSubmitting(true);

        try {
            const resp = await api.login(values);
            console.log(resp);
            history.push('/home');
        } catch (error) {
            toast({
                title: 'An error occurred.',
                description: error.message ?? "Coudln't log in",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction={'row'} align={'center'} justify={'center'} width='100vw' height='100vh'>
            <Box width={['90%']} maxWidth='500px' backgroundColor='blue'>
                <Formik
                    initialValues={initialLoginFormValues}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validate={validate}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }: FormikProps<LoginRequest>) => (
                        <Form>
                            <Flex direction={'column'} align={'center'} justify={'center'} padding='1em'>
                                <Field name='email'>
                                    {({ field }: FieldProps) => (
                                        <FormControl id='email' isInvalid={formErrors.email ? true : false}>
                                            <FormLabel>Email</FormLabel>
                                            <Input {...field} type='email' name='email' placeholder='john@doe.com' />
                                            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='password'>
                                    {({ field }: FieldProps) => (
                                        <FormControl id='password' isInvalid={formErrors.password ? true : false} marginTop='1em'>
                                            <FormLabel>Password</FormLabel>
                                            <Input {...field} type='password' name='password' placeholder='examplePassword123!{}' />
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
