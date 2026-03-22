import { useNavigate } from "react-router-dom";
import type { MovieType } from "../Types/movieTypes";
import "../App.css";

type RecommendationCardProps = {
  recommendation: MovieType;
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const navigate = useNavigate();
  const ratingLabel = recommendation.recipientRating ? `${recommendation.recipientRating}/5` : "Not rated";

  return (
    <div className="recommendation-card">
      <div className="recommendation-info">
        <img
          className="recommendation-poster"
          src={`https://image.tmdb.org/t/p/w200${recommendation.posterPath}`}
          alt={recommendation.title}
        />
        <div>
          <h3>{recommendation.title}</h3>
          <p className="muted">Recommended by {recommendation.recommendedByUserName}</p>
          <p className="recommendation-reason">
            {recommendation.reason ? `Reason: ${recommendation.reason}` : "No reason provided."}
          </p>
        </div>
      </div>
      <div className="recommendation-actions">
        <span className="pill pill-light">{ratingLabel}</span>
        <button
          className="btn btn-ghost"
          onClick={() => navigate(`/recommendations/${recommendation.recommendationId}`)}
        >
          Open details
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;