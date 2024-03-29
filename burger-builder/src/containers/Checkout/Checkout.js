import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = props => {
  
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContiunedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

    let summary = <Redirect to="/" />;

    if (props.ings) {
      const purchasedRedirect = props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={props.ings}
            checkoutCancelled={checkoutCancelledHandler}
            checkoutContiuned={checkoutContiunedHandler}
          />
          <Route
            path={props.match.path + "/contact-data"}
            component={ContactData}
          />
        </>
      );
    }
    return <div>{summary}</div>;
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
