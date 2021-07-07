import {
  Avatar,
  Chip,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import http from "../../http";
import { Order, OrderStatus } from "../../model";

interface OrderDetailPageProps {
  order: Order;
}

const OrderDetailPage: NextPage<OrderDetailPageProps> = ({ order }) => {
  const product = order.items[0].product;

  return (
    <div>
      <Head>
        <title>Detalhes da ordem</title>
      </Head>
      <Typography component="h1" variant="h6" color="textPrimary" gutterBottom>
        Order - #{order.id}
      </Typography>
      <Chip
        label={order.status === OrderStatus.Approved ? "Aprovado" : "Pendente"}
        color={order.status === OrderStatus.Approved ? "primary" : "default"}
      />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={product.image_url} />
        </ListItemAvatar>
        <ListItemText
          primary={product.name}
          secondary={`R$ ${order.items[0].price}`}
        />
      </ListItem>
      <Typography variant="h6" gutterBottom>
        Detalhes do cartão de crédito
      </Typography>
      <Grid container>
        <Grid item xs={3} sm={1}>
          <Typography gutterBottom>Número</Typography>
        </Grid>
        <Grid item xs={9} sm={11}>
          <Typography gutterBottom>{order.credit_card.number}</Typography>
        </Grid>
        <Grid item xs={3} sm={1}>
          <Typography gutterBottom>Expiração</Typography>
        </Grid>
        <Grid item xs={9} sm={11}>
          <Typography
            gutterBottom
          >{`${order.credit_card.expiration_month}/${order.credit_card.expiration_year}`}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderDetailPage;

export const getStaticProps: GetStaticProps<
  OrderDetailPageProps,
  { id: string }
> = async (context) => {
  try {
    const { id } = context.params!;
    const { data: order } = await http.get(`orders/${id}`);
    console.log(order);
    return {
      props: {
        order,
      },
      revalidate: 1 * 60 * 10,
    };
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return { notFound: true };
    }
    throw e;
  }
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return { paths: [], fallback: "blocking" };
};
