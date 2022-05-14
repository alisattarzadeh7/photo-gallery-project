import type { NextPage } from 'next';
import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styles from './LayoutStyles.module.scss';
import { logout } from '../../redux/actions/LayoutAction';
import useSession from '../../hooks/useSession';

const Header: NextPage = () => {
    const { i18n } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    const { token } = useSession();
    const changeLanguageHandler = async (lang:string) => {
        await router.push(router.asPath, router.asPath, { locale: lang });
        // @ts-ignore
        await i18n.changeLanguage(lang);
    };
    const handleLogout = async () => {
        await dispatch(logout());
        await router.push('/login');
    };

    return (
<>
        <div className={styles.headerStyles}>

            <div style={{ flex: 1 }}>
                <button onClick={() => changeLanguageHandler('fa')}>change lang to fa </button>
                <button onClick={() => changeLanguageHandler('en')}>change lang to en </button>

            </div>

            <div className={styles.headerLinksStyles}>
                {
                    token && <button onClick={handleLogout}>logout</button>
                }
                <div>
                    <Link href="/galleries/hi" locale={i18n.language}>
                        <a>gallery</a>
                    </Link>
                </div>
                <div>
                    <Link href="/register" locale={i18n.language}>
                        <a>register</a>
                    </Link>
                </div>
                <div>home</div>
                <div>home</div>
            </div>
        </div>
</>
);
};

export default Header;
