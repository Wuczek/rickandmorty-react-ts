import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../globals";
import { ICharacter, IApiResponse } from "../types";

const CharacterList = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [pageInfo, setPageInfo] = useState<{
    next: string | null;
    prev: string | null;
  }>({ next: null, prev: null });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get<IApiResponse>(`${API_URL}?page=${page}&status=${statusFilter}`)
      .then((response) => {
        setCharacters(response.data.results);
        setPageInfo({
          next: response.data.info.next,
          prev: response.data.info.prev,
        });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Try again later.");
      })
      .finally(() => setLoading(false));
  }, [page, statusFilter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Rick and Morty Characters</h1>

      <div>
        <label>Filter by Status: </label>
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div>
        {characters.map((char) => (
          <div key={char.id}>
            <Link to={`/character/${char.id}`}>
              <img src={char.image} alt={char.name} />
              <p>
                {char.name} - {char.status} - {char.species} - {char.gender}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <div>
        <button
          disabled={!pageInfo.prev}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          disabled={!pageInfo.next}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
