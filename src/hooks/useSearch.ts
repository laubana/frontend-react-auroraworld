import { useContext } from "react";

import { SearchContext } from "../contexts/SearchContext";

const useSearch = () => {
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error("Context must be called in the provider.");
  }

  return searchContext;
};

export default useSearch;
