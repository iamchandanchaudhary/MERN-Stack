import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/UserNavbar";
import StarRating from "../components/StarRating";
import { AuthContext } from "../context/AuthContext";

const StoreDetails = () => {
  const { backendUrl, user } = useContext(AuthContext);
  const { storeId } = useParams();
  const baseUrl = useMemo(() => (
    backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl
  ), [backendUrl]);

  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [isRatingSubmitting, setIsRatingSubmitting] = useState(false);
  const [ratingError, setRatingError] = useState("");
  const [ratingSuccess, setRatingSuccess] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadStore = async () => {
      if (!storeId) {
        setLoadError("Store id is required.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setLoadError("");
      setRatingError("");
      setRatingSuccess("");
      setSelectedRating(0);

      try {
        const query = user?.id ? `?userId=${user.id}` : "";
        const response = await fetch(`${baseUrl}/api/stores/${storeId}${query}`);
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.message || "Unable to load store details.");
        }

        if (isActive) {
          const storePayload = data.store || null;
          setStore(storePayload);
          setSelectedRating(Number(storePayload?.userRating) || 0);
        }
      } catch (error) {
        if (isActive) {
          setLoadError(error.message || "Unable to load store details.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadStore();

    return () => {
      isActive = false;
    };
  }, [baseUrl, storeId, user?.id]);

  const formatDate = (value) => {
    if (!value) {
      return "";
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "";
    }

    return parsed.toLocaleDateString();
  };

  const getRatingSummary = (value) => {
    const reviewCount = Number(value?.reviewCount) || 0;
    const averageRating = Number(value?.averageRating) || 0;

    return {
      reviewCount,
      averageRating
    };
  };

  const handleSubmitRating = async () => {
    if (!storeId || !user?.id || isRatingSubmitting) {
      return;
    }

    if (!selectedRating) {
      setRatingError("Please select a rating.");
      return;
    }

    setRatingError("");
    setRatingSuccess("");
    setIsRatingSubmitting(true);

    try {
      const response = await fetch(`${baseUrl}/api/stores/${storeId}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.id,
          rating: selectedRating
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to save rating.");
      }

      if (data.store) {
        setStore(data.store);
        setSelectedRating(Number(data.store.userRating) || selectedRating);
      }

      setRatingSuccess("Rating saved. You can update it anytime.");
    } catch (error) {
      setRatingError(error.message || "Unable to save rating.");
    } finally {
      setIsRatingSubmitting(false);
    }
  };

  const existingRating = Number(store?.userRating) || 0;
  const ratingButtonLabel = existingRating ? "Update rating" : "Submit rating";

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe,_transparent_65%)]" />
      <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/4 rounded-full bg-sky-200/60 blur-3xl" />

      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10">
        <Link
          to="/user-dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-500"
        >
          <svg viewBox="0 -960 960 960" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z" />
          </svg>
          Back to dashboard
        </Link>

        {isLoading && (
          <div className="mt-8 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-xl backdrop-blur">
            <div className="h-64 w-full rounded-2xl bg-slate-200 animate-pulse" />
            <div className="mt-6 h-6 w-2/3 rounded bg-slate-200 animate-pulse" />
            <div className="mt-3 h-4 w-full rounded bg-slate-200 animate-pulse" />
            <div className="mt-3 h-4 w-5/6 rounded bg-slate-200 animate-pulse" />
          </div>
        )}

        {!isLoading && loadError && (
          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-700">
            {loadError}
          </div>
        )}

        {!isLoading && !loadError && store && (
          <section className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 shadow-xl backdrop-blur">
              <div className="h-72 w-full overflow-hidden bg-slate-100">
                {store.imageUrl ? (
                  <img
                    src={store.imageUrl}
                    alt={store.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-400">
                    No image available
                  </div>
                )}
              </div>
              <div className="space-y-4 p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold text-slate-900">{store.name}</h1>
                  {store.category && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {store.category}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600">{store.description}</p>
              </div>
            </div>

            <aside className="rounded-xl border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur">
              <h2 className="text-lg font-semibold text-slate-900">Store details</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Rating</p>
                  {(() => {
                    const { reviewCount, averageRating } = getRatingSummary(store);
                    const hasRatings = reviewCount > 0;

                    return (
                      <div className="mt-2 space-y-1">
                        <StarRating value={hasRatings ? averageRating : 0} size="h-4 w-4" />
                        <p className="text-sm text-slate-700">
                          {hasRatings
                            ? `${averageRating.toFixed(1)} / 5 (${reviewCount} review${reviewCount === 1 ? "" : "s"})`
                            : "No ratings yet"}
                        </p>
                      </div>
                    );
                  })()}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Address</p>
                  <p className="mt-1 text-sm text-slate-700">{store.address}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Category</p>
                  <p className="mt-1 text-sm text-slate-700">{store.category || "Not specified"}</p>
                </div>
                {store.createdAt && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Created on</p>
                    <p className="mt-1 text-sm text-slate-700">{formatDate(store.createdAt)}</p>
                  </div>
                )}
                {store.updatedAt && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Last updated</p>
                    <p className="mt-1 text-sm text-slate-700">{formatDate(store.updatedAt)}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-slate-200/70 pt-5">
                <p className="text-sm font-semibold text-slate-900">Rate this store</p>
                <p className="text-xs text-slate-500">Select a rating from 1 to 5.</p>
                {existingRating > 0 && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <StarRating value={existingRating} size="h-4 w-4" />
                    <span>
                      Your current rating: <span className="font-semibold text-slate-700">{existingRating}</span>
                    </span>
                  </div>
                )}

                <div className="mt-4">
                  <StarRating
                    value={selectedRating}
                    size="h-7 w-7"
                    onChange={(rating) => {
                      setSelectedRating(rating);
                      setRatingError("");
                      setRatingSuccess("");
                    }}
                    disabled={!user?.id || isRatingSubmitting}
                    label="Select rating"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmitRating}
                  disabled={!selectedRating || isRatingSubmitting || !user?.id}
                  className="mt-4 w-full rounded-xl bg-linear-to-br from-[#0141cb] to-[#00a9fd] cursor-pointer py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isRatingSubmitting ? "Saving rating..." : ratingButtonLabel}
                </button>

                {!user?.id && (
                  <p className="mt-3 text-xs text-slate-500">
                    Please sign in again to submit a rating.
                  </p>
                )}

                {ratingError && (
                  <p className="mt-3 text-sm text-red-600">{ratingError}</p>
                )}
                {ratingSuccess && (
                  <p className="mt-3 text-sm text-emerald-600">{ratingSuccess}</p>
                )}
              </div>
            </aside>
          </section>
        )}
      </main>
    </div>
  );
};

export default StoreDetails;
