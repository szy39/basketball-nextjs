// Basketball API Response Types
export interface BasketballApiResponse<T> {
  get: string;
  parameters: any[];
  errors: any[];
  results: number;
  response: T;
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
    response:[]
}
export type League = {
    country:Country[]
    id: number | string;
    logo:string
    name:string
    type:string
    seasons:[]
}
export interface LeagueContainerProps {
    response:League[]
}