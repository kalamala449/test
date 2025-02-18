const responseHandler = (res, data) => {
    if (data instanceof Error) {
        res.status(data.statusCode || 500).json({
            success: false,
            message: data.message || "Internal Server Error",
            error: data,
        });
    } else {
        res.status(200).json({
            success: true,
            data,
        });
    }
};

export default responseHandler;
