import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ICharacter } from "../types";
import { API_URL } from "../globals";
import {
  List,
  Container,
  Divider,
  Grid,
  GridColumn,
  Image,
} from "semantic-ui-react";

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get<ICharacter>(`${API_URL}${id}`)
      .then((response) => setCharacter(response.data))
      .catch((err) => {
        console.error("Error fetching character:", err);
        setError("Failed to load character details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleEmptyValues = (value: string | undefined) => {
    if (value === undefined) return null;
    return value.length != 0 ? value : <>?</>;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Divider />
      <Grid>
        <GridColumn width={4}>
          <Image src={character?.image} />
        </GridColumn>
        <GridColumn width={6}>
          <List size="medium">
            <List.Item>
              <strong>Id:</strong> {character?.id}
            </List.Item>
            <List.Item>
              <strong>Name:</strong>
              {handleEmptyValues(character?.name)}
            </List.Item>
            <List.Item>
              <strong>Status:</strong> {handleEmptyValues(character?.status)}
            </List.Item>
            <List.Item>
              <strong>Species:</strong> {handleEmptyValues(character?.species)}
            </List.Item>
            <List.Item>
              <strong>Type:</strong> {handleEmptyValues(character?.type)}
            </List.Item>
            <List.Item>
              <strong>Gender:</strong> {handleEmptyValues(character?.gender)}
            </List.Item>
            <List.Item>
              <strong>Url:</strong> {handleEmptyValues(character?.url)}
            </List.Item>
            <List.Item>
              <strong>Created:</strong> {handleEmptyValues(character?.created)}
            </List.Item>
            <List.Item>
              <strong>Origin Name:</strong>
              {handleEmptyValues(character?.origin.name)}
            </List.Item>
            <List.Item>
              <strong>Origin Url:</strong>
              {handleEmptyValues(character?.origin.url)}
            </List.Item>
            <List.Item>
              <strong>Location Name:</strong>
              {handleEmptyValues(character?.location.name)}
            </List.Item>
            <List.Item>
              <strong>Location Url:</strong>
              {handleEmptyValues(character?.location.url)}
            </List.Item>
          </List>
        </GridColumn>
      </Grid>
      <h3>Episodes:</h3>
      <List size="small">
        <Grid columns={3}>
          {character?.episode.map((ep, index) => (
            <GridColumn>
              <List.Item key={index}>{ep}</List.Item>
            </GridColumn>
          ))}
        </Grid>
      </List>
    </Container>
  );
};

export default CharacterDetail;
