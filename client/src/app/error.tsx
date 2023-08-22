"use client";

import { useEffect } from "react";



const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div>
      {error.message || "Error when trying to show you this page!"}
      Error <button onClick={reset}>Try again</button>
    </div>
  );
};

export default Error;
