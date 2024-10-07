import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      try {
        const response = await fetch("http://localhost:5000/api/myOrderData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setOrderData(data.orderData);
        } else {
          console.error("Failed to fetch order data");
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  if (orderData === null) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="m-auto mt-5">
              <h2>No orders found. Start exploring our delicious menu!🍕🍔</h2>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (Object.keys(orderData).length === 0) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="m-auto mt-5">
              <h5>No orders found</h5>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData.order_data
            .slice(0)
            .reverse()
            .map((item, index) => (
              <React.Fragment key={index}>
                <div className="m-auto mt-5">
                  {item[0].Order_date && (
                    <>
                      <h5>{item[0].Order_date}</h5>
                      <h4 className="my-4">
                        Orders by {orderData.user_info.firstName}{" "}
                        {orderData.user_info.lastName} from{" "}
                        {orderData.user_info.cityName}
                      </h4>
                      <hr />
                    </>
                  )}
                </div>
                {item.slice(1).map((arrayData, idx) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-3" key={idx}>
                      <div
                        className="card mt-3"
                        style={{ width: "16rem", maxHeight: "360px" }}
                      >
                        <div className="card-body">
                          <h5 className="card-title">{arrayData.name}</h5>
                          <div
                            className="container w-100 p-0"
                            style={{ height: "38px" }}
                          >
                            <span className="m-1">{arrayData.qty}</span>
                            <span className="m-1">{arrayData.size}</span>
                            <div className="d-inline ms-2 h-100 w-20 fs-5">
                              ₹{arrayData.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
