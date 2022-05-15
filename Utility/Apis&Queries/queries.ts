import { useQuery } from 'react-query';
import { getAlbums } from './apis';

export const useAlbums = (queryOptions:any) => useQuery('getAlbums', getAlbums, queryOptions);
