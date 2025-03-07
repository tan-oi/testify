
import { fetchParticularSpace } from '@/lib/services/dashboardMetrics';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
 
  const slug = await params.slug;
  const spaceData = await fetchParticularSpace(slug);
  
  console.log('Slug value:', slug);
  
  return NextResponse.json({ spaceSlug: slug,
data : spaceData });
}