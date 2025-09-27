import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      console.log("No session ID found.");
      return;
    }

    axios
      .get(`http://localhost:3000/verifyPayment?session_id=${sessionId}`)
      .then((res) => {
        if (res.data.success) {
          console.log("Payment Successful.");
        } else {
          console.log("Payment failed.");
        }
      })
      .catch((err) => {
        console.log(err)
        console.log("Error verifying payment.");
      });
  }, [location.search]);

  return (
     <>
        <h1>Success</h1>
        </>
  );
};

export default Success;
