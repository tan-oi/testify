"use client"
import { useTextTestimonials } from "@/lib/hooks/useTextTestimonial"
import { useVideoTestimonials } from "@/lib/hooks/useVideoTestimonials"

export function AllTestimonials({
    spaceSlug
} : {
    spaceSlug : string
}) {
    const {data : textData, isLoading : textLoading, hasNextPage : hasNextTextPage, fetchNextPage : fetchNextTextPage, isFetchingNextPage : isFetchingNextTextPage} = useTextTestimonials(spaceSlug);

    const {
        data : videoData, isLoading : videoLoading, hasNextPage : hasNextVideoPage, fetchNextPage : fetchNextVideoPage, isFetchingNextPage : isFetchingNextVideoPage
    } = useVideoTestimonials(spaceSlug);

    return (
        <>
            <p>this is an all component</p>

            <div>
                text
                <div>
                    
            {JSON.stringify(textData)}
                </div>
            </div>

            {/* <div>
                video 
                <div>
                    {JSON.stringify(videoData)}
                </div>
            </div> */}

            {hasNextTextPage && (
        <button onClick={() => fetchNextTextPage()} disabled={isFetchingNextTextPage}>
          {isFetchingNextTextPage ? "Loading text..." : "Load More text"}
        </button>
      )}

                
            {/* {hasNextVideoPage && (
        <button onClick={() => fetchNextVideoPage()} disabled={isFetchingNextVideoPage}>
          {isFetchingNextVideoPage ? "Loading video..." : "Load More video"}
        </button>
      )} */}

        </>
    )
}