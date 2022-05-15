import { Api } from './__Instance';
import AxiosInstance from './AxiosInstance';

export const loginWithUsername = (params: { username: string, password: string }) => Api.call({
    url: '/login',
    data: params,
    method: 'post',
}, {
    showErrors: true,
    showSuccess: 'logged in successfully',
    returnData: true,
});

export const register = (params: { username: string, password: string, email: string }) => Api.call({
    url: '/register',
    data: params,
    method: 'post',
}, {
    showErrors: true,
    showSuccess: 'registeredSuccessfully',
});

export const getAlbums = () => Api.call({
    url: '/albums',
    method: 'get',
}, {
    returnData: true,
});

export const addAlbum = (params?: { name: string }) => Api.call({
    url: '/albums',
    data: params,
    method: 'post',
}, {
    showErrors: true,
    showSuccess: 'added successfully',
});
export const addNewPic = async (params: { name: string, data:{files:any, title:string, desc:string} }) => {
    const formData = new FormData();
    formData.append('file', params.data.files);
    formData.append('title', params.data.title);
    formData.append('desc', params.data.desc);
    const result = await AxiosInstance.post(`/album/${params.name}/pictures`, formData);
    console.log(result);
};

export const getAlbumsSSR = (requestOptions: any) => Api.call({
    url: '/albums',
    method: 'get',
    ...requestOptions,
}, {
    returnData: true,
});

export const getAlbumByName = (name: string) => Api.call({
    url: `/album/${name}`,
    method: 'get',
}, {
    returnData: true,
});
export const removeAlbumByName = (name: string) => Api.call({
    url: `/album/${name}`,
    method: 'delete',
}, {
    showErrors: true,
    showSuccess: 'deleted Successfully',
});

export const editAlbumName = (params: { name: string, newValue:string}) => Api.call({
    url: `/album/${params.name}`,
    method: 'put',
    data: { name: params.newValue },
}, {
    showErrors: true,
    showSuccess: 'deleted Successfully',
});

export const getAlbumPictures = (name: string) => Api.call({
    url: `/album/${name}/picture`,
    method: 'get',
    }, {
        returnData: true,
    });

export const getPictureById = (id: string | number) => Api.call({
    url: `/picture/${id}`,
    method: 'get',
    }, {
        returnData: true,
    });
