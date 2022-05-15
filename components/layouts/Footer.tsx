import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import styles from './LayoutStyles.module.scss';

const Footer: NextPage = () => {
    const { t } = useTranslation('common');
    return (
        <div className={styles.footerStyles}>
            {t('footer')}
        </div>
    );
};

export default Footer;
