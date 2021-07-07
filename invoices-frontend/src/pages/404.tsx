import {
    Typography,
  } from "@material-ui/core";
  import { NextPage } from "next";
  import Head from "next/head";
  
  const Page404: NextPage = () => {
    return (
      <div>
        <Head>
          <title>Página não encontrada</title>
        </Head>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          404 - Página não encontrada
        </Typography>
      </div>
    );
  };
  
  export default Page404;
  