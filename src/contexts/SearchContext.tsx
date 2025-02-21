import { createContext, FC, ReactNode, useState } from "react";

interface ContextProps {
  searchCategoryId?: string;
  searchName?: string;
  handleChangeSearchCategoryId: (searchCategoryId: string | undefined) => void;
  handleChangeSearchName: (searchName: string | undefined) => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const SearchContext = createContext<ContextProps | undefined>(undefined);

const SearchContextProvider: FC<ProviderProps> = ({ children }) => {
  const [searchCategoryId, setSearchCategoryId] = useState<string>();
  const [searchName, setSearchName] = useState<string>();

  const handleChangeSearchCategoryId = (
    inputSearchCategory: string | undefined
  ) => {
    setSearchCategoryId(inputSearchCategory);
  };

  const handleChangeSearchName = (inputSearchName: string | undefined) => {
    setSearchName(inputSearchName);
  };

  return (
    <SearchContext.Provider
      value={{
        searchCategoryId,
        searchName,
        handleChangeSearchCategoryId,
        handleChangeSearchName,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
