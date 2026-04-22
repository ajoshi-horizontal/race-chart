export type Country = {
    _id: string;
    Country: string;
    Population: number;
}

export type PopulationYearEntry = {
    Year: number;
    Countries: Country[];
}


