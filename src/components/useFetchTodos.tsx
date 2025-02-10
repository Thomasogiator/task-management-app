import { useState, useEffect } from "react";

export interface Task{
    title: string,
    description: string,
    dueDate: string,
    priority: string,
    status: string,
    id: number
}

const useFetch = (url: string) => {
    
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [url]);

  // Function to fetch data (GET request)
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result: Task[] = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to send a POST request
  const postData = async (body: any) => {
    return await handleRequest("POST", body);
  };

  // Function to update data with a PUT request
  const updateData = async (id: number, body: any) => {
    return await handleRequest("PUT", body, id);
  };

  // Function to delete data with a DELETE request
  const deleteData = async (id: number) => {
    return await handleRequest("DELETE", null, id);
  };

  // Generic function to handle POST, PUT, DELETE requests
  const handleRequest = async (method: string, body: any, id?: number) => {
    setLoading(true);
    try {
      const response = await fetch(id ? `${url}/${id}` : url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) throw new Error(`Failed to ${method} data`);
      const result = method !== "DELETE" ? await response.json() : { success: true };

      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData, updateData, deleteData, refetch: fetchData };
};

export default useFetch;
