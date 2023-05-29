import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { sessionModel } from '~entities/session';
import { conduitApi } from '~shared/api';

export function LoginPage() {
  const login = useMutation((userData: conduitApi.LoginData) =>
    conduitApi.Auth.login(userData),
  );

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <a href="/#">Need an account?</a>
            </p>

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              // TODO: add correct validation
              validationSchema={object().shape({
                email: string().required('requared'),
                password: string().required('requared'),
              })}
              // TODO: handle server errors
              onSubmit={async (values) => {
                const data = await login.mutateAsync({ user: values });
                sessionModel.sessionStore.getState().addToken(data.user.token);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <fieldset className="form-group">
                    <Field
                      name="email"
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" />
                  </fieldset>
                  <fieldset className="form-group">
                    <Field
                      name="password"
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign in
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
