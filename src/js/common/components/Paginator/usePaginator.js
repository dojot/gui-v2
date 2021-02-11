import { useEffect, useState, useCallback } from 'react';

export default (type = 'server') => {
  const [paginatorData, setInternalPaginationData] = useState({
    data: [],
    pageData: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    disabled: false,
  });

  useEffect(() => {
    if (type === 'client') {
      const start = paginatorData.pageSize * (paginatorData.currentPage - 1);

      const end =
        paginatorData.currentPage === 1 ? paginatorData.pageSize : start + paginatorData.pageSize;

      const paginatedData = paginatorData.data.slice(start, end);

      const totalPages = Math.ceil(paginatorData.data.length / paginatorData.pageSize);
      setInternalPaginationData(state => ({
        ...state,
        pageData: paginatedData,
        totalPages,
      }));
      return;
    }
    setInternalPaginationData(state => ({
      ...state,
      pageData: paginatorData.data,
    }));
  }, [type, paginatorData.currentPage, paginatorData.pageSize, paginatorData.data]);

  const setPaginatorData = useCallback(
    data => {
      if (type === 'client') {
        setInternalPaginationData(state => ({ ...state, data }));
        return;
      }

      setInternalPaginationData(state => ({
        ...state,
        ...data,
        disabled: false,
      }));
    },
    [type],
  );

  const setCurrentPage = useCallback(currentPage => {
    setInternalPaginationData(state => ({ ...state, currentPage }));
  }, []);

  const setPageSize = useCallback(pageSize => {
    setInternalPaginationData(state => ({
      ...state,
      pageSize,
      currentPage: 1,
    }));
  }, []);

  const setDisablePaginator = useCallback(disabled => {
    setInternalPaginationData(state => ({ ...state, disabled }));
  }, []);

  return {
    paginatorData,
    setPaginatorData,
    setCurrentPage,
    setPageSize,
    setDisablePaginator,
  };
};
