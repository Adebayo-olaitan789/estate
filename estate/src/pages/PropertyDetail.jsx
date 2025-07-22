import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PropertyDetail() {
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const backendUrl =
    process.env.NODE_ENV === "production"
      ? "https://estate-7rjd.onrender.com/api/properties" // Replace with your actual backend URL
      : "http://localhost:3000/api/properties";

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout
    setProperty(null);
    setError(null);
    fetch(`${backendUrl}/${id}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0)
          throw new Error("No data received");
        setProperty(data);
      })
      .catch((err) => {
        console.error("Error fetching property details:", err);
        setError(err.name === "AbortError" ? "Request timed out" : err.message);
      })
      .finally(() => clearTimeout(timeoutId));
  }, [id]);

  if (error)
    return <div className="text-center text-danger mt-4">Error: {error}</div>;
  if (!property) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{property.title || "Property Details"}</h2>
      <img
        src={property.image || "https://picsum.photos/300/200"}
        alt={property.title}
        className="img-fluid mb-3"
      />
      <p>
        <strong>Location:</strong> {property.location}
      </p>
      <p>
        <strong>Price:</strong> ₦{property.price}
      </p>
      <p>
        <strong>Type:</strong> {property.type}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {property.description || "No description available"}
      </p>
    </div>
  );
}

export default PropertyDetail;
