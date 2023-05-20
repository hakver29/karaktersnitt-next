import React, { useState } from 'react';
import { Grade } from "@/app/types";


const useTableSearch = (data: Grade[]) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(data);

    const handleSearch = (event: any) => {
        const { value } = event.target;
        setSearchTerm(value);

        const filteredData = data.filter((row) => {
            return row.Studieprogramnavn.toLowerCase().includes(value.toLowerCase()) || row.Institusjonsnavn.toLowerCase().includes(value.toLowerCase());
        });

        setSearchResults(filteredData);
    };

    return {
        searchTerm,
        searchResults,
        handleSearch,
    };
};

export default useTableSearch;
