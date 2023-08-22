"use client";

import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div>
      Error <button onClick={reset}>Try again55</button>
    </div>
  );
};

export default Error;
