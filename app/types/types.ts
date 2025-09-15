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

  export interface CountriesResponse {
    get: "countries";
    parameters: {
        search: string,
    };
    errors:[];
    results: number;
    response:[]
  }