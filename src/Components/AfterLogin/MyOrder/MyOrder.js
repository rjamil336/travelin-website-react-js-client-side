import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";

const MyOrder = () => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    fetch(
      `https://infinite-stream-87987.herokuapp.com/myorders/${userEmail}`
    ).then((res) => res.json().then((data) => setMyOrders(data)));
  }, [userEmail]);
  const handleDelete = (id) => {
    const deleteConfirm = window.confirm("Are you sure , you want to delete?");
    if (deleteConfirm) {
      const url = `https://infinite-stream-87987.herokuapp.com/myorders/${id}`;
      console.log(url);
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            alert("deleted");
            const deleteId = myOrders.filter((service) => service._id !== id);
            console.log("delete", deleteId);
            setMyOrders(deleteId);
          }
        });
    }
  };
  return (
    <>
      {myOrders.length === 0 ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      ) : (
        <div className="container">
          <div style={{ marginTop: "100px" }}>
            <h2 className="text-center text-uppercase">my order </h2>
            <div className="row">
              {myOrders.map((order) => (
                <div className="col-lg-3 " key={order._id}>
                  <div className="border p-2 m-2">
                    <img src={order?.servicesItem?.img} alt="" />
                    <h5>{order.servicesItem.name}</h5>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="btn btn-danger"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrder;
