import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

export interface CityOption {
    name: string;
    country: string;
    state?: string;
    lat: number;
    lon: number;
    local_names?: { fa?: string; en?: string };
}

export interface CurrentWeather {
    name: string;
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
}

export interface DailyForecast {
    dt: number;
    dt_txt: string;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        feels_like: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
}
interface WeatherState {
    current: CurrentWeather | null;
    daily: DailyForecast[];
    selectedDay: DailyForecast | null;
    loading: boolean;
    error: string | null;
    searchResults: CityOption[];
    searchLoading: boolean;
}
const initialState: WeatherState = {
    current: null,
    daily: [],
    selectedDay: null,
    loading: false,
    error: null,
    searchResults: [],
    searchLoading: false,
}
export const searchCities = createAsyncThunk(
    "weather/searchCities",
    async ({ query, lang = 'fa' }: { query: string; lang?: string }, { rejectWithValue }) => {
        try {
            const res = await axios.get<CityOption[]>(
                "https://api.openweathermap.org/geo/1.0/direct",
                {
                    params: {
                        q: query,
                        limit: 5,
                        appid: API_KEY,
                        lang
                    },
                }
            );
            return res.data;
        } catch (error) {

            // error searching for cities
            if (axios.isCancel(error)) throw error;
            return rejectWithValue(i18n.t("errors.searchFailed"));
        }
    }
);

export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (
        { city, lat, lon, lang = "fa" }: { city?: string; lat?: number; lon?: number; lang?: string },
        { rejectWithValue }
    ) => {
        const location = lat !== undefined && lon !== undefined ? { lat, lon } : { q: city };
        try {
            const [currentRes, forecastRes] = await Promise.all([
                axios.get(`${BASE_URL}/weather`, {
                    params: {
                        ...location,
                        appid: API_KEY,
                        units: "metric",
                        lang
                    }
                }),
                axios.get<{ list: DailyForecast[] }>(`${BASE_URL}/forecast`, {
                    params: {
                        ...location,
                        appid: API_KEY,
                        units: "metric",
                        lang
                    }
                }),
            ]);
            const dailyList = forecastRes.data.list.filter((item) => {
                return item.dt_txt.includes("12:00:00")
            })
            return {
                current: currentRes.data,
                daily: dailyList
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {

                // error connecting to weather server
                return rejectWithValue(
                    error.response?.data?.message || i18n.t("errors.fetchFailed")
                );
            }

            // an unexpected error occurred
            return rejectWithValue(i18n.t("errors.unexpected"));
        }
    }
)
export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        selectDay: (state, action) => {
            state.selectedDay = action.payload;
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
            state.searchLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload.current;
                state.daily = action.payload.daily;
                state.selectedDay = null;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
            .addCase(searchCities.pending, (state) => {
                state.searchLoading = true;
            })
            .addCase(searchCities.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchCities.rejected, (state, action) => {
                if (action.meta.aborted) return;
                state.searchLoading = false;
                state.searchResults = [];
            });
    }

})
export const { selectDay, clearSearchResults } = weatherSlice.actions;
export default weatherSlice.reducer;