import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import StarRating from "../components/StarRating";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
	const { backendUrl } = useContext(AuthContext);
	const baseUrl = useMemo(() => (
		backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl
	), [backendUrl]);

	const [stores, setStores] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [listError, setListError] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [sortBy, setSortBy] = useState("date");
	const [sortOrder, setSortOrder] = useState("desc");

	useEffect(() => {
		let isActive = true;

		const loadStores = async () => {
			setIsLoading(true);
			setListError("");

			try {
				const response = await fetch(`${baseUrl}/api/stores`);
				const data = await response.json().catch(() => ({}));

				if (!response.ok) {
					throw new Error(data.message || "Unable to load stores.");
				}

				if (isActive) {
					setStores(Array.isArray(data.stores) ? data.stores : []);
				}
			} catch (error) {
				if (isActive) {
					setListError(error.message || "Unable to load stores.");
				}
			} finally {
				if (isActive) {
					setIsLoading(false);
				}
			}
		};

		loadStores();

		return () => {
			isActive = false;
		};
	}, [baseUrl]);

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

	const getRatingSummary = (store) => {
		const reviewCount = Number(store?.reviewCount) || 0;
		const averageRating = Number(store?.averageRating) || 0;

		return {
			reviewCount,
			averageRating
		};
	};

	const categories = useMemo(() => {
		const categoryValues = stores
			.map((store) => (store?.category || "").trim())
			.filter(Boolean);

		return ["all", ...Array.from(new Set(categoryValues))];
	}, [stores]);

	const filteredStores = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		const selectedCategory = categoryFilter.toLowerCase();
		const orderMultiplier = sortOrder === "asc" ? 1 : -1;

		const matchesQuery = (store) => {
			if (!query) {
				return true;
			}

			const fields = [store?.name, store?.description, store?.address, store?.category]
				.filter(Boolean)
				.map((value) => value.toLowerCase());

			return fields.some((value) => value.includes(query));
		};

		const matchesCategory = (store) => {
			if (selectedCategory === "all") {
				return true;
			}

			return (store?.category || "").toLowerCase() === selectedCategory;
		};

		const sorted = stores
			.filter((store) => matchesQuery(store) && matchesCategory(store))
			.slice();

		sorted.sort((storeA, storeB) => {
			if (sortBy === "rating") {
				const ratingA = Number(storeA?.averageRating) || 0;
				const ratingB = Number(storeB?.averageRating) || 0;
				return (ratingA - ratingB) * orderMultiplier;
			}

			const dateA = new Date(storeA?.createdAt || 0).getTime() || 0;
			const dateB = new Date(storeB?.createdAt || 0).getTime() || 0;
			return (dateA - dateB) * orderMultiplier;
		});

		return sorted;
	}, [stores, searchQuery, categoryFilter, sortBy, sortOrder]);

	const storeCountLabel = filteredStores.length === stores.length
		? `${stores.length} stores available`
		: `${filteredStores.length} of ${stores.length} stores`;

	return (
		<div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe,_transparent_65%)]" />
			<div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/4 rounded-full bg-sky-200/60 blur-3xl" />

			<UserNavbar />

			<main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10">
				<header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">
							User dashboard
						</p>
						<h1 className="text-3xl font-semibold text-slate-900">Discover stores</h1>
						<p className="text-sm text-slate-600">
							Browse every store added by owners and view full details.
						</p>
					</div>
					<div className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-600">
						<span className="font-semibold text-slate-900">{storeCountLabel}</span>
					</div>
				</header>

				<section className="mt-6 rounded-xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
						<label className="block text-sm font-semibold text-slate-700">
							Search stores
							<input
								type="text"
								value={searchQuery}
								onChange={(event) => setSearchQuery(event.target.value)}
								placeholder="Search by name, address, or category"
								className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
							/>
						</label>

						<label className="block text-sm font-semibold text-slate-700">
							Category
							<select
								value={categoryFilter}
								onChange={(event) => setCategoryFilter(event.target.value)}
								className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
							>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category === "all" ? "All categories" : category}
									</option>
								))}
							</select>
						</label>

						<label className="block text-sm font-semibold text-slate-700">
							Sort by
							<select
								value={sortBy}
								onChange={(event) => setSortBy(event.target.value)}
								className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
							>
								<option value="date">Date added</option>
								<option value="rating">Rating</option>
							</select>
						</label>

						<label className="block text-sm font-semibold text-slate-700">
							Order
							<select
								value={sortOrder}
								onChange={(event) => setSortOrder(event.target.value)}
								className="mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
							>
								<option value="desc">Descending</option>
								<option value="asc">Ascending</option>
							</select>
						</label>
					</div>
				</section>

				<section className="mt-10">
					{isLoading && (
						<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
							{[0, 1, 2].map((item) => (
								<div
									key={`placeholder-${item}`}
									className="h-72 rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-sm animate-pulse"
								>
									<div className="h-36 w-full rounded-2xl bg-slate-200" />
									<div className="mt-5 h-4 w-2/3 rounded bg-slate-200" />
									<div className="mt-3 h-3 w-full rounded bg-slate-200" />
									<div className="mt-3 h-3 w-5/6 rounded bg-slate-200" />
								</div>
							))}
						</div>
					)}

					{!isLoading && listError && (
						<div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-700">
							{listError}
						</div>
					)}

					{!isLoading && !listError && stores.length === 0 && (
						<div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
							No stores available yet. Please check back later.
						</div>
					)}

					{!isLoading && !listError && stores.length > 0 && filteredStores.length === 0 && (
						<div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
							No stores match your filters. Try adjusting the search or filters.
						</div>
					)}

					{!isLoading && !listError && filteredStores.length > 0 && (
						<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
							{filteredStores.map((store) => {
								const { reviewCount, averageRating } = getRatingSummary(store);

								return (
									<Link
										to={`/stores/${store.id}`}
										key={store.id}
										className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 shadow-xl backdrop-blur transition cursor-pointer"
									>
										<div className="h-44 w-full overflow-hidden bg-slate-100">
											{store.imageUrl ? (
												<img
													src={store.imageUrl}
													alt={store.name}
													className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
												/>
											) : (
												<div className="flex h-full items-center justify-center text-xs text-slate-400">
													No image available
												</div>
											)}
										</div>

										<div className="space-y-3 p-5">
											<div className="flex items-start justify-between gap-3">
												<h2 className="text-lg font-semibold text-slate-900">{store.name}</h2>
												{store.category && (
													<span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
														{store.category}
													</span>
												)}
											</div>

											<p className="text-sm text-slate-600">{store.description}</p>

											{reviewCount > 0 ? (
												<div className="flex items-center gap-2 text-xs text-slate-500">
													<StarRating value={averageRating} size="h-4 w-4" />
													<span>
														{averageRating.toFixed(1)} / 5 · {reviewCount} review{reviewCount === 1 ? "" : "s"}
													</span>
												</div>
											) : (
												<div className="flex items-center gap-2 text-xs text-slate-400">
													<StarRating value={0} size="h-4 w-4" />
													<span>No ratings yet</span>
												</div>
											)}

											<div className="space-y-1 text-xs text-slate-500">
												<p>{store.address}</p>
												{store.createdAt && (
													<p>Created on {formatDate(store.createdAt)}</p>
												)}
											</div>

											<span
												className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-500"
											>
												View details
												<svg viewBox="0 -960 960 960" className="h-4 w-4 fill-current" aria-hidden="true">
													<path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
												</svg>
											</span>
										</div>
									</Link>
								);
							})}
						</div>
					)}
				</section>
			</main>
		</div>
	);
};

export default UserDashboard;
