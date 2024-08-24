import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../lib/axiosClient';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

const LoginForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  });

  const navigate = useNavigate();
  const signIn = useSignIn();
  const toast = useToast();
  const isAuthenticated = useIsAuthenticated();

  const [submitting,setSubmitting] = useState(false);
  const [errors,setErrors] = useState("");

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/login', {
        email: values.email,
        password: values.password
      });
      console.log(response);
      const data = response.data;
      if (response) {
        if (response.status === 200) {
          if (signIn({
            auth: {
              token: data.access_token,
              refresh: data.refresh_token,
              type: 'Bearer',
            },
            userState: { 
              email: values.email
            },
          })) {
            // toast.success('Login successful!');
            navigate('/report'); // Redirect to protected route
          } else {
            toast.error('There is Something Wrong While Loging in!');
          }
        } else {
          setErrors({ submit: data.message || 'An error occurred' });
          toast.error(data.message || 'An error occurred');
        }
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred' });
      toast.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <button
              disabled={submitting}
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {submitting ? "Loading..." : "Login"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
