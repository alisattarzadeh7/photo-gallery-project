import { useQuery } from 'react-query';
import { getAlbumPictures, getAlbums } from './apis';

export const useAlbums = (queryOptions:any) => useQuery('getAlbums', getAlbums, queryOptions);
export const useAlbumPictureList = (name:string) => useQuery(['getAlbumPictures', name], () => getAlbumPictures(name));
