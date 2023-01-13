const Product = require('./productModel');

// get na wszystkie produkty
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// get na produkty z filtrem, sortowaniem i paginacją
const getProducts = async (req, res) => {
    try {
        const { sortBy = "nazwa", order = "asc", limit = 10 } = req.params;
        const products = await Product.find()
          .sort({ [sortBy]: order })
          .limit(+limit);
        res.json(products);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

// post na dodanie produktu
const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// put na edycję produktu
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// delete 
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// raport 
const getReport = async (req, res) => {
    try{
    const report = await Product.aggregate([
        {
          $group: {
            _id: "$kategoria",
            lacznaIlosc: { $sum: "$ilosc" },
            laczna_wartosc: { $sum: { $multiply: ["$cena", "$ilosc"] } },
          },
        },
      ])
    console.log(report)
    res.status(200).json(report);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
  }
        

module.exports = {
    getAllProducts,
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
    getReport
}




