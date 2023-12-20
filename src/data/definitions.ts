import {Map} from "immutable";

export interface PersonInterface {
    name: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: string,
    films: Array<string>,
    species: Array<string>,
    vehicles: Array<string>,
    starships: Array<string>,
    created: string,
    edited: string,
    url: string,
}

export interface PersonResponse {
    count: number,
    next: string,
    previous: string,
    results: Array<PersonInterface>
}

export interface Route {
    url: string,
    name: string,
    description?: string
}
