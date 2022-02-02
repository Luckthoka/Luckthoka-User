import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Logo from "../../assets/Logo.png";

const MenuBar = ({ onConnectClick, isWalletConnected }) => {
  return (
    <AppBar position="static" sx={{ boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <IconButton size="small">
            <Box
              component="img"
              sx={{ maxWidth: 120 }}
              alt="luckthoka logo"
              src={Logo}
            />
          </IconButton>

          <Box sx={{ flexGrow: 0, minWidth: { sm: "100px" } }}>
            {!isWalletConnected && (
              <Button
                color="secondary"
                variant="contained"
                onClick={onConnectClick}
              >
                Connect Wallet
              </Button>
            )}
            {/* <Button
              color="secondary"
              variant="contained"
              onClick={() => window.open("https://mint.club/LTHK", "_blank")}
              sx={{ px: 1 }}
            >
              Buy LTHK
            </Button> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuBar;
