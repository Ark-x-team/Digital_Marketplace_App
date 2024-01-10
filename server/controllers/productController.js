const Product = require("../models/Product"); 
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

// ******************************* Create product ************************************
const createProduct = async (req, res) => {
    try {
        // Get product data
        const { sku, product_name, price, discount_price, short_description, long_description,
             active, subcategory_id, hide, product_type } = req.body; 
        
        // Get images files
        const files = req.files; 

        // Check product existence using name and serialization
        const productExist = await Product.findOne({$or: [{sku}, {product_name}]});
        if (productExist) {
            return res.status(400).json({
                status: 400,
                message: "Product already exists, check the name and the serialization"
            })
        } else {
            // Check files existence and attach filenames to product_files
            let product_files = "default-product-image"
            if (files.length > 0) {

                // Store images in uploads folder
                files.forEach((file) => {
                    const filePath = `public/uploads/${file.filename}`;
                    fs.rename(file.path, filePath, (error) => {
                        if (error) return res.status(500).json({
                            status: 500,
                            message: 'Failed to store the images files'
                        })
                    })
                });
                product_files = files.map(file => file.filename)
            } 

            // Post product data
            await Product.create({
                sku, product_name, product_files, price, discount_price,
                short_description, long_description,  active, subcategory_id, hide, product_type
            })
            res.status(200).json({ status: 200, message: "product created successfully" })
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to create product" })
        console.log(error)
    }   
}

// ************************** List products by category ******************************
const getProductsByCategory = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 12;
        const skip = (page - 1) * limit;
        const categoryName = req.query.category_name.replace(/-/g, " ");
        const active = req.query.active;

        // Define the match object for aggregation pipeline based on the active query
        const match = active === 'true' ? { active: true } : active === 'false' ? { active: false } : {};

        const pipeline = [
            {
                $lookup: {
                    from: "subcategories",
                    localField: "subcategory_id",
                    foreignField: "_id",
                    as: "subcategory",
                },
            },
            {
                $unwind: "$subcategory",
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "subcategory.category_id",
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
                    product_name: 1,
                    product_type: 1,
                    price: 1,
                    active: 1,
                    category_name: "$category.category_name",
                    subcategory_name: "$subcategory.subcategory_name",
                    product_files: "$product_files",
                    created_at: { $toDate: "$created_at" }
                },
            },
            {
                $match: match,
            },
            {
                $match: categoryName ? { category_name: categoryName } : {},
            },
            {
                $facet: {
                    // Pagination pipeline
                    products: [
                        { $sort: { 'created_at': -1 } },
                        { $skip: skip },
                        { $limit: limit },
                    ],
                    // Count pipeline
                    count: [
                        { $count: "value" },
                    ],
                },
            },
        ];

        const result = await Product.aggregate(pipeline);
        const products = result[0].products;
        const count = result[0].count.length > 0 ? result[0].count[0].value : 0;

        if (count < 1 || skip >= count) {
            res.status(404).json({ status: 404, data: [] });
        } else {
            res.status(200).json({ status: 200, count, page, limit, products });
        }

    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to get products" });
        console.log(error);
    }
};

// ************************* List products by subcategory ****************************
const getProductsBySubcategory = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 12;
        const skip = (page - 1) * limit;
        const subcategoryName = req.query.subcategory_name.replace("-", " ");
        const active = req.query.active;

        // Define the match object for aggregation pipeline based on the active query
        const match = active === 'true' ? { active: true } : active === 'false' ? { active: false } : {};

        const pipeline = [
            {
                $lookup: {
                    from: "subcategories",
                    localField: "subcategory_id",
                    foreignField: "_id",
                    as: "subcategory",
                },
            },
            {
                $unwind: "$subcategory",
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "subcategory.category_id",
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
                    product_name: 1,
                    product_type: 1,
                    price: 1,
                    active: 1,
                    category_name: "$category.category_name",
                    subcategory_name: "$subcategory.subcategory_name",
                    product_files: "$product_files",
                    created_at: { $toDate: "$created_at" }
                },
            },
            {
                $match: match,
            },
            {
                $match: subcategoryName ? { subcategory_name: subcategoryName } : {},
            },
            {
                $sort: { 'created_at': -1 },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        ];

        const products = await Product.aggregate(pipeline);
        const count = await Product.countDocuments(match);

        if (count < 1 || skip >= count) {
            res.status(404).json({ status: 404, data: [] });
        } else {
            res.status(200).json({ status: 200, count, page, limit, products });
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to get products" });
        console.log(error);
    }
};

// ************************* List products by filter ****************************
const getProductsByFilter = async (req, res) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 12;
        const skip = (page - 1) * limit;
        const filter = req.query.filter;
        const active = req.query.active;

        const match = active === 'true' ? { active: true } : active === 'false' ? { active: false } : {};

        const sort = filter === 'low' ? { price: 1 } : filter === 'high' ? { price: -1 } : { created_at: -1 };

        const pipeline = [
            {
                $lookup: {
                    from: "subcategories",
                    localField: "subcategory_id",
                    foreignField: "_id",
                    as: "subcategory",
                },
            },
            {
                $unwind: "$subcategory",
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "subcategory.category_id",
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
                    product_name: 1,
                    product_type: 1,
                    price: 1,
                    active: 1,
                    category_name: "$category.category_name",
                    subcategory_name: "$subcategory.subcategory_name",
                    product_files: "$product_files",
                    created_at: { $toDate: "$created_at" },
                },
            },
            {
                $match: {
                    $and: [
                        match,
                        filter === 'low' ? { price: { $exists: true } } : filter === 'high' ? { price: { $exists: true, $ne: null } } : { category_name: filter },
                    ],
                },
            },
            {
                $facet: {
                    products: [
                        { $sort: sort },
                        { $skip: skip },
                        { $limit: limit },
                    ],
                    count: [
                        { $count: "value" },
                    ],
                },
            },
        ];

        const result = await Product.aggregate(pipeline);
        const products = result[0].products;
        const count = result[0].count.length > 0 ? result[0].count[0].value : 0;

        if (count < 1 || skip >= count) {
            res.status(404).json({ status: 404, data: [] });
        } else {
            res.status(200).json({ status: 200, count, page, limit, products });
        }

    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to get products" });
        console.log(error);
    }
};

// ******************************* Get one product ***********************************
const getProduct = async (req, res) => {
    try {
        // Get product id from request params
        const productId = req.params.id;

        // Get product by its ID
        const product = await Product.findById(productId);
        
        if (!product) {
            res.status(404).json({ status: 404, message: "Product not found" });
        } else {
            const subcategory = await Product.findById(product.subcategory_id);
            res.status(200).json({ status: 200, product });

        }
    } catch (error) {
        res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
};

// **************************** Search for a product *********************************
const searchProduct = async (req, res) => {
    try {
        // Get pagination items query or set default values
        const page = req.query.page *1 || 1
        const limit = req.query.limit *1 || 10
        const skip = (page - 1) * limit
        
        // Get search query and add regex
        const searchQuery = req.query.search_query; 
        const searchQueryRegex = new RegExp(searchQuery, 'i')

        // Get matching products by name or descriptions with limit number per page and sort them by name.
        const matchingProduct = await Product.aggregate([
            {
                $lookup: {
                  from: "subcategories", 
                  localField: "subcategory_id",
                  foreignField: "_id",
                  as: "subcategory",
                },
            },
            {
                $unwind: "$subcategory",
            },
            {
                $match: {
                    $or: [
                        { product_name: searchQueryRegex }, 
                        { short_description: searchQueryRegex },
                        { long_description: searchQueryRegex }
                    ],
                },
              },
              {
                $project: {
                    _id: 1,
                    product_name: 1,
                    product_type: 1,
                    price: 1,
                    active: 1,
                    category_name: "$category.category_name",
                    subcategory_name: "$subcategory.subcategory_name",
                    product_files: "$product_files",
                    created_at: { $toDate: "$created_at" }
                },
              },
            ]).limit(limit).skip(skip).sort({ 'product_name': -1 });
        const count = matchingProduct.length

        // Check product existence by it's Id
        if (count < 1) {
            return res.status(404).json({status: 404, message: "Product not found"})
        } else res.status(200).json({ status: 200, count, page, limit, products: matchingProduct })
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 400, message: "Failed to get product"})
    }
};

// ******************************* Update product ************************************
const updateProduct = async (req, res) => {
    try {
        // Get product Id from request params
        const productId = req.params.id; 

        // Check product existence by it's Id
        const productExist = await Product.findOne({ _id: productId });
        if (!productExist) {
            return res.status(404).json({
                status: 404,
                message: "Product not found"
            })
        } else {
            // Get product data
            const { sku, product_name, short_description, long_description,
                 active, subcategory_id } = req.body;
            
            // Get images files
            const files = req.files;

            // Check if the new name and serialization are already exists except for the updated one
            const dataExist = await Product.findOne(
                {
                    $and: [
                        { $or: [{ product_name }, { sku }] },
                        { _id: { $ne: productId } }
                    ]
                }
            );
            if (dataExist) {
                return res.status(400).json({
                    status: 400,
                    message: "Product name or serialization already exists"
                })
            } else {
                // Store images in uploads folder
                files.forEach((file) => {
                    const filePath = `public/uploads/${file.filename}`;
                    fs.rename(file.path, filePath, (error) => {
                        if (error) return res.status(500).json({
                             status: 500,
                             message: 'Failed to store the images files'
                        })
                    })
                });
 
                // Check files existence and attach filenames to product_files
                const product_files = files.length > 0 ? files.map(file => file.filename) : productExist.product_files
 
                // Get the product price
                const price = req.body.price || productExist.price
 
                // Get the product discount_price
                const discount_price = req.body.discount_price || productExist.discount_price
             
                // Set current date to update_at
                const updatedAt = Date.now();
             
                // Find product by it's Id and update it
                await Product.findByIdAndUpdate(productId, {
                     sku, product_name, product_files, price, discount_price, short_description,
                     long_description,  active, updated_at: updatedAt, subcategory_id
                })
                res.status(200).json({ status: 200, message: "Product updated successfully" })
            }
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to update product" })
    }   
}

// ******************************* Delete product ************************************
const deleteProduct = async (req, res) => {
    try {
        // Get product Id from request params
        const productId = req.params.id;

        // Check existence of product
        const product = await Product.findById(productId);

        if (!product) {
            res.status(404).json({ status: 404, message: "Product not found" });
        } else {
            // Find product by it's Id and delete it
            await Product.findByIdAndDelete(productId);
            res.status(200).json({ status: 200, message: "Product deleted successfully" });
        }
    } catch (error) {
        res.status(400).json({ status: 400, message: "Failed to delete product" })
    }
};

// ****************************** Download product ***********************************
const downloadProducts = async (req, res) => {
    try {
      const { filenames } = req.body;
  
      if (!filenames || !filenames.length) {
        return res.status(400).json({ status: 400, message: 'Please provide valid filenames' });
      }
  
      const zipFileName = 'markstone-files.zip';
      const zipFilePath = path.join(__dirname, '..', 'public', 'uploads', zipFileName);
  
      const archive = archiver('zip', {
        zlib: { level: 9 }, // compression level (0 to 9)
      });
  
      // Set appropriate headers for download
      res.setHeader('Content-Disposition', `attachment; filename=${zipFileName}`);
      res.setHeader('Content-Type', 'application/zip');
  
      // Create a writable stream to the response
      const output = res;
      archive.pipe(output);
  
      // Add each file to the zip archive
      for (const filename of filenames) {
        const filePath = path.join(__dirname, '..', 'public', 'uploads', filename);
  
        // Check if the file exists
        if (fs.existsSync(filePath)) {
          // Add the file to the zip archive with the same name
          archive.file(filePath, { name: filename });
        }
      }
  
      // Finalize the archive and send it to the response
      archive.finalize();
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  };

module.exports = {createProduct, getProductsByCategory, getProductsBySubcategory, getProductsByFilter, searchProduct, getProduct, downloadProducts, updateProduct, deleteProduct};