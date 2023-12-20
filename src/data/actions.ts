import axios from 'axios';
import { PersonInterface, PersonResponse } from './definitions.ts';
import {Map} from "immutable";
import { extractIdFromUrl, mergePeopleMap } from "./util.ts";

export const BASE_URL = 'https://swapi.dev/api';
export const PEOPLE_SLUG = '/people/';
export const PEOPLE_URL = `${BASE_URL}${PEOPLE_SLUG}`;
export const PLANET_SLUG = '/planet/';
export const PLANET_URL = `${BASE_URL}${PLANET_SLUG}`;

export let SWAPIpeople : Map<string, PersonInterface> = Map();

export async function getPeople(slug = ''){
    return await axios.get(`${PEOPLE_URL}${slug ? slug : ''}`)
        .then((response) : PersonResponse => {
            SWAPIpeople = mergePeopleMap(SWAPIpeople, response.data.results);

            return SWAPIpeople
        })
        .catch(function (error) {
            // handle error
            const msg = 'Failed to fetch Star Wars People API!';
            // throw new Error(msg);
            console.log(msg);

        });
}

export async function getSwapi(url){
    return await axios.get(url)
        .then(({ data }) => {
            return data;
        })
        .catch(function (error) {
            // handle error
            const msg = 'Failed to fetch Star Wars API!';
            // throw new Error(msg);
            console.log(msg);
        });
}

export default getPeople;
