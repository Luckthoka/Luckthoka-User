import { useEffect, useState } from "react";

import "./App.css";
import Header from "./Components/Header/Header";
import MainContent from "./maincontent";
import Logo from "./assets/Logo.png";
import {
  initWeb3,
  isWalletConnected,
  connectWallet,
  isMetamaskAvailable,
  isAlreadyConnected,
} from "./web3Client.js";
import MenuBar from "./Components/MenuBar/MenuBar";
import { Container, Grid, Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Styles/theme";
import SimpleModal from "./Components/SimpleModal/SimpleModal";

function App() {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [isConnected, setConnected] = useState(false);
  const [isMetamask, setMetamaskStatus] = useState(isMetamaskAvailable());

  useEffect(() => {
    // isWalletConnected()
    //   .then((status) => {
    //     setConnected(status);
    //     buttonClick();
    //   })
    //   .catch((msg) => setErrorMessage(msg));

    isAlreadyConnected().then((connected) => {
      setConnected(connected);
    });
  }, []);

  const buttonClick = () => {
    initWeb3()
      .then(async ({ contract, provider }) => {
        setContract(contract);
        setProvider(provider);
        setConnected(true);
        provider
          .getSigner()
          .getAddress()
          .then((acc) => {
            setAccount(acc);
          });
      })
      .catch((data) => setErrorMessage(data));
  };

  return (
    <ThemeProvider theme={theme}>
      <MenuBar onConnectClick={buttonClick} isWalletConnected={isConnected} />
      <Container sx={{ marginY: 5 }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Header
              onConnectClick={buttonClick}
              isWalletConnected={isConnected}
              contract={contract}
              account={account}
            />
          </Grid>
          <Grid item xs={12}>
            <MainContent contract={contract} account={account} />
          </Grid>
          <Grid item>
            <Grid container justifyContent="center">
              <Grid item xs="12" sx={{ textAlign: "center" }}>
                <img src={Logo} alt="Luckthoka Logo" width={200} />
              </Grid>
              <Grid item xs="12" sx={{ textAlign: "center" }}>
                <Typography variant="body2">
                  All Rights Reserved to LUCK THOKA @2022
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <SimpleModal
          open={!isMetamask}
          handleClose={() => console.log(true)}
          message="Please install Maskmask extension"
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
