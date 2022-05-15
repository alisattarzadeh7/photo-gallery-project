import type { NextPage } from 'next';
import { Button } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { memo, useState } from 'react';
import PhotoInput from '../components/PhotoInput';
import { addAlbum } from '../Utility/Apis&Queries/apis';

const HomeAddNewAlbum: NextPage = () => {
    const [newAlbum, setNewAlbum] = useState('');
    const queryClient = useQueryClient();

    // console.log(albumsList);
    const handleAddNewAlbum = async () => {
        const result = await addAlbum({
            name: newAlbum,
        });
        if (result) setNewAlbum('');
    };

    const albumMutation = useMutation(handleAddNewAlbum, {
        onSuccess: async () => {
            const preQueryState:any[] | any = await queryClient.getQueryData('getAlbums');
            await queryClient.setQueryData('getAlbums', [...preQueryState, { name: newAlbum }]);
        },
    });

    return (
        <>
            <div style={{ paddingTop: 20 }} className="flex column">
                <PhotoInput
                    value={newAlbum}
                    onChange={(e) => setNewAlbum(e.target.value)}
                    label="name"
                    variant="outlined"
                />
                <Button variant="contained" style={{ marginTop: 20 }} onClick={() => albumMutation.mutate()}>ok</Button>
            </div>
        </>
    );
};

export default memo(HomeAddNewAlbum);
