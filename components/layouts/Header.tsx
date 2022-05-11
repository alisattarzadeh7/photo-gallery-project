import type {NextPage} from 'next'
import styles from "./LayoutStyles.module.scss"
import React from "react";
import {useTranslation} from "next-i18next";
import Link from "next/link";
import {useRouter} from "next/router";
import useSession from "../../hooks/useSession";
const Header: NextPage = () => {

    const { i18n } = useTranslation()
    const router = useRouter()

    const changeLanguageHandler = async (lang:string) =>
    {
        await router.push(router.asPath, router.asPath, { locale: lang })
        await i18n.changeLanguage(lang)
    }
    const isLogin = useSession();
    return (<>
        <div className={styles.headerStyles}>

            <div style={{flex:1}}>
                <button onClick={()=>changeLanguageHandler('fa')}>change lang to fa </button>
                <button onClick={()=>changeLanguageHandler('en')}>change lang to en </button>
            </div>

            <div className={styles.headerLinksStyles}>
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
    </>)
}

export default Header