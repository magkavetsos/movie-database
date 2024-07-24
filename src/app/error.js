"use client";

export default function Error({ error, reset }) {
  return (
    <div className="error-boundary">
      <h2>Something went wrong!</h2>
      {error && <h4>{error.message}</h4>}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
