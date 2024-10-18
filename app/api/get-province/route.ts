import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log('Error di API:', error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
