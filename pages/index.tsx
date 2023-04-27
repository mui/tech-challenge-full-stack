import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { Connection } from "./api/connection";
import { CircularProgress } from "@mui/material";

const Home: NextPage = () => {
  const [connection, setConnection] = React.useState<Connection | null>(null);
  React.useEffect(() => {
    fetch("/api/connection").then(async (response) => {
      try {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        setConnection(await response.json());
      } catch (error: any) {
        setConnection({ error: error.message });
      }
    });
  }, []);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Full stack technical challenge
        </Typography>
        <Typography gutterBottom>
          {connection ? (
            `Database connection: ${
              connection.error ? `failed: "${connection.error}"` : "succeeded"
            }`
          ) : (
            <CircularProgress />
          )}
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
