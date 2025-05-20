const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const textResponse = await response.text();
    console.log("Resposta da API:", textResponse);

    try {
      const responseData = JSON.parse(textResponse);

      if (!response.ok) {
        console.error("Erro no upload:", responseData);
        return new Response(
          JSON.stringify({ message: responseData.message || "Erro no upload" }),
          { status: response.status, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(JSON.stringify({ url: responseData.url }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Erro ao processar resposta JSON:", error);
      console.error("Resposta não é um JSON válido:", textResponse);
      return new Response(
        JSON.stringify({ message: "Erro interno no servidor - Resposta inválida" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Erro interno no POST /api/uploadImage:", error);

    return new Response(JSON.stringify({ message: "Erro interno no servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
