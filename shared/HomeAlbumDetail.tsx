import { Button, Divider, IconButton } from '@mui/material';
import type { NextPage } from 'next';
import { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useQueryClient } from 'react-query';
import EditIcon from '@mui/icons-material/Edit';
import styles from './HomeAlbumDetail.module.scss';
import PhotoDialog from '../components/PhotoDialog';
import AddNewPic from './AddNewPic';
import { editAlbumName, removeAlbumByName, removePictureById } from '../Utility/Apis&Queries/apis';
import PhotoInput from '../components/PhotoInput';
import { useAlbumPictureList } from '../Utility/Apis&Queries/queries';

interface HomeAlbumDetailProps {
    albumInfo: {
        id: number | string,
        name: string,
        pictures: any[]
    },
    modalOpen: (state: boolean) => void
}

const HomeAlbumDetail: NextPage<HomeAlbumDetailProps> = ({ albumInfo, modalOpen }) => {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState<string>(albumInfo.name);
    const { data: pictureList } = useAlbumPictureList(albumInfo.name);

    const handleRemoveGallery = async () => {
        const result = await removeAlbumByName(albumInfo.name);
        if (result) {
            modalOpen(false);
            const preQueryState: any[] | any = await queryClient.getQueryData('getAlbums');
            await queryClient.setQueryData('getAlbums', preQueryState.filter((item: typeof albumInfo) => item.name !== albumInfo.name));
        }
    };

    const handleRemovePic = async (picId:number) => {
        const result = await removePictureById(picId);
        if (result) {
            const preQueryState: any[] | any = await queryClient.getQueryData(['getAlbumPictures', albumInfo.name]);
            console.log({ ...preQueryState, results: preQueryState.results.filter((item:any) => item.id !== picId) });
            await queryClient.setQueryData(['getAlbumPictures', albumInfo.name],
                { ...preQueryState, results: preQueryState.results.filter((item:any) => item.id !== picId) });
        }
    };

    const handleEditGallery = async () => {
        const result = await editAlbumName({
            name: albumInfo.name,
            newValue: newTitle,
        });
        if (result) {
            modalOpen(false);
            const preQueryState: any[] | any = await queryClient.getQueryData('getAlbums');
            await queryClient.setQueryData('getAlbums', [
                ...preQueryState.filter((item: typeof albumInfo) => item.name !== albumInfo.name), {
                    ...albumInfo,
                    name: newTitle,
                },
            ]);
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <IconButton onClick={handleRemoveGallery}><DeleteOutlineIcon color="danger" /></IconButton>
                <IconButton onClick={() => setEditMode(!editMode)}><EditIcon color="secondary" /></IconButton>
            </div>
            {
                editMode
                && (
                    <div className="mt-10 full-width">
                        <PhotoInput
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            label="title"
                            variant="outlined"
                        />
                        <div className="mt-10">
                            <Button onClick={handleEditGallery}>Edit</Button>
                        </div>
                    </div>
                )
            }
            <Divider />
            <div className={styles.imagesContainer}>
                {
                    pictureList && pictureList.results.map((item: any) => (
                        <div className={styles.imagesBox}>
                            <div className="flex middle">
                                <IconButton onClick={() => handleRemovePic(item.id)}><DeleteOutlineIcon color="danger" /></IconButton>
                            </div>
                            <img key={item.id} src={item.img} />
                        </div>
                    ))
                }
            </div>
            <Button onClick={() => setOpen(true)}>new photo</Button>
            <PhotoDialog handleOpen={setOpen} open={open} title="add new Picture">
                <AddNewPic albumName={albumInfo.name} modalOpen={setOpen} />
            </PhotoDialog>

        </div>
    );
};

export default HomeAlbumDetail;
