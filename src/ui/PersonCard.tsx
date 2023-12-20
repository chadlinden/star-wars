import {
    Card, CardBody, CardTitle, ListGroup, ListGroupItem,
    UncontrolledPopover, PopoverHeader, PopoverBody
} from 'reactstrap';
import {extractIdFromUrl} from "../data/util.ts";
import {useEffect, useState} from "react";
import {getSwapi} from "../data/actions.ts";

export function PersonCard<PersonInterface>({person, elementId}) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const {name, url} = person;

    const loadPlanet = async () => {
        setLoading(true);
        const response = await getSwapi(person.homeworld);

        setData(response);
        setLoading(false);
    }

    useEffect(() => {
        loadPlanet();
    }, []);


    // This _should_ format population like 350000 -> 350,000
    const population = Number(data.population || 0).toLocaleString();
    return (
        <div className="col p-2">
            <UncontrolledPopover
                placement="auto-end"
                target={elementId}
            >
                <PopoverHeader>
                    <h1>{person.name}</h1>
                </PopoverHeader>
                <PopoverBody className="text-justify">
                    <p>{person.name} is a member of {Math.max(1, person.species.length)} species</p>
                    {person.films.length &&
											<p>{person.name} has appeared
												in {person.films.length} film{person.films.length > 1 ? 's' : null}</p>
                    }
                    {loading && <h5 className="info">Loading!</h5>}

                    {(!loading && data) &&
											<>
												<p><strong>{data.name}</strong> is a planet with a diameter
													of {Number(data.diameter).toLocaleString()}Km.
													The climate of {data.name} is {data.climate} which may be affected by the gravity of
                            {data.gravity}, the presence of {data.surface_water}% surface water indicates
													livable conditions.
												</p>
												<p>
													In total there is a population of {population} people,
													and SWAPI has listings for {data.residents?.length || '0'} residents
												</p>
											</>
                    }
                </PopoverBody>
            </UncontrolledPopover>
            <Card
                className="grow person-card"
                style={{width: '18rem', padding: '15px'}}

            >
                <img
                    alt={`${name}'s image`}
                    src={`/img/${extractIdFromUrl(url)}.jpg`}
                />
                <CardBody>
                    <a
                        className="make-reveal text-center text-decoration-none text-black cursor-pointer"
                        id={elementId}
                    >
                        <CardTitle tag="h5">
                            {name}
                        </CardTitle>
                        <p className="fs-6 fw-lighter fst-italic lh-1 text-center">Click for more</p>
                    </a>
                    <CardBody className="reveal">
                        <ListGroup flush>
                            <ListGroupItem className="weight">
                                Mass: {person.mass}kg
                            </ListGroupItem>
                            <ListGroupItem className="weight">
                                Added: {new Date(person.created)
                                .toLocaleDateString('en-gb', {year: 'numeric', month: 'numeric', day: 'numeric'})
                            }
                            </ListGroupItem>

                            {person?.films?.length &&
                                <ListGroupItem>
                                    Has appeared in {person.films.length} films.
                                </ListGroupItem>
                            }
                            <ListGroupItem>
                                Was born in the year {person.birth_year}
                            </ListGroupItem>
                        </ListGroup>
                    </CardBody>
                </CardBody>
            </Card>
        </div>
    );
}

export default PersonCard;
