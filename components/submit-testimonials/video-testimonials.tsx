"use client";
import { useState } from "react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
export default function VideoTestimonial() {
 
  const [selectedVideo, setSelectedVideo] = useState<string|null>(null);
  
  const [videoFile, setVideoFile] = useState(null);
  
  const [uploadedVideo, setUploadedVideo] = useState<string|null>(null);
  
 
  
  const { startUpload: startVideoUpload, isUploading: isVideoUploading } = 
    useUploadThing("videoUploader", {
      onClientUploadComplete: (res) => {
        setUploadedVideo(res[0].url);
        setSelectedVideo(null);
        setVideoFile(null);
        alert("Upload Completed");
      },
      onUploadError: (error) => {
        alert(`ERROR! ${error.message}`);
      },
    });
  
  const handleImageSelect = (e:any) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(null);
      setVideoFile(null);
    
    }
  };
  
  const handleVideoSelect = (e:any) => {
    const file = e.target.files?.[0];
    if (file) {
     
      setVideoFile(file);
      setSelectedVideo(URL.createObjectURL(file));
    }
  };
  
  
  
  const uploadVideo = async () => {
    if (videoFile) {
      try {
        await startVideoUpload([videoFile]);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };
  
  const handleCancel = () => {
  
    setSelectedVideo(null);
   
    setVideoFile(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
        
       <Dialog>
        <DialogTrigger asChild>
            <Button>Video</Button>
        </DialogTrigger>
        <DialogContent>
        {selectedVideo && (
          <div className="mt-6 border rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Video Preview</h2>
            <div className="mb-4 flex justify-center">
              <video controls className="max-w-full rounded-lg">
                <source src={selectedVideo} />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                disabled={isVideoUploading}
              >
                Cancel
              </button>
              <button
                onClick={uploadVideo}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={isVideoUploading}
              >
                {isVideoUploading ? "Uploading..." : "Confirm Upload"}
              </button>
            </div>
          </div>
        )}
        
        {(uploadedVideo) && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-medium mb-4">Uploaded Files</h2>
            
          
            
            {uploadedVideo && (
              <div className="mb-4">
                <p className="mb-2 font-medium">Uploaded Video:</p>
                <video controls className="max-w-full rounded-lg" style={{ maxWidth: "400px" }}>
                  <source src={uploadedVideo} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        )}
        </DialogContent>
       </Dialog>
        
        
       
     
    </main>
  );
}