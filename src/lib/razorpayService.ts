import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const baseUrl = import.meta.env.VITE_BASE_URL;
// or process.env.REACT_APP_BASE_URL for CRA

export class RazorpayService {
  // Load Razorpay SDK
  static loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      if (existingScript) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  }

  // Open Razorpay Payment
  static async pay(orderId: string, amount: number): Promise<void> {
    const loaded = await this.loadRazorpayScript();

    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: "rzp_live_SZHxM1sfOz0zqJ",
      amount: amount * 100,
      currency: "INR",
      name: "EduWisp",
      order_id: orderId,

      handler: (response: any) => {
        console.log("Payment Success:", response);

        // Call backend verification API here
      },

      prefill: {
        name: "Vishnu Gautam",
        email: "techy.vishnu007@gmail.com",
        contact: "9654584747",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  // Create Order / Initiate Gateway
  static async initiateRazorpayGateway(payload: any) {
    const url = `${baseUrl}PaymentGatewayOpen/CwRPayEducation`;

    const headers = {
      Accept: "text/plain",
      "authorised-key": "openpg",
      usercode: "APDL0001",
      partnerid: "MANISH",
      "access-mode": "WEB",
      "user-agent": "SRLearnX",
      "Content-Type": "application/json-patch+json",
    };

    const response = await axios.post(url, payload, {
      headers,
    });

    return response.data;
  }
}