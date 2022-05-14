import { Button } from '@mui/material';
import { Formik } from 'formik';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import styles from './registerStyles.module.scss';
import PhotoInput from '../../components/PhotoInput';
import { register } from '../../Utility/Apis&Queries/apis';
import { loginUser } from '../../Utility/jwtServices';

const index: NextPage = () => {
    const router = useRouter();

    return (
        <div className={`${styles.registerContainer} flex center middle`}>
            <div className={styles.registerFormBox}>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.username) {
                            errors.username = 'Required';
                        }
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        const { username, password, email } = values;
                        const result = await register({
                            username,
                            password,
                            email,
                        });
                        if (result) {
                            const response = await loginUser(username, password);
                            if (response) {
                                await router.push('/');
                            }
                        }
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <PhotoInput
                                label="email"
                                variant="outlined"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className="mt-10"
                            />
                            {errors.email && touched.email && errors.email}
                            <PhotoInput
                                label="username"
                                variant="outlined"
                                type="username"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                className="mt-10"
                            />
                            {errors.username && touched.username && errors.username}
                            <PhotoInput
                                label="password"
                                variant="outlined"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-10"
                                value={values.password}
                            />
                            {errors.password && touched.password && errors.password}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-10"
                                variant="contained"
                            >
                                Submit
                            </Button>

                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default index;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        // @ts-ignore
        ...await serverSideTranslations(locale, ['common']),
    },
});
