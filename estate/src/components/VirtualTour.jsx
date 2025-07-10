function VirtualTour({ tourUrl }) {
  return (
    <div className="mb-3">
      {tourUrl ? (
        <a
          href={tourUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-secondary"
        >
          View 360° Virtual Tour
        </a>
      ) : (
        <p>Virtual Tour Coming Soon</p>
      )}
    </div>
  );
}

export default VirtualTour;
