import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

function App() {
  const api = "https://6718988a7fc4c5ff8f4a1f17.mockapi.io/menu";

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(api)
      .then((value) => value.json())
      .then((item) => {
        setData(item);
        setLoader(false);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div style={{ width: "90%", margin: "auto", paddingTop: "20px" }}>
      <Grid container spacing={3}>
        {loader
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ width: "100%" }}>
                  <Skeleton variant="rectangular" width="100%" height={308} />
                  <Box sx={{ pt: 1 }}>
                    <Skeleton width="100%" />
                    <Skeleton width="80%" />
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                  </Box>
                </Box>
              </Grid>
            ))
          : data.map((value) => (
              <Grid item xs={12} sm={6} md={3} key={value.id}>
                <Box
                  sx={{
                    width: "100%",
                    border: "1px solid gray",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    className="pb-6 rounded-lg"
                    src={value.img}
                    alt={value.category}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                  <Box sx={{ padding: 2 }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ height: "150px" }}
                    >
                      {value.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2">{`${value.price} $`}</Typography>
                      <Button size="small" variant="contained">
                        Buy
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
      </Grid>
    </div>
  );
}

export default App;
