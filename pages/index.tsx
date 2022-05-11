import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useTranslation } from 'next-i18next';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import 'swiper/css';
import HomeMainSlider from "../shared/HomeMainSlider";

const Home: NextPage = () => {
    const { t } = useTranslation('common');

    return (
    <div>
       <HomeMainSlider/>
    </div>
  )
}
export const getStaticProps = async ({ locale }:any) => ({
    props: {
        // @ts-ignore
        ...await serverSideTranslations(locale, ['common']),
    },
})


export default Home

