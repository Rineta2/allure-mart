import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("Cancel order API called");
    const { orderId } = await request.json();
    console.log("Order ID:", orderId);

    if (!orderId) {
      console.log("Order ID is missing");
      return NextResponse.json(
        {
          status: "error",
          message: "Order ID is required",
        },
        { status: 400 }
      );
    }

    // Get base URL for API calls
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const host = request.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    // Prepare the data according to the schema requirements
    const updateData = {
      orderId,
      transactionStatus: "cancel",
      orderStatus: "cancel",
      transactionId: `CANCELLED_${orderId}_${Date.now()}`,
      transactionTime: new Date().toISOString(),
    };

    console.log("Update data:", updateData);

    const updateResponse = await fetch(
      `${baseUrl}/api/update-transaction-status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    // Try to parse the response as JSON
    let responseData;
    try {
      responseData = await updateResponse.json();
      console.log("Update response:", responseData);
    } catch (error) {
      console.error("Failed to parse response:", error);
      throw new Error("Invalid response format from update-transaction-status");
    }

    if (!updateResponse.ok) {
      console.error("Update failed:", responseData);
      throw new Error(
        `Failed to update transaction status: ${
          responseData.message || "Unknown error"
        }`
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Order cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel order API error:", error);
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to cancel order",
      },
      { status: 500 }
    );
  }
}
