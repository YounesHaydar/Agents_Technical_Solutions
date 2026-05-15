import { NextResponse } from 'next/server';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = 'v2021-10-21';
const token = process.env.SANITY_API_TOKEN;

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  if (!projectId) return NextResponse.json({ error: 'Missing SANITY project id' }, { status: 500 });
  if (!token) return NextResponse.json({ error: 'Missing SANITY_API_TOKEN' }, { status: 500 });

  const url = `https://${projectId}.api.sanity.io/${apiVersion}/data/mutate/${dataset}`;
  const body = { mutations: [{ delete: { id } }] };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'Sanity delete failed', details: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ ok: true, data });
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
