import "./App.css";
import ProductList from "./ProductList";
import Cart from "./Cart";
import { useEffect, useState } from "react";
// import useWebSocket from 'react-use-websocket';
import { StompSessionProvider, useSubscription } from "react-stomp-hooks";

const WS_URL = "http://localhost:8080/gs-guide-websocket";

function App() {
  // useWebSocket(WS_URL, {
  //   onOpen: () => {
  //     console.log('WebSocket connection established.');
  //   }
  // });
  const [products, setProducts] = useState([
    {
      id: 0,
      productName: "Pizzas are coming",
      description: "With added awesomeness",
      price: 10,
    },
  ]);

  const [orderedPizzas, setOrderedPizzas] = useState([
    {
      id: 0,
      pizzaId: 0,
      productName: "Pizzas are coming",
      description: "With added awesomeness",
      price: 10,
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:8080/api/pizzas")
      .then((response) => response.json())
      .then((responseJSON) => {
        setProducts(responseJSON);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/orderedpizzas")
      .then((opresponse) => opresponse.json())
      .then((opresponseJSON) => {
        var newOrderedPizzas = opresponseJSON.map((orderedPizza) => {
          var pizza = products.find((p) => p.id === orderedPizza.pizzaId) || {};
          return {
            ...orderedPizza,
            productName: pizza.productName,
            description: pizza.description,
            price: pizza.price,
          };
        });
        console.log(newOrderedPizzas);
        setOrderedPizzas(newOrderedPizzas);
      });
  }, [products]);

  const onProductIncPlusClick = function (clickedProductId) {
    var i = products.findIndex((p) => p.id === clickedProductId);
    products[i].orderCount = products[i].orderCount + 1;
    setProducts([...products]);
  };

  const wserror = function (error) {
    console.log(error);
    debugger;
  };
  const connectws = function () {};

  return (
    <>
      <StompSessionProvider
        url={WS_URL}
        errorCallback={(e) => wserror(e)}
        debug={(str) => {
          console.log(str);
        }}
      >
        <SubscribingComponent />
        <h1>Pizza di Papavione</h1>
        <ProductList
          onProductIncPlusClick={onProductIncPlusClick}
          products={products}
        />
        <Cart products={products} orderedPizzas={orderedPizzas}></Cart>
      </StompSessionProvider>
      <button onClick={() => connectws()} />
    </>
  );
}

function SubscribingComponent() {
  const [lastMessage, setLastMessage] = useState("No message received yet");

  //Subscribe to /topic/test, and use handler for all received messages
  //Note that all subscriptions made through the library are automatically removed when their owning component gets unmounted.
  //If the STOMP connection itself is lost they are however restored on reconnect.
  //You can also supply an array as the first parameter, which will subscribe to all destinations in the array
  useSubscription("/topic/greetings", (message) =>
    setLastMessage(message.body)
  );

  return <div>Last Message: {lastMessage}</div>;
}

export default App;