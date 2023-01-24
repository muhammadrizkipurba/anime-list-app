import React from 'react'

type SearchInputProps = {
  searchQuery: string;
  disabled: boolean;
  setSearchQuery: (title: string) => void;
  onSearch: () => void;
};

const SearchInput = ({disabled, searchQuery, setSearchQuery, onSearch}: SearchInputProps) => {
  
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setSearchQuery(target.value);
  };

  return (
    <div className='my-20'>
      <div className='flex flex-col md:flex-row items-center justify-center gap-4'>
        <input
          id="search-input"
          type="text"
          name="search-anime"
          placeholder="Anime title"
          data-testid="search-input"
          className="border border-1 rounded-lg py-2 px-4 w-full"
          value={searchQuery}
          onChange={(e) => onChangeHandler(e)}
          disabled={disabled}
        />
        <button onClick={onSearch} disabled={disabled} className="bg-blue-700 px-8 py-2 text-white rounded-lg w-full md:w-auto">
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchInput