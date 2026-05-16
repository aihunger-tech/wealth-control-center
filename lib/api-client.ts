export async function fetchFinancialData(url: string, apiKey?: string) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (url.includes('coinmarketcap.com') && apiKey) {
      headers['X-CMC_PRO_API_KEY'] = apiKey;
    }

    const response = await fetch(url, {
      headers: headers,
      ...( { next: { revalidate: 60 } } as any), 
    });

    if (!response.ok) {
      // THIS WILL TELL US THE EXACT ERROR IN THE TERMINAL
      const errorText = await response.text();
      console.error(`API ERROR [${response.status}] at ${url}:`, errorText);
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Fetch Error:", error.message);
    return null;
  }
}
