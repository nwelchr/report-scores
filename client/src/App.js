import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchHello = async () => {
  const { data } = await axios.get("/api/hello");
  return data;
};

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["hello"],
    queryFn: fetchHello,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-red-50">
      <h1>{data.message}</h1>
    </div>
  );
}

export default App;
