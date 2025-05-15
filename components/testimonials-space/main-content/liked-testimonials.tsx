import { useTextTestimonials } from "@/lib/hooks/useTextTestimonial";
import { useVideoTestimonials } from "@/lib/hooks/useVideoTestimonials";
import { EachTestimonial } from "../each-testimonial";
import { Testimonials } from "@prisma/client";
export function LikedTestimonials({spaceSlug} : {spaceSlug : string}) {
    const {
        data : textData
    } = useTextTestimonials(spaceSlug);

    const {
        data : videoData
    } = useVideoTestimonials(spaceSlug);

    const allText = textData?.pages?.flatMap((page) => page.items) || []

    const allVideo = videoData?.pages?.flatMap((page) => page.items) || []

    const filteredText = allText.filter((t) => t.isLiked === true);
  const filteredVideo = allVideo.filter((t) => t.isLiked === true);

    if(filteredText.length === 0 && filteredVideo.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-gray-500 mb-2">Don't think you've liked anythng yet.</p>
        <p className="text-gray-400 text-sm">Go on do it!</p>
      </div>
      )
    }

    const merged = [...filteredText, ...filteredVideo].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const groupedTestimonials = [];
      for (let i = 0; i < merged.length; i += 2) {
        groupedTestimonials.push(merged.slice(i, i + 2));
      }

    
      return (
        <div className="flex flex-col space-y-4">
        {groupedTestimonials.map((pair, index) => (
          <div
            key={index}
            className="grid md:grid-cols-2 gap-4 grid-flow-row auto-rows-fr"
          >
            {pair.map((testimonial: Testimonials) => (
              <div key={testimonial.id} className="h-full">
                <EachTestimonial {...testimonial} spaceSlug={spaceSlug} />
              </div>
            ))}
          </div>
        ))}
      </div>
      )

}