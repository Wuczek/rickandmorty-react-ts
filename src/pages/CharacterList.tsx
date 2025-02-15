import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../globals";
import { ICharacter, IApiResponse } from "../types";
import {
  CardMeta,
  CardHeader,
  CardContent,
  Card,
  Icon,
  Image,
  Container,
  Grid,
  GridColumn,
  Divider,
} from "semantic-ui-react";
import SelectFilterStatus from "../components/SelectFilterStatus";
import PaginationComponent from "../components/PaginationComponent";

const CharacterList = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get<IApiResponse>(`${API_URL}?page=${page}&status=${statusFilter}`)
      .then((response) => {
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
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
    <Container>
      <h1>Rick and Morty Characters</h1>

      <SelectFilterStatus
        onChange={(value) => setStatusFilter(value)}
        value={statusFilter}
      />
      <Divider />

      <Grid columns={4}>
        {characters.map((char) => (
          <GridColumn>
            <Link to={`/character/${char.id}`}>
              <Card key={char.id}>
                <Image src={char.image} wrapped ui={false} />
                <CardContent>
                  <CardHeader>{char.name}</CardHeader>
                  <CardMeta>
                    <span>
                      {char.species} / {char.gender}
                    </span>
                  </CardMeta>
                </CardContent>
                <CardContent extra>
                  <a>
                    <Icon name="heartbeat" />
                    {char.status}
                  </a>
                </CardContent>
              </Card>
            </Link>
          </GridColumn>
        ))}
      </Grid>
      <Divider />
      
      <Container textAlign="center">
        
      <PaginationComponent
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
        />
        </Container>
    </Container>
  );
};

export default CharacterList;
