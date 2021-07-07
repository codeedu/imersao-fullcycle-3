import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import http from "../../http";
import { CreditCard, Invoice } from "../../model";
import {
  Typography,
  Select,
  MenuItem,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import useSWR from "swr";

interface InvoicesListPageProps {
  creditCards: CreditCard[];
}

const fetcher = (resource: string) =>
  http.get(resource).then((res) => res.data);

const InvoicesListPage: NextPage<InvoicesListPageProps> = ({ creditCards }) => {
  const [creditCardNumber, setCreditCardNumber] = useState<string>(
    creditCards.length ? creditCards[0].number : ""
  );

  const { data: invoices = [], error } = useSWR<Invoice[]>(
    `credit-cards/${creditCardNumber}/invoices`,
    fetcher,
    { refreshInterval: 5000 }
  );

  if (!creditCards.length) {
    return (
      <div>
        <Head>
          <title>Fatura - Nenhum cartão encontrado</title>
        </Head>
        <Typography
          component="h1"
          variant="h3"
          color="textPrimary"
          gutterBottom
        >
          Nenhum cartão encontrado
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Fatura - {creditCardNumber}</title>
      </Head>
      <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
        Fatura
      </Typography>
      <Select
        label="Cartão de crédito"
        defaultValue={creditCards[0].number}
        onChange={(event) => setCreditCardNumber(event.target.value as string)}
      >
        {creditCards.map((c, key) => (
          <MenuItem key={key} value={c.number}>
            {c.number}
          </MenuItem>
        ))}
      </Select>
      <Grid container>
        <Grid item xs={12} sm={3}>
          <List>
            {invoices.map((invoice, key) => (
              <ListItem key={key} alignItems="flex-start">
                <ListItemText
                  primary={format(parseISO(invoice.payment_date), "dd/MM/yyyy")}
                  secondary={invoice.store}
                />
                <ListItemSecondaryAction>
                  R$ {invoice.amount}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default InvoicesListPage;

export const getStaticProps: GetStaticProps<InvoicesListPageProps> = async (
  context
) => {
  try {
    const { data: creditCards } = await http.get(`credit-cards`);

    return {
      props: {
        creditCards,
      },
      revalidate: 30,
    };
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return { notFound: true };
    }
    throw e;
  }
};

