'use client'
import grades from '../assets_prod/grades.json';
import { useState } from "react";
import { Grade } from './types';
import './grades.module.css'; // Import CSS file for table component
import { v4 as uuidv4 } from 'uuid';

import React from 'react';
import useTableSearch from "@/app/hooks";

const HomePage = () => {
    const [data, setData] = useState(grades as Grade[]);
    const { searchTerm, searchResults, handleSearch } = useTableSearch(data as Grade[]);
    const [sortConfig, setSortConfig] = useState({ column: null, direction: 'asc' });

    const handleSort = (column: any) => {
        let direction = 'asc';
        if (sortConfig.column === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ column, direction });
    };

    const sortedData = searchResults.sort((a, b) => {
        if (sortConfig.column) {
            const aValue = a[sortConfig.column] ?? 0;
            const bValue = b[sortConfig.column] ?? 0;

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });

    return (
        <div className="table-container">
            <div className="search-container">
                <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." className="search-input"/>
            </div>
            <table className="custom-table">
                <thead>
                <tr>
                    <th onClick={() => handleSort('Studieprogramnavn')}>Studie</th>
                    <th onClick={() => handleSort('Institusjonsnavn')}>Institusjon</th>
                    <th>2023</th>
                    <th>2022</th>
                    <th>2021</th>
                    <th>2020</th>
                </tr>
                </thead>
                <tbody>
                {sortedData.map((row) => (
                    <tr key={uuidv4()}>
                        <td>{row.Studieprogramnavn} {row.Semesternavn === 'Vår' ? '(Vår)' : '(Høst)'}</td>
                        <td>{row.Institusjonsnavn}</td>
                        <td>{row.Krav[0].Poengkrav}</td>
                        <td>{row.Krav[1].Poengkrav}</td>
                        <td>{row.Krav[2].Poengkrav}</td>
                        <td>{row.Krav[3].Poengkrav}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomePage;
