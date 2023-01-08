import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const QUERY_PARAM_ARTISTS_IDS = 'art-ids';
export const MAX_SELECTED_OPTIONS = 5;

export const getArtistsIdsQuery = (value: number[] = []) => {
  return value.length ? `?${QUERY_PARAM_ARTISTS_IDS}=${value.join(',')}` : '';
};

export const useArtistsIDs = () => {
  const [value, setValue] = useState<number[]>([]);
  const location = useLocation();

  const urlSearchParams = new URLSearchParams(location.search);
  const artIds = urlSearchParams.get(QUERY_PARAM_ARTISTS_IDS) || '';

  useEffect(() => {
    setValue(artIds ? artIds.split(',').slice(0, 10).map(Number) : []);
  }, [artIds]);

  return value;
};
