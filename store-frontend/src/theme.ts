import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { createMuiTheme } from "@material-ui/core";

const palette: PaletteOptions = {
  type: "dark",
  primary: {
    main: "#FFCD00",
    contrastText: "#242526",
  },
  background: {
    default: "#242526",
  },
};

const theme = createMuiTheme({
  palette,
});

export default theme;
