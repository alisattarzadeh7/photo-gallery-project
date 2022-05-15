import { Button } from '@mui/material';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'swiper/css';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import HomeMainSlider from '../shared/HomeMainSlider';
import { getAlbumByName, getAlbumsSSR } from '../Utility/Apis&Queries/apis';
import PhotoDialog from '../components/PhotoDialog';
import { useAlbums } from '../Utility/Apis&Queries/queries';
import HomeAddNewAlbum from '../shared/HomeAddNewAlbum';
import HomeAlbumDetail from '../shared/HomeAlbumDetail';

interface HomeProps {
    albums: any[]
}

interface modalProps {
    content: any,
    title: string
}

const Home: NextPage<HomeProps> = ({ albums }) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation('common');
    const [modalProps, setModalProps] = useState<modalProps>({
        content: '',
        title: '',
    });
    const { data: albumsList } = useAlbums({
        initialData: albums,
    });

    const handleShowAlbumDetail = async (item) => {
        const result = await getAlbumByName(item.name);
        if (result) {
            setModalProps({
                title: `galley ${item.name}`,
                content: <HomeAlbumDetail albumInfo={result} modalOpen={setOpen} />,
            });
            setOpen(true);
        }
    };
    const handleAddNewAlbum = () => {
        setOpen(true);
        setModalProps({
            title: 'add new Gallery',
            content: <HomeAddNewAlbum />,
        });
    };

    return (
        <div>
            <HomeMainSlider />
            <div className="flex full-width center">
                <h4>Galleries</h4>
            </div>

            <PhotoDialog handleOpen={setOpen} open={open} title={modalProps.title}>
                {modalProps.content}
            </PhotoDialog>
            <div className="flex center" style={{ minHeight: 200 }}>
                {
                    albumsList && albumsList.map((item) => (
                        <div key={item.id}>
                            <Button onClick={() => handleShowAlbumDetail(item)}>{item.name}</Button>
                        </div>
                    ))
                }
                &nbsp;
                <Button variant="outlined" onClick={handleAddNewAlbum} style={{ height: 40 }}><AddIcon /></Button>
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
