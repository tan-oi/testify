  import { ImportedTestimonials } from "./main-content/imported-testimonial";
  import { ImportDialog } from "../import-dialog";
import { Suspense } from "react";
  export  function ImportTestimonials({spaceSlug} :{spaceSlug : string}) {
     
    return (
      <>
        <div className="flex flex-col">
        <ImportDialog spaceSlug = {spaceSlug}/>
          <div>
         
              <ImportedTestimonials spaceSlug={spaceSlug}/>
            
          </div>
        </div>
      </>
    );
  }
