import { useState } from "react";

function SearchBar({ onSearch }) {
  const [state, setState] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  const nigerianStates = [
    "",
    "Abia",
    "Abuja",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Cross River",
    "Delta",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Kaduna",
    "Kano",
    "Kogi",
    "Kwara",
    "Lagos",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ state: state ? `${state}, Nigeria` : "", price, type });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-3">
        <div className="col-md-4">
          <select
            className="form-select"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {nigerianStates.map((stateOption) => (
              <option key={stateOption} value={stateOption}>
                {stateOption || "Select State"}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Max Price (₦)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
