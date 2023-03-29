import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <BrowserRouter>
      <Dropdown />
      <br />
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/Home"} element={<Home />} />
          <Route path={"/Teams"} element={<Teams />} />
          <Route path={"/Players"} element={<Players />} />
          <Route path={"/Seasons"} element={<Schedule />} />
          <Route path={"/Games"} element={<Games />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Dropdown() {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}></Col>

          <Col xs={12} sm={12} md={12} lg={12} className="bg-dark p-0">
            <Navbar expand="xl">
              <Container>
                <Navbar.Toggle />
                <Navbar.Collapse>
                  <br />
                  <Nav id="navbuttons">
                    <LinkContainer to="/Home">
                      <Button className={"btn-outline-warning btn-dark "}>
                        Home
                      </Button>
                    </LinkContainer>
                    <LinkContainer to="/Teams">
                      <Button className={"btn-outline-warning btn-dark "}>
                        Teams
                      </Button>
                    </LinkContainer>
                    <LinkContainer to="/Players">
                      <Button className={"btn-outline-warning btn-dark "}>
                        Players
                      </Button>
                    </LinkContainer>
                    <LinkContainer to="/Seasons">
                      <Button className={"btn-outline-warning btn-dark "}>
                        Schedule
                      </Button>
                    </LinkContainer>
                    <LinkContainer to="/Games">
                      <Button className={"btn-outline-warning btn-dark "}>
                        Game Results
                      </Button>
                    </LinkContainer>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>

          <Col xs={12} sm={12} md={12} lg={12}></Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}></Col>
          <Col className="bg-dark p-2"></Col>
          <Col xs={12} sm={12} md={12} lg={12}></Col>
        </Row>
      </Container>
    </>
  );
}

function Home() {
  return (
    <div>
      <h4 class="title"> NBA Statistics</h4>{" "}
    </div>
  );
}

function Teams() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  var url =
    "https://api.sportsdata.io/v3/nba/scores/json/AllTeams?key=07bd8752776c46f09e479cf7d1610b97";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        console.log(json);
      });
  }, []);
  return (
    <>
      <input
        placeholder="Search Player"
        onChange={(event) => setQuery(event.target.value)}
      />
      <br></br>
      <br></br>
      {data
        .filter((AllTeams) => {
          if (query === "") {
            return AllTeams;
          } else if (
            AllTeams.Name.toLowerCase().includes(query.toLowerCase())
          ) {
            return AllTeams;
          }
        })
        .map((AllTeams) => {
          return (
            <>
              <div id="teams">
                Team {AllTeams.TeamID}: {AllTeams.City} {AllTeams.Name}
              </div>
            </>
          );
        })}
    </>
  );
}

function Players() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  var url =
    "https://api.sportsdata.io/v3/nba/scores/json/Players?key=07bd8752776c46f09e479cf7d1610b97";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        console.log(json);
      });
  }, []);
  return (
    <div id="team">
      <input
        placeholder="Search Player"
        onChange={(event) => setQuery(event.target.value)}
      />
      <br></br>
      <br></br>
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Position</th>
          <th>Team</th>
        </tr>
        {data
          .filter((Players) => {
            if (query === "") {
              return Players;
            } else if (
              Players.FirstName.toLowerCase().includes(query.toLowerCase())
            ) {
              return Players;
            }
          })
          .map((Players) => {
            return (
              <tr>
                <td>{Players.FirstName}</td>
                <td>{Players.LastName}</td>
                <td>{Players.Position}</td>
                <td>{Players.Team}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}

function Games() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  var url =
    "https://api.sportsdata.io/v3/nba/scores/json/Games/%7B2022%7D?key=07bd8752776c46f09e479cf7d1610b97";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        console.log(json);
      });
  }, []);
  return (
    <div id="team">
      <input
        placeholder="Search Home Team"
        onChange={(event) => setQuery(event.target.value)}
      />
      <br></br>
      <br></br>
      <table>
        <tr>
          <th>Score</th>
          <th>Home</th>

          <th>Away</th>
          <th>Score</th>
        </tr>
        {data
          .filter((Games) => {
            if (query === "") {
              return Games;
            } else if (
              Games.HomeTeam.toLowerCase().includes(query.toLowerCase())
            ) {
              return Games;
            }
          })
          .map((Games) => {
            return (
              <tr>
                <td>{Games.HomeTeamScore}</td>
                <td>{Games.HomeTeam}</td>
                <td>{Games.AwayTeam}</td>
                <td>{Games.AwayTeamScore}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}

function Schedule() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  var url =
    "https://api.sportsdata.io/v3/nba/scores/json/Games/%7B2022%7D?key=07bd8752776c46f09e479cf7d1610b97";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        console.log(json);
      });
  }, []);
  return (
    <div id="team">
      <input
        placeholder="Search Date"
        onChange={(event) => setQuery(event.target.value)}
      />
      <br></br>
      <br></br>
      <table>
        <tr>
          <th>Game</th>
          <th>Time</th>
        </tr>
        {data
          .filter((Games) => {
            if (query === "") {
              return Games;
            } else if (Games.DateTime.includes(query)) {
              return Games;
            }
          })
          .map((Games) => {
            return (
              <tr>
                <td>{Games.GameID}</td>

                <td>{Games.DateTime}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <img
        alt={"404 Error"}
        src={
          "https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png"
        }
      />
    </div>
  );
}
