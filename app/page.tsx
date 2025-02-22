"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [curr, setCurr] = useState(0);
  const incrementHandler = () => {
    setCurr(v => v+1);
  }
  return (
   <div>
    <Button onClick={incrementHandler}>Click me {curr}</Button>
  
   </div>
  );
}
