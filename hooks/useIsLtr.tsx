import type {NextPage} from 'next'
import {useTranslation} from "next-i18next";

const useIsLtr = () => {
    const { i18n } = useTranslation()
    return i18n.language === 'en'
}

export default useIsLtr