import { Button } from '@mui/material';
import { Formik } from 'formik';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import styles from './loginStyles.module.scss';
import PhotoInput from '../../components/PhotoInput';
import { loginUser } from '../../Utility/jwtServices';
import SessionLayout from '../../components/layouts/SessionLayout';

const index: NextPage = () => {
    const router = useRouter();

    return (
        <SessionLayout>
            <div className={`${styles.loginContainer} flex center middle`}>
                <div className={styles.loginFormBox}>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.username) {
                                errors.username = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            const { username, password } = values;

                            const result = await loginUser(username, password);
                            if (result) {
                                await router.push('/');
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
        </SessionLayout>
    );
};

export default index;

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        // @ts-ignore
        ...await serverSideTranslations(locale, ['common']),
    },
});
