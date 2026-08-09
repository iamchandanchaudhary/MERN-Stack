import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: "User",
    },

    videoFile: {
        type: String, // cloudinary url used
        required: [true, "video is required."],
    },

    thumbmail: {
        type: String, // cloudinary url used
        required: [true, "thumbmail is required."],
    },

    title: {
        type: String,
        required: [true, "title is required."],
        index: true,
    },

    description: {
        type: String,
    },

    duration: {
        type: Number,
        required: true,
    },

    views: {
        type: Number,
        required: true,
        default: 0,
    },

    isPublished: {
        type: Boolean,
        required: true,
    },

}, {timestamps: true});

// Custom middleware
videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);