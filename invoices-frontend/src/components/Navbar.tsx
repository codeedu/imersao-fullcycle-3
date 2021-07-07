import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import StoreIcon from "@material-ui/icons/Store";
import Link from "next/link";

const Navbar: React.FunctionComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href={"/"} as={`/`} passHref>
          <Button color="inherit" startIcon={<StoreIcon />} component="a">
            <Typography variant="h6">Code Invoice</Typography>
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;