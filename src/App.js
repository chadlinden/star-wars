import React, { useEffect, useState } from 'react';
import { BottomScrollListener } from 'react-bottom-scroll-listener';

import './App.css';
import ErrorBoundary from './ui/ErrorBoundary.tsx';
import PersonCard from './ui/PersonCard.tsx'
import WhoaLoader from './ui/WhoaLoader.tsx';
import getPeople, { SWAPIpeople } from './data/actions.ts';
import { mergePeopleMap, toSnakeCase } from './data/util.ts';

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(SWAPIpeople);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadPeople = async (options) => {
    setLoading(true);
    const response = await getPeople(options);

    setData(mergePeopleMap(SWAPIpeople, response));
    setLoading(false);
  }

  useEffect(() => {
    loadPeople('?page=' + page);
  }, []);

  const nextPage = async () => {
    if (!hasMore) {
      return;
    }
    const newPage = page + 1;
    setPage(newPage);
    setLoadingMore(true);
    const response = await getPeople('?page=' + newPage);

    setData(mergePeopleMap(data, response));
    setLoadingMore(false);

    if (response.next === null) {
      setHasMore(false);
    }

    return response.results;
  };

  const cards = data.map(person => {
    const elementId = toSnakeCase(`person-card-${person[1].name}`);

    return (
        <PersonCard
          id={ elementId }
          key={ elementId }
          person={ person[1] }
          elementId={ elementId }
        />
    );
  }).toArray()
    .map((a,b) => a[1]); //wat?

  return (
    <div>
      <ErrorBoundary>
        <div className="container-fluid">
          <div className="col-12 page-content">
            <div className="row">
              {/* TODO: something wonky with loader here, should only show small one at page end load... */}
              { loading && <WhoaLoader/> }
              { !loading && cards }
            </div>
          </div>
        <BottomScrollListener onBottom={nextPage} />
        { loadingMore && <WhoaLoader interstitial/> }
        { !hasMore && <h1>You've reached the end of the SWAPI People's API!</h1>}
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
