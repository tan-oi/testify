export default function Loading() {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-16">
      
        
        <div className="flex h-full">
        
          <div className="w-72 p-6 border-r border-gray-800">
          
            <div className="mb-8">
              <div className="h-7 w-24 bg-gray-800 rounded mb-4 animate-pulse"></div>
              
           
              <div className="space-y-3">
                <div className="h-10 w-full bg-blue-600/20 rounded-lg relative overflow-hidden">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 bg-gray-700 rounded animate-pulse"></div>
                  <div className="absolute left-10 top-1/2 transform -translate-y-1/2 h-5 w-16 bg-gray-700 rounded animate-pulse"></div>
                  <div className="shimmer-effect absolute inset-0"></div>
                </div>
                
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-10 w-full rounded-lg relative overflow-hidden flex items-center px-3">
                    <div className="h-5 w-5 bg-gray-800 rounded mr-2 animate-pulse"></div>
                    <div className="h-5 w-20 bg-gray-800 rounded animate-pulse"></div>
                    <div className="shimmer-effect absolute inset-0"></div>
                  </div>
                ))}
              </div>
            </div>
            
            
            <div className="mb-8">
              <div className="h-7 w-32 bg-gray-800 rounded mb-4 animate-pulse"></div>
              
              <div className="h-10 w-full rounded-lg relative overflow-hidden flex items-center px-3">
                <div className="h-5 w-5 bg-gray-800 rounded mr-2 animate-pulse"></div>
                <div className="h-5 w-24 bg-gray-800 rounded animate-pulse"></div>
                <div className="shimmer-effect absolute inset-0"></div>
              </div>
            </div>
            
   
            <div>
              <div className="h-7 w-24 bg-gray-800 rounded mb-4 animate-pulse"></div>
              
              <div className="h-10 w-full rounded-lg relative overflow-hidden flex items-center px-3">
                <div className="h-5 w-5 bg-gray-800 rounded mr-2 animate-pulse"></div>
                <div className="h-5 w-40 bg-gray-800 rounded animate-pulse"></div>
                <div className="shimmer-effect absolute inset-0"></div>
              </div>
            </div>
          </div>
        
          <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-4 max-w-md">
              <div className="h-7 w-56 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-5 w-64 bg-gray-800 rounded animate-pulse"></div>
            </div>
            <div className="shimmer-effect absolute inset-0"></div>
          </div>
        </div>
        
        
        <div className="fixed bottom-6 right-6">
          <div className="h-12 w-12 bg-gray-800 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }
  