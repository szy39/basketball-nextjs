import { CountriesResponse, LeaguesResponse, SeasonsResponse } from '../types/types';

const API_BASE_URL = "https://v1.basketball.api-sports.io";
const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "c676c73bee2956cd3998d54d147b0bdc";

// Season API call
export const getAllSeasons = async (): Promise<SeasonsResponse> => {
    const response = await fetch(`${API_BASE_URL}/seasons`, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "v1.basketball.api-sports.io",
            "x-rapidapi-key": API_KEY
        }
    });
    
    if (!response.ok) {
        throw new Error(`Seasons could not be loaded: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
};

export const getAllCountries = async():Promise<CountriesResponse>=>{
    const response = await fetch(`${API_BASE_URL}/countries`,{
        method:"GET",
        headers:{
            "x-rapidapi-host": "v1.basketball.api-sports.io",
            "x-rapidapi-key": API_KEY
        }
    });
    
    if (!response.ok) {
        throw new Error(`Countries could not be loaded: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
}

export const getAllLeagues = async(season?: number | string): Promise<LeaguesResponse> => {
    let url = `${API_BASE_URL}/leagues`;
    if (season) {
        url += `?season=${season}`;
    }
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "v1.basketball.api-sports.io",
            "x-rapidapi-key": API_KEY
        }
    });
    if (!response.ok) {
        throw new Error(`leagues could not be loaded: ${response.status} ${response.statusText}`);
    }
    return response.json();
}