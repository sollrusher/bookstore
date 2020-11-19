import React, { Component } from "react";
import Auth from "./app/components/auth";
import { connect } from "react-redux";
import AllUsers from "./app/components/allusers";
import { render } from "@testing-library/react";

interface StoreProps {
  store?: any;
}

class App extends Component<StoreProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { store } = this.props;
    const user = store.user;
    console.log(user)
    if(user.length === 0)
    
    return <Auth />;
    else
    return <AllUsers/>
    
    
  }
}

const mapStateToProps = (store: any) => ({
  store,
});

export default connect(mapStateToProps)(App);
