// ==> Setup using Promises
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler())
        .catch((err) => next(err))
    }
};


// ==> Setup using try & catch block

// const asyncHandler = () => {};
// const asyncHandler = (fn) => () => {};
// const asyncHandler = (fn) => async () => {};
// const asyncHandler = (fn) => {() => {}};

// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(err.code || 5000).json({
//             success: false,
//             message: err.message,
//         })
//     }
// };