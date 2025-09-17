import { CountriesResponse, LeagueSearchParams, LeaguesResponse, SeasonsResponse } from '../types/types';

const API_BASE_URL = "https://v1.basketball.api-sports.io";
const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "c676c73bee2956cd3998d54d147b0bdc";

// Ortak header'lar
const getHeaders = () => ({
    "x-rapidapi-host": "v1.basketball.api-sports.io",
    "x-rapidapi-key": API_KEY
});

// Ortak fetch fonksiyonu
const apiRequest = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, {
        method: "GET",
        headers: getHeaders()
    });
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
};


export const getAllSeasons = async (): Promise<SeasonsResponse> => {
    return apiRequest<SeasonsResponse>(`${API_BASE_URL}/seasons`);
};


export const getAllCountries = async (): Promise<CountriesResponse> => {
    return apiRequest<CountriesResponse>(`${API_BASE_URL}/countries`);
};


export const getAllLeagues = async (params?: LeagueSearchParams): Promise<LeaguesResponse> => {
    let url = `${API_BASE_URL}/leagues`;
    const queryParams = new URLSearchParams();
    
    if (params?.season) {
        queryParams.append('season', String(params.season));
    }
    
    if (params?.country) {
        queryParams.append('country', params.country);
    }
    
    if (params?.name) {
        queryParams.append('search', params.name);
    }
    
    if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
    }
    
    return apiRequest<LeaguesResponse>(url);
};