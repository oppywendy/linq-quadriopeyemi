import React, { useState, useEffect } from "react";
import { fetchJourneys } from "./api";
import Login from "./Login/Login.jsx";
import JourneyExplorer from "./JourneyExplorer/JourneyExplorer.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    if (loggedIn) {
      const loadJourneys = async () => {
        try {
          setLoading(true);
          const data = await fetchJourneys(page, limit);
          setJourneys(data.journeys);
        } catch (err) {
          setError("Failed to fetch journeys.");
        } finally {
          setLoading(false);
        }
      };

      loadJourneys();
    }
  }, [loggedIn, page, limit]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <JourneyExplorer
      journeys={journeys}
      page={page}
      setPage={setPage}
    />
  );
}

export default App;
