import { NextResponse } from 'next/server';
import { fetchFinancialData } from '@/lib/api-client';

export const revalidate = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'business';
  const apiKey = process.env.GNEWS_API_KEY;

  let data;
  try {
    data = await fetchFinancialData(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${apiKey}`
    );
  } catch (err: any) {
    // Extract status code from error message if possible
    const statusCode = parseInt(err.message.split(': ')[1]) || 500;
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: statusCode });
  }

  if (!data) return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });

  // Map GNews format to our NewsArticle type
  const articles = data.articles.map((art: any) => ({
    id: art.url,
    title: art.title,
    summary: art.description,
    url: art.url,
    source: art.source.name,
    publishedAt: art.publishedAt,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    imageUrl: art.image,
  }));

  return NextResponse.json(articles);
}
