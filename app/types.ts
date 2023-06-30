export interface Grade {
    "Studieprogramnavn": string;
    "Institusjonsnavn": string;
    "Semesternavn": string;
    "Avdelingsnavn": string;
    "Krav": YearlyRequirements[];
}


export interface YearlyRequirements {
    "Årstall": number;
    "Poenggrense primærkvote": string;
    "Poenggrense ordinær kvote": string;
    "Poengkrav": string;
}

