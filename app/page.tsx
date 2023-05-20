'use client'
import grades from '../assets/grades.json';
import { useState } from "react";
import { Grade } from './types';
import './grades.module.css'; // Import CSS file for table component
import { v4 as uuidv4 } from 'uuid';

import React from 'react';
import useTableSearch from "@/app/hooks";

export enum GradeType {
    'PRIMARY',
    'ORDINARY'
}

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

    const regexSortedData = sortedData.filter((row) => {
        return row.Institusjonskode !== '0217';
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
                    <th onClick={() => handleSort('Poenggrense primærkvote')}>Primær</th>
                    <th onClick={() => handleSort('Poenggrense ordinær kvote')}>Ordinær</th>
                    <th onClick={() => handleSort('Årstall')}>År</th>
                </tr>
                </thead>
                <tbody>
                {regexSortedData.map((row) => (
                    <tr key={uuidv4()}>
                        <td>{row.Studieprogramnavn} {row.Semesternavn === 'Vår' ? '(Vår)' : '(Høst)'}</td>
                        <td>{row.Institusjonsnavn}</td>
                        <td>{row["Poenggrense primærkvote"]}</td>
                        <td>{row["Poenggrense ordinær kvote"]}</td>
                        <td>{row['Årstall']}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );    const calculateAcceptanceGrade = (grade: Grade, type: GradeType) => {
        if(grade.Karakterpoeng === '0' || grade["Søkere totalt"] === '0' || grade["Opptakspoeng totalt"] === '0'){
            return 'Alle';
        }
        if(type === GradeType.ORDINARY){
            return (Number(grade.Karakterpoeng) / (Number(grade["Søkere totalt"]) === 0 ? 1 : Number(grade["Søkere totalt"]))).toFixed(2);
        }
        return (Number(grade["Opptakspoeng totalt"]) / (Number(grade["Søkere totalt"]) === 0 ? 1 : Number(grade["Søkere totalt"]))).toFixed(2);
    }
};

export default HomePage;
