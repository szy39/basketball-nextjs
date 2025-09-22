// Basketball API Response Types
export interface BasketballApiResponse<T> {
  get: string;
  parameters: [];
  errors: [];
  results: number;
  response: T;
}

export interface LeagueSearchParams {
  season?: string | number;
  country?: string;
  name?: string;
}

// Season Types
export type SeasonYear = string | number;

export interface SeasonsResponse {
  get: "seasons";
  parameters: [];
  errors: [];
  results: number;
  response: SeasonYear[];
}

// Season Card için kullanacağımız interface
export interface SeasonCard {
  id: string | number;
  year: SeasonYear;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface SeasonGamesTypes {
    params: {
      games: string;
    };
  }

 export interface SeasonGamesProps {
    season: string;
  }

// Country Types
export interface Country {
  id: number;
  name: string;
  code: string;
  flag: string;
  description?:string
}

export interface CountriesResponse {
  get: "countries";
  parameters: {
    search: string;
  };
  errors: [];
  results: number;
  response: Country[];
}
export interface CountriesCardProps {
    countries: CountryCard[];
    loading?: boolean;
    error?: string | null;
  }

// Country Card için kullanacağımız interface
export interface CountryCard {
  id: number;
  name: string;
  code: string;
  flag: string;
  description?: string;
}

export interface LeaguesResponse {
    get: "leagues";
    parameters: {
        id: string | number;
        season: string | number;
    }
    errors:[];
    results:number;
    response:League[]
}
// API'den gelen League.seasons için
export interface LeagueSeason {
    season: string | number;
    start: string;
    end: string;
    coverage: {
        games: {
            [key: string]: boolean;
        };
        standings: boolean;
        players: boolean;
        odds: boolean;
    };
}

// SeasonCard için (seasons sayfasında kullanılan)
export interface Season {
    year: string | number;
}

export type League = {
    country: Country;
    id: number | string;
    logo: string;
    name: string;
    type: string;
    seasons: LeagueSeason[];
}
export interface LeagueContainerProps {
    response:League[]
}

// Team Types
export interface Team {
  id: number;
  name: string;
  national: boolean;
  logo: string | null;
  country: Country;
}

export interface TeamSearchParams {
  id?: number;
  name?: string;
  country_id?: number;
  country?: string;
  league?: number;
  season?: string;
  search?: string;
}

export interface TeamsResponse {
  get: "teams";
  parameters: TeamSearchParams;
  errors: [];
  results: number;
  response: Team[];
}