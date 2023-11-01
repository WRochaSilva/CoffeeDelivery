import { Grid, GridItem } from "@chakra-ui/react";
import { AdressDelivery } from "./AdressDelivery";
import { PaymentForm } from "./PaymentForm";
import { ListOrder } from "./ListOrder";

export const Checkout = () => {
  return (
    <Grid gridTemplateColumns={"repeat(2, minmax(0, 1fr))"} w={'1300px'}>
      <GridItem ml={'40px'}>
        <AdressDelivery />
        <PaymentForm />
      </GridItem>
      <GridItem>
        <ListOrder />
      </GridItem>
    </Grid>
  );
};
