import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

interface TransactionItem {
  id: string;
  price: number;
  quantity: number;
  name: string;
}

// Define a type for the update data
type UpdateData = {
  transactionId: string;
  updatedAt: ReturnType<typeof serverTimestamp>;
  bankName?: string;
};

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
      isProduction: true,
      serverKey: serverKey,
      clientKey: clientKey,
    });

    const requestData = await request.json();

    const {
      orderId,
      amount,
      firstName,
      lastName,
      email,
      phoneNumber,
      items,
      bankName,
    } = requestData;

    // Validasi required fields
    if (!orderId || !amount || !firstName || !email || !phoneNumber || !items) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing required fields for transaction",
        },
        { status: 400 }
      );
    }

    // Truncate item names to max 50 characters and calculate total
    const processedItems = items.map((item: TransactionItem) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      name: item.name.substring(0, 50), // Truncate name to 50 chars
    }));

    // Calculate total from items
    const calculatedTotal = processedItems.reduce(
      (sum: number, item: TransactionItem) => sum + item.price * item.quantity,
      0
    );

    // Validate if calculated total matches the provided amount
    if (calculatedTotal !== amount) {
      return NextResponse.json(
        {
          status: "error",
          message: "Total amount does not match with items total",
        },
        { status: 400 }
      );
    }

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      item_details: processedItems,
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: firstName,
        last_name: lastName || "",
        email: email,
        phone: phoneNumber,
      },
    };

    // Add debug logging
    console.log("Creating transaction with parameters:", {
      ...parameter,
      serverKey: serverKey?.substring(0, 10) + "...",
      isProduction: true,
    });

    const transaction = await snap.createTransaction(parameter);

    console.log("Transaction created:", {
      token: transaction.token,
      orderId: orderId,
    });

    // Update status transaksi di Firestore
    const ordersRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string
    );
    const q = query(ordersRef, where("orderId", "==", orderId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const orderDoc = querySnapshot.docs[0];
      const updateData: Partial<UpdateData> = {
        transactionId: transaction.token,
        updatedAt: serverTimestamp(),
      };

      // Only add bankName if it is defined
      if (bankName) {
        updateData.bankName = bankName;
      }

      await updateDoc(orderDoc.ref, updateData);
    }

    return NextResponse.json({
      status: "success",
      token: transaction.token,
      orderId: orderId,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error creating transaction";

    return NextResponse.json(
      {
        status: "error",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
