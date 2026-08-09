import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StoreOwnerNavbar from "../components/StoreOwnerNavbar";
import StarRating from "../components/StarRating";
import { AuthContext } from "../context/AuthContext";

const StoreOwner = () => {
	const { backendUrl, user, scrollUp } = useContext(AuthContext);
	const baseUrl = useMemo(() => (
		backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl
	), [backendUrl]);

	const [stores, setStores] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [listError, setListError] = useState("");
	const [formError, setFormError] = useState("");
	const [formSuccess, setFormSuccess] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingStoreId, setEditingStoreId] = useState(null);
	const [formValues, setFormValues] = useState({
		name: "",
		description: "",
		address: "",
		category: ""
	});
	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState("");
	const [existingImageUrl, setExistingImageUrl] = useState("");

	const isEditing = Boolean(editingStoreId);

	useEffect(() => {
		let isActive = true;

		const loadStores = async () => {
			if (!user?.id) {
				setListError("Please sign in again to view your stores.");
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			setListError("");

			try {
				const response = await fetch(`${baseUrl}/api/stores/owner/${user.id}`);
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
	}, [baseUrl, user?.id]);

	useEffect(() => () => {
		if (imagePreview && imagePreview.startsWith("blob:")) {
			URL.revokeObjectURL(imagePreview);
		}
	}, [imagePreview]);

	const resetForm = () => {
		setFormValues({
			name: "",
			description: "",
			address: "",
			category: ""
		});
		setEditingStoreId(null);
		setImageFile(null);
		setImagePreview("");
		setExistingImageUrl("");
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleImageChange = (event) => {
		const file = event.target.files?.[0] || null;
		setFormError("");
		setFormSuccess("");

		if (!file) {
			setImageFile(null);
			setImagePreview("");
			return;
		}

		if (!file.type.startsWith("image/")) {
			setFormError("Please select a valid image file.");
			return;
		}

		const previewUrl = URL.createObjectURL(file);
		setImageFile(file);
		setImagePreview(previewUrl);
	};

	const handleEdit = (store) => {
		setEditingStoreId(store.id);
		setFormValues({
			name: store.name || "",
			description: store.description || "",
			address: store.address || "",
			category: store.category || ""
		});
		setExistingImageUrl(store.imageUrl || "");
		setImageFile(null);
		setImagePreview("");
		setFormError("");
		setFormSuccess("");
		scrollUp?.();
	};

	const handleDelete = async (storeId) => {
		if (!user?.id || isSubmitting) {
			return;
		}

		const confirmed = window.confirm("Delete this store? This cannot be undone.");
		if (!confirmed) {
			return;
		}

		setFormError("");
		setFormSuccess("");
		setIsSubmitting(true);

		try {
			const response = await fetch(
				`${baseUrl}/api/stores/${storeId}?ownerId=${user.id}`,
				{ method: "DELETE" }
			);
			const data = await response.json().catch(() => ({}));

			if (!response.ok) {
				throw new Error(data.message || "Unable to delete store.");
			}

			setStores((prev) => prev.filter((store) => store.id !== storeId));
			if (editingStoreId === storeId) {
				resetForm();
			}
			setFormSuccess("Store deleted.");
		} catch (error) {
			setFormError(error.message || "Unable to delete store.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!user?.id || isSubmitting) {
			return;
		}

		const payloadValues = {
			name: formValues.name.trim(),
			description: formValues.description.trim(),
			address: formValues.address.trim(),
			category: formValues.category.trim()
		};

		setFormError("");
		setFormSuccess("");

		if (!payloadValues.name || !payloadValues.description || !payloadValues.address || !payloadValues.category) {
			setFormError("All store fields are required.");
			return;
		}

		if (!isEditing && !imageFile) {
			setFormError("Store image is required.");
			return;
		}

		const formData = new FormData();
		formData.append("ownerId", user.id);
		formData.append("name", payloadValues.name);
		formData.append("description", payloadValues.description);
		formData.append("address", payloadValues.address);
		formData.append("category", payloadValues.category);

		if (imageFile) {
			formData.append("image", imageFile);
		}

		setIsSubmitting(true);

		try {
			const endpoint = isEditing ? `/api/stores/${editingStoreId}` : "/api/stores";
			const method = isEditing ? "PUT" : "POST";
			const response = await fetch(`${baseUrl}${endpoint}`, {
				method,
				body: formData
			});

			const data = await response.json().catch(() => ({}));

			if (!response.ok) {
				throw new Error(data.message || "Unable to save store.");
			}

			if (!data.store) {
				throw new Error("Store saved but no data returned.");
			}

			if (isEditing) {
				setStores((prev) => prev.map((store) => (store.id === data.store.id ? data.store : store)));
				setFormSuccess("Store updated.");
			} else {
				setStores((prev) => [data.store, ...prev]);
				setFormSuccess("Store created.");
			}

			resetForm();
		} catch (error) {
			setFormError(error.message || "Unable to save store.");
		} finally {
			setIsSubmitting(false);
		}
	};

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

	return (
		<div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe,_transparent_65%)]" />
			<div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl" />
			<div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/4 rounded-full bg-sky-200/60 blur-3xl" />

			<StoreOwnerNavbar />

			<main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12">
				<header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">
							Store owner workspace
						</p>
						<h1 className="text-3xl font-semibold text-slate-900">Manage your stores</h1>
						<p className="text-sm text-slate-600">
							Create, update, and maintain your store presence.
						</p>
					</div>
				</header>

				<div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
					<section className="rounded-xl border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur">
						<div className="flex flex-wrap items-start justify-between gap-4">
							<div>
								<h2 className="text-xl font-semibold text-slate-900">
									{isEditing ? "Update store" : "Create new store"}
								</h2>
								<p className="text-sm text-slate-500">
									{isEditing
										? "Make changes and save to update your listing."
										: "All fields are required for a new store."}
								</p>
							</div>
							{isEditing && (
								<button
									type="button"
									onClick={resetForm}
									className="cursor-pointer rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300"
								>
									Cancel edit
								</button>
							)}
						</div>

						<form onSubmit={handleSubmit} className="mt-6 space-y-4">
							<label className="block text-sm font-semibold text-slate-700">
								Store name
								<input
									type="text"
									name="name"
									value={formValues.name}
									onChange={handleInputChange}
									placeholder="Enter store name"
									required
									className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
								/>
							</label>

							<label className="block text-sm font-semibold text-slate-700">
								Description
								<textarea
									name="description"
									value={formValues.description}
									onChange={handleInputChange}
									placeholder="Describe the store"
									required
									rows={4}
									className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
								/>
							</label>

							<div className="grid gap-4 md:grid-cols-2">
								<label className="block text-sm font-semibold text-slate-700">
									Address
									<input
										type="text"
										name="address"
										value={formValues.address}
										onChange={handleInputChange}
										placeholder="Store address"
										required
										className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
									/>
								</label>

								<label className="block text-sm font-semibold text-slate-700">
									Category
									<input
										type="text"
										name="category"
										value={formValues.category}
										onChange={handleInputChange}
										placeholder="Ex: Grocery, Fashion"
										required
										className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
									/>
								</label>
							</div>

							<div className="grid gap-4 sm:grid-cols-[1fr_200px] sm:items-center">
								<label className="block text-sm font-semibold text-slate-700">
									Store image
									<input
										type="file"
										accept="image/*"
										onChange={handleImageChange}
										required={!isEditing}
										className="cursor-pointer mt-2 w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500"
									/>
								</label>
								<div className="flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-200 bg-slate-50">
									{imagePreview || existingImageUrl ? (
										<img
											src={imagePreview || existingImageUrl}
											alt="Store preview"
											className="h-full w-full object-cover"
										/>
									) : (
										<span className="text-xs text-slate-400">
											Upload image
										</span>
									)}
								</div>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="mt-2 w-full rounded-xl bg-linear-to-br from-[#0141cb] to-[#00a9fd] cursor-pointer py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
							>
								{isSubmitting
									? isEditing
										? "Updating store..."
										: "Creating store..."
									: isEditing
										? "Save changes"
										: "Create store"}
							</button>

							{formError && (
								<p className="text-sm text-red-600">{formError}</p>
							)}
							{formSuccess && (
								<p className="text-sm text-emerald-600">{formSuccess}</p>
							)}
						</form>
					</section>

					<section className="rounded-xl border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur">
						<div className="space-y-2">
							<h2 className="text-xl font-semibold text-slate-900">Your stores</h2>
							<p className="text-sm text-slate-500">
								{stores.length} store{stores.length === 1 ? "" : "s"} created.
							</p>
						</div>

						<div className="mt-6 space-y-4">
							{isLoading && (
								<div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
									Loading stores...
								</div>
							)}

							{!isLoading && listError && (
								<div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-700">
									{listError}
								</div>
							)}

							{!isLoading && !listError && stores.length === 0 && (
								<div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
									No stores yet. Create your first store using the form.
								</div>
							)}

							{!isLoading && !listError && stores.map((store) => {
								const { reviewCount, averageRating } = getRatingSummary(store);

								return (
									<article
										key={store.id}
										className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
											editingStoreId === store.id
												? "border-blue-400 ring-2 ring-blue-100"
												: "border-slate-200"
										}`}
									>
										<div className="grid gap-4 p-4 sm:grid-cols-[120px_1fr]">
											<div className="h-28 w-full overflow-hidden rounded-xl bg-slate-100">
												{store.imageUrl ? (
													<img
														src={store.imageUrl}
														alt={store.name}
														className="h-full w-full object-cover"
												/>
												) : (
													<div className="flex h-full items-center justify-center text-xs text-slate-400">
														No image
													</div>
												)}
											</div>
											<div className="space-y-2">
												<div className="flex flex-wrap items-center justify-between gap-2">
													<h3 className="text-base font-semibold text-slate-900">{store.name}</h3>
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
												<p className="text-xs text-slate-500">{store.address}</p>
												{store.createdAt && (
													<p className="text-xs text-slate-400">
														Created on {formatDate(store.createdAt)}
													</p>
												)}
												<div className="flex flex-wrap gap-2 pt-2">
													<button
														type="button"
														onClick={() => handleEdit(store)}
														className="cursor-pointer rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300"
													>
														Edit
													</button>
													<button
														type="button"
														onClick={() => handleDelete(store.id)}
														className="cursor-pointer rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:border-red-300"
													>
														Delete
													</button>
												</div>
											</div>
										</div>
									</article>
								);
							})}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};

export default StoreOwner;
