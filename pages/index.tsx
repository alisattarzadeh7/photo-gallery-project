import { Button } from '@mui/material';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'swiper/css';
import { useRef, useState } from 'react';
import HomeMainSlider from '../shared/HomeMainSlider';
import { getAlbumByName, getAlbumsSSR } from '../Utility/Apis&Queries/apis';
import PhotoDialog from '../components/PhotoDialog';

interface HomeProps {
    albums: any[]
}

const Home: NextPage<HomeProps> = ({ albums }) => {
    const newGalleryRef = useRef();
    const [open, setOpen] = useState(false);
    const { t } = useTranslation('common');

    return (
        <div>
            <HomeMainSlider />
            <div className="flex full-width center">
                <h4>Galleries</h4>
            </div>
            <Button variant="contained" onClick={() => setOpen(true)}>add new gallery</Button>
            <PhotoDialog ref={newGalleryRef} handleOpen={setOpen} open={open} title="add new Gallery">
                hiii
            </PhotoDialog>
            <div className="flex center">
                {
                    albums.map((item) => (
                        <div key={item.id}>
                           <Button onClick={async () => await getAlbumByName(item.name)}>{item.name}</Button>
                        </div>
                    ))
                }
            </div>

        </div>

    );
};

export async function getServerSideProps({ locale, req }: any) {
    // Fetch data from external API
    const albums = await getAlbumsSSR({
        auth: {
            username: req.cookies.username,
            password: req.cookies.password,
        },
    });
    return { props: { albums, ...await serverSideTranslations(locale, ['common']) } };
}

export default Home;
