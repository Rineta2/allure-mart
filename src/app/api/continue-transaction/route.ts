import { NextResponse } from "next/server";

import midtransClient from "midtrans-client";

interface MidtransParameter {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  credit_card?: {
    secure: boolean;
  };
  [key: string]: unknown; // Lebih aman daripada any
}

export async function POST(request: Request) {
  try {
    // Validasi environment variables
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const clientKey = process.env.MIDTRANS_CLIENT_KEY;

    if (!serverKey || !clientKey) {
      throw new Error("Midtrans configuration is missing");
    }

    // Create Snap instance
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: serverKey,
      clientKey: clientKey,
    });

    const requestData = await request.json();
    const { orderId, amount } = requestData;

    // Validasi required fields
    if (!orderId || !amount) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing required fields for transaction",
        },
        { status: 400 }
      );
    }

    // Generate new unique order ID for Midtrans while keeping reference to original
    const newTransactionId = `${orderId}-${Date.now()}`;

    // Buat parameter untuk Midtrans
    const parameter: MidtransParameter = {
      transaction_details: {
        order_id: newTransactionId,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      status: "success",
      token: transaction.token,
      originalOrderId: orderId,
      newTransactionId: newTransactionId,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error continuing transaction";

    return NextResponse.json(
      {
        status: "error",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
