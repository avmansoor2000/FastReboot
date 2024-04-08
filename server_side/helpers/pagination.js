const paginate = async (Model, page = 1, limit = 10, sort = '-createdAt', conditions = {}) => {
    try {
        const skip = (page - 1) * limit;
        const results = await Model.find(conditions)
            .skip(skip)
            .limit(limit)
            .sort(sort);
        const totalCount = await Model.countDocuments(conditions);
        return { success: true, data: results, totalCount };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { success: false, error: "Internal Server Error" };
    }
};

module.exports = paginate;