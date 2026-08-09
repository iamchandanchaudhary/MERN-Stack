import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import StarRating from "../components/StarRating";
import { AuthContext } from "../context/AuthContext";

const StoreList = () => {
    const { backendUrl } = useContext(AuthContext);
    const baseUrl = useMemo(() => (
        backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl
    ), [backendUrl]);

    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [listError, setListError] = useState("");
    const [actionError, setActionError] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formValues, setFormValues] = useState({
        ownerId: "",
        name: "",
        description: "",
        address: "",
        category: ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    useEffect(() => () => {
        if (imagePreview && imagePreview.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }
    }, [imagePreview]);

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

    const filteredStores = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return stores;
        }

        return stores.filter((store) => {
            const fields = [
                store?.name,
                store?.description,
                store?.address,
                store?.category,
                store?.ownerId ? String(store.ownerId) : "",
                store?.id ? String(store.id) : ""
            ]
                .filter(Boolean)
                .map((value) => String(value).toLowerCase());

            return fields.some((value) => value.includes(query));
        });
    }, [stores, searchQuery]);

    const storeCountLabel = searchQuery.trim()
        ? `${filteredStores.length} of ${stores.length} stores`
        : `${stores.length} store${stores.length === 1 ? "" : "s"} created`;

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

        if (imagePreview && imagePreview.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }

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

    const resetForm = () => {
        if (imagePreview && imagePreview.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }

        setFormValues({
            ownerId: "",
            name: "",
            description: "",
            address: "",
            category: ""
        });
        setImageFile(null);
        setImagePreview("");
    };

    const handleCreateStore = async (event) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        const ownerId = formValues.ownerId.trim();
        const payload = {
            ownerId,
            name: formValues.name.trim(),
            description: formValues.description.trim(),
            address: formValues.address.trim(),
            category: formValues.category.trim()
        };

        setFormError("");
        setFormSuccess("");

        if (!payload.ownerId) {
            setFormError("Store owner id is required.");
            return;
        }

        if (!Number.isFinite(Number.parseInt(payload.ownerId, 10))) {
            setFormError("Store owner id must be a number.");
            return;
        }

        if (!payload.name || !payload.description || !payload.address || !payload.category) {
            setFormError("All store fields are required.");
            return;
        }

        if (!imageFile) {
            setFormError("Store image is required.");
            return;
        }

        const formData = new FormData();
        formData.append("ownerId", payload.ownerId);
        formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("address", payload.address);
        formData.append("category", payload.category);
        formData.append("image", imageFile);

        setIsSubmitting(true);

        try {
            const response = await fetch(`${baseUrl}/api/stores`, {
                method: "POST",
                body: formData
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Unable to create store.");
            }

            if (data.store) {
                setStores((prev) => [data.store, ...prev]);
            }

            setFormSuccess("Store created successfully.");
            resetForm();
        } catch (error) {
            setFormError(error.message || "Unable to create store.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (storeId) => {
        if (!storeId || deletingId) {
            return;
        }

        const confirmed = window.confirm("Delete this store? This action cannot be undone.");
        if (!confirmed) {
            return;
        }

        setActionError("");
        setDeletingId(storeId);

        try {
            const response = await fetch(`${baseUrl}/api/admin/stores/${storeId}`, {
                method: "DELETE"
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Unable to delete store.");
            }

            setStores((prev) => prev.filter((store) => store.id !== storeId));
        } catch (error) {
            setActionError(error.message || "Unable to delete store.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe,_transparent_65%)]" />
            <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/4 rounded-full bg-sky-200/60 blur-3xl" />

            <AdminNavbar />

            <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10">
                <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">
                            Store list
                        </p>
                        <h1 className="text-3xl font-semibold text-slate-900">All created stores</h1>
                        <p className="text-sm text-slate-600">
                            Review every store with ratings, categories, and details.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <label className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Search stores"
                                className="w-56 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowCreateForm((prev) => !prev)}
                            className="cursor-pointer rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600 shadow-sm transition hover:border-blue-300"
                        >
                            {showCreateForm ? "Cancle" : "Create new store"}
                        </button>
                        <span className="rounded-full text-xs text-slate-700 border border-slate-200/70 bg-white/80 px-4 py-2 shadow-sm">
                            <span className="font-semibold">{storeCountLabel}</span>
                        </span>
                        <Link
                            to="/admin"
                            className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                        >
                            Back to admin
                        </Link>
                    </div>
                </header>

                {showCreateForm && (
                    <section className="mt-8 rounded-xl border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Create new store</h2>
                                <p className="text-sm text-slate-500">Add a store under an existing owner.</p>
                            </div>
                        </div>

                        <form onSubmit={handleCreateStore} className="mt-6 space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Store owner ID
                                    <input
                                        type="number"
                                        name="ownerId"
                                        value={formValues.ownerId}
                                        onChange={handleInputChange}
                                        placeholder="Enter store owner ID"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                        required
                                    />
                                </label>

                                <label className="block text-sm font-semibold text-slate-700">
                                    Store name
                                    <input
                                        type="text"
                                        name="name"
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter store name"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                        required
                                    />
                                </label>
                            </div>

                            <label className="block text-sm font-semibold text-slate-700">
                                Description
                                <textarea
                                    name="description"
                                    value={formValues.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe the store"
                                    rows={4}
                                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                    required
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
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                        required
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
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                        required
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
                                        className="mt-2 w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500"
                                        required
                                    />
                                </label>
                                <div className="flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-200 bg-slate-50">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Store preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-xs text-slate-400">Upload image</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="rounded-xl bg-linear-to-br from-[#0141cb] to-[#00a9fd] cursor-pointer px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting ? "Creating store..." : "Create store"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="cursor-pointer rounded-xl border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                                >
                                    Clear
                                </button>
                            </div>
                        </form>

                        {formError && (
                            <p className="mt-4 text-sm text-red-600">{formError}</p>
                        )}
                        {formSuccess && (
                            <p className="mt-4 text-sm text-emerald-600">{formSuccess}</p>
                        )}
                    </section>
                )}

                <section className="mt-8">
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

                    {!isLoading && !listError && actionError && (
                        <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-700">
                            {actionError}
                        </div>
                    )}

                    {!isLoading && !listError && stores.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                            No stores available yet.
                        </div>
                    )}

                    {!isLoading && !listError && stores.length > 0 && filteredStores.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                            No stores match your search.
                        </div>
                    )}

                    {!isLoading && !listError && filteredStores.length > 0 && (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {filteredStores.map((store) => {
                                const { reviewCount, averageRating } = getRatingSummary(store);

                                return (
                                    <article
                                        key={store.id}
                                        className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 shadow-xl backdrop-blur transition"
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
                                                        {averageRating.toFixed(1)} / 5 - {reviewCount} review{reviewCount === 1 ? "" : "s"}
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
                                                <p>Owner ID: {store.ownerId || "Not available"}</p>
                                                {store.createdAt && (
                                                    <p>Created on {formatDate(store.createdAt)}</p>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(store.id)}
                                                disabled={deletingId === store.id}
                                                className="cursor-pointer mt-3 inline-flex items-center justify-center rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:border-red-300 disabled:cursor-not-allowed disabled:opacity-70"
                                            >
                                                {deletingId === store.id ? "Deleting..." : "Delete store"}
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default StoreList;
