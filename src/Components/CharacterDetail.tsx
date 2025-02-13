import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ICharacter } from "../types";
import { API_URL } from "../globals";

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get<ICharacter>(`${API_URL}${id}`)
      .then((response) => setCharacter(response.data))
      .catch((err) => {
        console.error("Error fetching character:", err);
        setError("Failed to load character details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{character?.name}</h2>
      <img src={character?.image} alt={character?.name} />
      <p>Status: {character?.status}</p>
      <p>Species:{character?.species}</p>
      <p>Gender: {character?.gender}</p>
    </div>
  );
  }
  
  export default CharacterDetail