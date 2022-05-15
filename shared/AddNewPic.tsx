import type { NextPage } from 'next';
import { DropzoneArea } from 'material-ui-dropzone';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useQueryClient } from 'react-query';
import PhotoInput from '../components/PhotoInput';
import { addNewPic } from '../Utility/Apis&Queries/apis';

interface AddNewPicProps{
    albumName:string,
    modalOpen:(state:boolean)=>void
}

const AddNewPic: NextPage<AddNewPicProps> = ({ albumName, modalOpen }) => {
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [files, setFiles] = useState();
    const queryClient = useQueryClient();

    const handleAddNewPic = async () => {
        const result = await addNewPic({ name: albumName, data: { title, desc, files } });
        if (result) {
            await queryClient.invalidateQueries('getAlbumPictures');
            modalOpen(false);
        }
    };

    const handleAddPic = (files:any) => {
        setFiles(files[0]);
    };

    return (
        <div className="flex column">
            <div className="mt-10 full-width">
                <PhotoInput
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="title"
                    variant="outlined"
                />
            </div>
            <div className="mt-10 full-width">
                <PhotoInput
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    label="description"
                    variant="outlined"
                />
            </div>
            <div className="mt-10">
                <DropzoneArea
                    filesLimit={1}
                    acceptedFiles={['image/jpeg', 'image/jpg', 'image/png', 'image/bmp']}
                    maxFileSize={5000000}
                    onChange={handleAddPic}
                />
            </div>
            <div className="mt-10">
                <Button onClick={handleAddNewPic}>ADD</Button>
            </div>
        </div>
    );
};

export default AddNewPic;
