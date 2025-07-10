import { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import MapView from "../components/MapView";

function Home() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ state: "", price: "", type: "" });
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const queryParams = new URLSearchParams({ ...filters, page, limit });
    fetch(`http://localhost:3000/api/properties?${queryParams}`)
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("Error fetching properties:", err));
  }, [page, filters]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="home-container">
      <h1 className="display-3 text-center mb-4 heading-animate">
        Find Your Dream Property
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            {properties.length > 0 ? (
              properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-12 text-center">No properties found</div>
            )}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="align-self-center">Page {page}</span>
            <button
              className="btn btn-outline-primary ms-2"
              onClick={() => setPage(page + 1)}
              disabled={properties.length < limit}
            >
              Next
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <MapView properties={properties} />
        </div>
      </div>
    </div>
  );
}

export default Home;
