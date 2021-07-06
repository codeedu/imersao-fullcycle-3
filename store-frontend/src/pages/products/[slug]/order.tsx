import {
  Typography,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  TextField,
  Grid,
  ListItemText,
  Box,
} from "@material-ui/core";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import http from "../../../http";
import { CreditCard, Product } from "../../../model";

interface OrderPageProps {
  product: Product;
}

const OrderPage: NextPage<OrderPageProps> = ({ product }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data: CreditCard) => {
    try {
      const { data: order } = await http.post("orders", {
        credit_card: data,
        items: [{ product_id: product.id, quantity: 1 }],
      });
      router.push(`/orders/${order.id}`);
    } catch (e) {
      console.error(axios.isAxiosError(e) ? e.response?.data : e);
      enqueueSnackbar("Erro ao realizar sua compra.", {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Pagamento</title>
      </Head>
      <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
        Checkout
      </Typography>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={product.image_url} />
        </ListItemAvatar>
        <ListItemText
          primary={product.name}
          secondary={`R$ ${product.price}`}
        />
      </ListItem>
      <Typography component="h2" variant="h6" gutterBottom>
        Pague com cartão de crédito
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField {...register("name")} required label="Nome" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("number")}
              label="Numero do cartão"
              required
              fullWidth
              inputProps={{ maxLength: 16 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("cvv")}
              required
              type="number"
              label="CVV"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  {...register("expiration_month")}
                  required
                  type="number"
                  label="Expiração mês"
                  fullWidth
                  onChange={(e) =>
                    setValue("expiration_month", parseInt(e.target.value))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("expiration_year")}
                  required
                  type="number"
                  label="Expiração ano"
                  fullWidth
                  onChange={(e) =>
                    setValue("expiration_year", parseInt(e.target.value))
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box marginTop={1}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Pagar
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps<
  OrderPageProps,
  { slug: string }
> = async (context) => {
  const { slug } = context.params!;
  try {
    const { data: product } = await http.get(`products/${slug}`);

    console.log(product);

    return {
      props: {
        product,
      },
    };
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return { notFound: true };
    }
    throw e;
  }
};
