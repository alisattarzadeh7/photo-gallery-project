import { Api } from './__Instance';

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
    showErrors: true,
    showSuccess: 'registeredSuccessfully',
});

export const addAlbum = (params?: { name: string }) => Api.call({
    url: '/albums',
    data: { name: 'actors' },
    method: 'post',
}, {
    showErrors: true,
    showSuccess: 'registeredSuccessfully',
});

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
