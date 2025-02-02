import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
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

    // Update the request body to include all necessary fields
    const updateResponse = await fetch(
      `${baseUrl}/api/update-transaction-status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          transactionStatus: "cancelled",
          orderStatus: "cancelled",
          transactionTime: new Date().toISOString(),
          transactionId: `CANCELLED_${orderId}_${Date.now()}`,
          paymentMethod: "cancelled",
          cancelReason: "Cancelled by user",
        }),
      }
    );

    // Try to parse the response as JSON
    let responseData;
    try {
      const responseText = await updateResponse.text();
      responseData = JSON.parse(responseText);
    } catch {
      throw new Error("Invalid response format from update-transaction-status");
    }

    if (!updateResponse.ok) {
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
