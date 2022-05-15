import { Button, IconButton } from '@mui/material';
import type { NextPage } from 'next';
import { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useQueryClient } from 'react-query';
import EditIcon from '@mui/icons-material/Edit';
import styles from './HomeAlbumDetail.module.scss';
import PhotoDialog from '../components/PhotoDialog';
import AddNewPic from './AddNewPic';
import { editAlbumName, removeAlbumByName } from '../Utility/Apis&Queries/apis';
import PhotoInput from '../components/PhotoInput';

interface HomeAlbumDetailProps {
    albumInfo: {
        id: number | string,
        name: string,
        picture: any[]
    },
    modalOpen: (state: boolean) => void
}

const HomeAlbumDetail: NextPage<HomeAlbumDetailProps> = ({ albumInfo, modalOpen }) => {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState<string>(albumInfo.name);

    const handleRemoveGallery = async () => {
        const result = await removeAlbumByName(albumInfo.name);
        if (result) {
            modalOpen(false);
            const preQueryState: any[] | any = await queryClient.getQueryData('getAlbums');
            await queryClient.setQueryData('getAlbums', preQueryState.filter((item:typeof albumInfo) => item.name !== albumInfo.name));
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
            await queryClient.setQueryData('getAlbums', [...preQueryState.filter((item:typeof albumInfo) => item.name !== albumInfo.name), { ...albumInfo, name: newTitle }]);
        }
    };

    return (
        <div className={styles.container}>
            <IconButton onClick={handleRemoveGallery}><DeleteOutlineIcon color="danger" /></IconButton>
            <IconButton onClick={() => setEditMode(!editMode)}><EditIcon color="secondary" /></IconButton>
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
            <Button onClick={() => setOpen(true)}>new photo</Button>
            <PhotoDialog handleOpen={setOpen} open={open} title="add new Picture">
                <AddNewPic albumName={albumInfo.name} />
            </PhotoDialog>

        </div>
    );
};

export default HomeAlbumDetail;
