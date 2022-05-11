import { useRouter } from 'next/router'
import { GetStaticPaths } from 'next/types'
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function IndexPage(props) {

    const { t,i18n } = useTranslation('common');
    console.log('i18n : ',i18n.language)
    return (
        <div>
            {t('hello')}
        </div>
    )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async ({ locales }: any) => {
    return {
        paths: [
            // if no `locale` is provided only the defaultLocale will be generated
            { params: { slug: 'hello' }, locale: 'en' },
            { params: { slug: 'hello' }, locale: 'fa' },
        ],
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps({ locale }) {
    console.log(locale)

    return { props: { ...await serverSideTranslations(locale, ['common']),locale } }
}
