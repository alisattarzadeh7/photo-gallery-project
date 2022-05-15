import type { NextPage } from 'next';
import React, { useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Button, IconButton } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import styles from './LayoutStyles.module.scss';
import { logout } from '../../redux/actions/LayoutAction';
import useSession from '../../hooks/useSession';
import PhotoMenu from '../PhotoMenu';

const Header: NextPage = () => {
    const { i18n, t } = useTranslation();
    const languageRef = useRef();
    const router = useRouter();
    const dispatch = useDispatch();
    const { token } = useSession();
    const changeLanguageHandler = async (lang: string) => {
        await router.push(router.asPath, router.asPath, { locale: lang });
        // @ts-ignore
        await i18n.changeLanguage(lang);
    };
    const handleLogout = async () => {
        await dispatch(logout());
        await router.push('/login');
    };

    const handleLanguageChange = (e) => {
        languageRef.current.handleClick(e);
    };

    return (
        <>
            <div className={styles.headerStyles}>

                <div style={{ flex: 1 }}>
                    {
                        token && <IconButton onClick={handleLogout}><PowerSettingsNewIcon color="danger" /></IconButton>
                    }
                    <Button
                        variant="outlined"
                        onClick={handleLanguageChange}
                        color="white"
                    >
                        {i18n.language}
                    </Button>
                    <PhotoMenu
                        ref={languageRef}
                        menuItems={[
                            { title: 'fa', onClick: () => changeLanguageHandler('fa') },
                            { title: 'en', onClick: () => changeLanguageHandler('en') },
                        ]}
                    />

                </div>
                <div className={styles.headerLinksStyles}>

                    {
                        !token
                        && (
                            <div className="flex">
                                <Button
                                    variant="contained"
                                    onClick={() => router.push('/login')}
                                >
                                    {t('login')}
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="outlined"
                                    onClick={() => router.push('/register')}
                                >

                                    {t('register')}
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Header;
