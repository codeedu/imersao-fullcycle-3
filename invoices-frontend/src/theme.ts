import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const palette: PaletteOptions = {
  type: "dark",
  primary: {
    main: red[800],
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#242526",
  },
};

const theme = createMuiTheme({
  palette,
});

export default theme;
