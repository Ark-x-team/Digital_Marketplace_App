const Subcategory = require("../models/Subcategory"); 

// ****************************** Create subcategory **********************************
const createSubcategory = async (req, res) => {
    try {
        // Get subcategory data
        const { subcategory_name, category_id } = req.body; 

        // Check subcategory existence 
        const subcategoryExist = await Subcategory.findOne({ subcategory_name });
        if (subcategoryExist) {
            return res.status(400).json({
                status: 400,
                message: "Subcategory already exists"
            })
        } else {
            // Post subcategory data
            const subcategory = await Subcategory.create({ subcategory_name, category_id })
            res.status(200).json({ status: 200, message: "Subcategory created successfully" })
        }
    } catch (error) {
        res.status(400).json({status: 400, message: "Failed to create subcategory"})
    }   
}

// ***************************** List all subcategory *********************************
const getSubcategories = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page - 1) * limit
        
        // Get all subcategories with limit number per page and sort them by name.
        const subcategories = await Subcategory.aggregate([
            {
              $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $unwind: "$category",
            },
            {
              $project: {
                _id: 1,
                subcategory_name: 1,
                category_name: "$category.category_name",
                active: 1,
              },
            },
          ])
            .limit(limit).skip(skip).sort({ 'subcategory_name': -1 });
        const count = subcategories.length

        // Check the existence of subcategories for each page
        if (count < 1) {
            res.status(404).json({ status: 404, data: [] })
        } else res.status(200).json({status: 200, count, page, limit, data: subcategories})
    } catch (error) {
        res.status(400).json({status: 400, message: "Failed to get subcategories"})
    }
};

// ****************************** Get one subcategory *********************************
const getSubcategory = async (req, res) => {
    try {
        // Get subcategory id from request params
        const subcategoryId = req.params.id; 
        
        // Find subcategory by it's id
        const subcategory = await Subcategory.findById(subcategoryId);
        if (!subcategory) {
            res.status(404).json({ status: 404, message: "Subcategory not found" });
        } else {
            // Use aggregation to join SubCategory with Category to fetch category name
            const subcategoryWithCategory = await Subcategory.aggregate([
                {
                    $match: { _id: subcategory._id },
                },
                {
                    $lookup: {
                        from: "categories", // Name of the Category collection or table
                        localField: "category_id",
                        foreignField: "_id",
                        as: "category",
                    },
                },
                {
                    $unwind: "$category",
                },
                {
                    $project: {
                        _id: 1,
                        subcategory_name: 1,
                        category_id:"$category._id",
                        category_name: "$category.category_name",
                        active: 1,
                    },
                },
            ]);
            if (!subcategoryWithCategory || subcategoryWithCategory.length === 0) {
                res.status(500).json({ status: 500, error: "Failed to retrieve category name" });
            } else {
                res.status(200).json({ status: 200, data: subcategoryWithCategory });
            } 
        }
    } catch (error) {
        res.status(404).json({status: 404, message: "Failed to get subcategory"})
    }
};

// *************************** Search for subcategories *******************************
const searchSubcategories = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page - 1) * limit
        
        // Get search query and add regex
        const searchQuery = req.query.search_query; 
        const searchQueryRegex = new RegExp(searchQuery, 'i')

        // Get matching subcategories by name with limit number per page and sort them by name.
        const matchingSubcategories = await Subcategory.aggregate([
            {
                $lookup: {
                  from: "categories", 
                  localField: "category_id",
                  foreignField: "_id",
                  as: "category",
                },
              },
              {
                $unwind: "$category",
              },
              {
                $match: {
                  $or: [
                    { subcategory_name: searchQueryRegex },
                    {
                      "category.category_name": searchQueryRegex,
                    },
                  ],
                },
              },
              {
                $project: {
                  _id: 1,
                  subcategory_name: 1,
                  category_id: "$category._id",
                  category_name: "$category.category_name",
                  active: 1,
                },
              },
        ])
            .limit(limit).skip(skip).sort({ 'subcategory_name': -1 });
        const count = matchingSubcategories.length

        // Check subcategories existence by it's Id
        if (count < 1) {
            return res.status(404).json({status: 404, data: []})
        } else res.status(200).json({ status: 200, count, page, limit, data: matchingSubcategories })
    } catch (error) {
        console.log(error);
        res.status(400).json({status: 400, message: "Failed to get subcategory"})
    }
};

// ****************************** Update subcategory **********************************
const updateSubcategory = async (req, res) => {
    try {
        // Get subcategory id from request params
        const subcategoryId = req.params.id; 

        // Check subcategory existence by it's id
        const subcategoryExist = await Subcategory.findOne({ _id: subcategoryId });
        if (!subcategoryExist) {
            return res.status(404).json({
                status: 404,
                message: "Subcategory not found"
            })
        } else {
            // Get subcategory data
            const {subcategory_name, category_id} = req.body ;

            // Check if the new name is already exists
            const dataExist = await Subcategory.findOne(
                {
                    $and: [
                        { subcategory_name },
                        { _id: { $ne: subcategoryId } }
                    ]
                });
            if (dataExist) {
                return res.status(400).json({
                    status: 400,
                    message: "Subcategory name is already exists"
                })
            } else {

                // Find subcategory by it's Id and update it
                await Subcategory.findByIdAndUpdate(subcategoryId, {subcategory_name, category_id})
                res.status(200).json({ status: 200, message: "Subcategory updated successfully" })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Failed to update subcategory" })
    }   
}

// ******************************* Delete subcategory ************************************
const deleteSubcategory = async (req, res) => {
    try {
        // Get subcategory Id from request params
        const subcategoryId = req.params.id;

        // Check existence of subcategory
        const subcategory = await Subcategory.findById(subcategoryId);

        if (!subcategory) {
            res.status(404).json({ status: 404, message: "Subcategory not found" });
        } else {
            // Find subcategory by it's Id and delete it
            await Subcategory.findByIdAndDelete(subcategoryId);
            res.status(200).json({ status: 200, message: "Subcategory deleted successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Failed to delete subcategory" })
    }
};


module.exports = {
    createSubcategory, getSubcategories, getSubcategory,
    searchSubcategories, updateSubcategory,deleteSubcategory
};
