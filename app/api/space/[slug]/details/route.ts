
import { auth } from '@/auth';
import { fetchParticularSpace } from '@/lib/services/dashboardMetrics';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {

  const session = await auth();
  if(!session || !session?.user) {
    return redirect("/auth");
  }
 
  const userId = session?.user?.id
  const slug = await params.slug;
  const spaceData = await fetchParticularSpace(slug,userId as string);
  
  console.log('Slug value:', slug);
  
  return NextResponse.json({ spaceSlug: slug,
data : spaceData });
}