import { Link } from "react-router-dom";
import VirtualTour from "./VirtualTour";

function PropertyCard({ property }) {
  return (
    <div className="col-md-6 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={`https://picsum.photos/600/400?random=${property.id}`}
          className="card-img-top"
          alt={property.title}
          onError={(e) => (e.target.src = "/placeholder.jpg")}
        />
        <div className="card-body">
          <h5 className="card-title">{property.title}</h5>
          <p className="card-text">
            {property.description.substring(0, 100)}...
          </p>
          <p className="card-text">
            <strong>Price:</strong> ₦{property.price.toLocaleString()}
          </p>
          <p className="card-text">
            <strong>Location:</strong> {property.location}
          </p>
          <p className="card-text">
            <strong>Type:</strong> {property.type}
          </p>
          <p className="card-text">
            <strong>Owner:</strong> {property.ownerName}
          </p>
          <p className="card-text">
            <strong>Contact:</strong> {property.ownerPhone} |{" "}
            {property.ownerEmail}
          </p>
          <VirtualTour tourUrl={property.tourUrl} />
          <Link to={`/property/${property.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
