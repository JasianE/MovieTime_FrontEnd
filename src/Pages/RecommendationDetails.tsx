import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetRecommendationById, UpdateRecommendation } from "../Services/UserMovie.service";
import type { RecommendationDetailType } from "../Types/movieTypes";
import "../App.css";

type RecommendationDetailsProps = {
  jwt: string;
};

const RecommendationDetails: React.FC<RecommendationDetailsProps> = ({ jwt }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recommendation, setRecommendation] = useState<RecommendationDetailType | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [watched, setWatched] = useState(false);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    GetRecommendationById(jwt, Number(id))
      .then((data) => {
        setRecommendation(data);
        setRating(data.recipientRating ?? null);
        setNotes(data.recipientNotes ?? "");
        setWatched(data.status === 1);
      })
      .catch((err) => setMessage(err?.message || "Could not load recommendation."));
  }, [id, jwt]);

  const handleSave = () => {
    if (!recommendation || pending) {
      return;
    }
    setPending(true);
    UpdateRecommendation(jwt, recommendation.recommendationId, {
      recipientRating: rating,
      recipientNotes: notes,
      status: watched ? 1 : 0
    })
      .then(() => setMessage("Saved."))
      .catch((err) => setMessage(err?.message || "Could not save changes."))
      .finally(() => setPending(false));
  };

  if (!recommendation) {
    return <div className="page-loading">Loading...</div>;
  }

  return (
    <div className="recommendation-details-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Recommendation details</p>
          <h1>{recommendation.title}</h1>
          <p className="muted">Recommended by {recommendation.recommendedByUserName}</p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate("/dashboard")}>Back to dashboard</button>
      </header>

      {message && <p className="form-error">{message}</p>}

      <div className="recommendation-details">
        <img
          className="details-poster"
          src={`https://image.tmdb.org/t/p/w300${recommendation.posterPath}`}
          alt={recommendation.title}
        />
        <div className="details-info">
          <div className="details-section">
            <h3>Why it was recommended</h3>
            <p className="muted">{recommendation.reason || "No reason provided."}</p>
          </div>

          <div className="details-section">
            <h3>Your rating</h3>
            <div className="rating-row">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`rating-pill ${rating === value ? "active" : ""}`}
                  onClick={() => setRating(value)}
                >
                  {value}
                </button>
              ))}
              <button className="btn btn-ghost" onClick={() => setRating(null)}>
                Clear
              </button>
            </div>
          </div>

          <div className="details-section">
            <h3>Your notes</h3>
            <textarea
              className="notes-input"
              placeholder="Add your thoughts"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
            />
          </div>

          <div className="details-section">
            <label className="watched-toggle">
              <input
                type="checkbox"
                checked={watched}
                onChange={(event) => setWatched(event.target.checked)}
              />
              <span>Mark as watched</span>
            </label>
          </div>

          <div className="details-actions">
            <button className="btn btn-primary" onClick={handleSave} disabled={pending}>
              {pending ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetails;