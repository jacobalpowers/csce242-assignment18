const express = require("express");
const app = express();
const joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/public/crafts", express.static("crafts"));
app.use(express.json());
const cors = require("cors");
const { default: mongoose } = require("mongoose");
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/crafts/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

mongoose
    .connect("mongodb+srv://japowers:RUD1IMizJvcIr6Q4@data.wtiy9yq.mongodb.net/?retryWrites=true&w=majority&appName=Data")
    .then(() => console.log("Connected to mongodb..."))
    .catch((err) => console.error("Could not connect to mongodb...", err));

const craftSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    description: String,
    supplies: [String],
});



const Craft = mongoose.model("Craft", craftSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/crafts", (req, res) => {
    getCrafts(res);
});

const getCrafts = async (res) => {
    const crafts = await Craft.find();
    res.send(crafts);
}

const getCraft = async (res, id) => {
    const craft = await Craft.findOne({ id: id});
    res.send(craft);
}

app.post("/api/crafts", upload.single("image"), (req, res) => {
    const result = validateCraft(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const craft = new Craft({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        supplies: req.body.supplies.split(","),
    })

    if (req.file) {
        craft.image = "crafts/" + req.file.filename;
    }

    createCraft(res, craft);
});

const createCraft = async (res, craft) => {
    const result = await craft.save();
    res.send(craft);
}

app.put("/api/crafts/:id", upload.single("image"), (req, res) => {
    
    const result = validateCraft(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    updateCraft(req, res);
});

const updateCraft = async (req, res) => {
    let fieldsToUpdate = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        supplies: req.body.supplies.split(","),
    }

    if (req.file) {
        fieldsToUpdate.image = "crafts/" + req.file.filename;
    }

    const result = await Craft.updateOne({id:req.params.id}, fieldsToUpdate);
    res.send(result);
}

app.delete("/api/crafts/:_id", (req, res) => {
    deleteCraft(res, req.params._id);
});

const deleteCraft = async (res, id) => {
    const delCraft = await Craft.findByIdAndDelete(id);
    res.send(delCraft);
}

const validateCraft = (craft) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        image: joi.string().default("blank.gif"),
        description: joi.string().min(3).required(),
        supplies: joi.allow(),
        id: joi.allow()
    });

    return schema.validate(craft);
}

app.listen(3000, () => {
    console.log("I'm Listening");
});