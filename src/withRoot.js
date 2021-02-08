import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import CssBaseline from "@material-ui/core/CssBaseline";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#84adff",
      main: "#6699ff",
      dark: "#476bb2",
      blue: "#306663"
    },
    secondary: {
      light: grey[300],
      main: grey[500],
      dark: grey[700]
    },
    pink: {
      light: "#ff8484",
      main: "#ff6666",
      dark: "#b24747"
    },
    green: {
      light: "#5bad84",
      main: "#339966",
      dark: "#236b47"
    },
    indigo: {
      light: "#8484ad",
      main: "#666699",
      dark: "#47476b"
    },
    // pendaica
    // màu tím
    purple: {
      light: "#ad5c84",
      main: "#993466",
      dark: "#6b2447"
    },
    // màu xanh đậm
    greenDark: {
      light: "#506261",
      main: "#253b3a",
      dark: "#192928"
    }
  },
  typography: {
    useNextVariants: true
  }
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
