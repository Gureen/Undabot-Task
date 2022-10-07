import { useCallback, useEffect, useState } from 'react';

type FetchFunction = <D>(url: string) => [boolean, D];

export const useFetch: FetchFunction = (url: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);

  const fetchSurveyData = useCallback(async () => {
    try {
      const response = await fetch(url);

      const responseJson = await response.json();
      setLoading(false);
      setData(responseJson);
    } catch (error) {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchSurveyData();
  }, [fetchSurveyData]);

  return [loading, data];
};
