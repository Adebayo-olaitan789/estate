import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MapView from "../components/MapView";
import VirtualTour from "../components/VirtualTour";
import ThreeDShowcase from "../components/ThreeDShowcase";

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data))
      .catch((err) => console.error("Error fetching property:", err));
  }, [id]);

  if (!property) return <div className="text-center">Loading...</div>;

  return (
    <div className="container">
      <h1 className="mb-4">{property.title}</h1>
      <div className="row">
        <div className="col-md-8">
          <img
            src={`https://picsum.photos/800/600?random=${property.id}`}
            className="img-fluid mb-4"
            alt={property.title}
            onError={(e) => (e.target.src = "/placeholder.jpg")}
          />
          <div className="card mb-4">
            <div className="card-body">
              <h3>Details</h3>
              <p>
                <strong>Description:</strong> {property.description}
              </p>
              <p>
                <strong>Price:</strong> ₦{property.price.toLocaleString()}
              </p>
              <p>
                <strong>Location:</strong> {property.location}
              </p>
              <p>
                <strong>Type:</strong> {property.type}
              </p>
              <p>
                <strong>Owner:</strong> {property.ownerName}
              </p>
              <p>
                <strong>Contact:</strong> {property.ownerPhone} |{" "}
                {property.ownerEmail}
              </p>
              <VirtualTour tourUrl={property.tourUrl} />
            </div>
          </div>
          <ThreeDShowcase />
        </div>
        <div className="col-md-4">
          <MapView property={[property]} />
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
