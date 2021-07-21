import { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';

export const useFetch = (debouncedSearchTerm: string) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(
    () => {
      const getRepositories = async (search: string) => {
        if (search) {
          try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}?q=${search}`);
            const { items } = await response.json();
            setResults(items);
            setIsError(false);
          }
          catch (e) {
            setIsError(true);
          }
          finally {
            setIsLoading(false);
          }
        }
      }
      getRepositories(debouncedSearchTerm);
    },
    [debouncedSearchTerm]
  );
  return { results, isError, isLoading }
}
