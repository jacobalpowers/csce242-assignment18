const express = require("express");
const app = express();
const joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({dest: __dirname + "/public/crafts" });

let crafts = [
    {
        "id": 0,
        "name": "Beaded JellyFish",
        "image": "bead-jellyfish.jpg",
        "description": "Create a hanging jellyfish using eggcartons and multicolored beads",
        "supplies": [
            "string",
            "egg cartons",
            "beads"
        ]
    },
    {
        "id": 1,
        "name": "Character Bookmarks",
        "image": "bookmarks.jpeg",
        "description": "Create a little birdy bookmark to always remin you were you were",
        "supplies": [
            "yellow construction paper",
            "orange construction paper",
            "black construction paper"
        ]
    },
    {
        "id": 2,
        "name": "Button Flowers",
        "image": "button-flowers.jpeg",
        "description": "Create a fun bouquet of flowers with your favorite buttons",
        "supplies": [
            "multicolored buttons",
            "multicolored flet",
            "green straws",
            "ribbon"
        ]
    },
    {
        "id": 3,
        "name": "Cheerio Necklaces",
        "image": "cheerio-necklace.webp",
        "description": "Create a fun and edible necklace",
        "supplies": [
            "Cheerios or Fruit Loops",
            "Elastic string"
        ]
    },
    {
        "id": 4,
        "name": "Cotton Ball Cupcakes",
        "image": "cotton-ball-cupcakes.webp",
        "description": "Decorate your fun filled cupcake however you want.",
        "supplies": [
            "Construction Paper",
            "Cotton Balls",
            "Black Sharpie",
            "Glitter"
        ]
    },
    {
        "id": 5,
        "name": "School Themed Mason Jars",
        "image": "decorated-jars.jpeg",
        "description": "Let's make mason jars to ",
        "supplies": [
            "Construction Paper",
            "Cotton Balls",
            "Black Sharpie",
            "Glitter"
        ]
    },
    {
        "id": 6,
        "name": "Egg Carton Flowers",
        "image": "egg-carton-flowers.jpg",
        "description": "Make a beautiful bouquet with egg cartons and other items you can find around the house",
        "supplies": [
            "Egg Cartons",
            "Butons",
            "Green Pipe Cleaner",
            "Ribbon",
            "Canvas"
        ]
    },
    {
        "id": 7,
        "name": "Finger Puppets",
        "image": "finger-puppets.jpeg",
        "description": "These little critters are easy to make, and will entertain your little one while they make a show.",
        "supplies": [
            "Pom-poms",
            "Googly Eyes",
            "Pipe Cleaner"
        ]
    },
    {
        "id": 8,
        "name": "Ribbon Flower Headbands",
        "image": "flower-headbands.jpg",
        "description": "Let your little one show off her new style with these pretty and customizable headbands",
        "supplies": [
            "Plain headband",
            "Ribbon",
            "Buttons",
            "Gems"
        ]
    },
    {
        "id": 9,
        "name": "Hand Print Fish Puppets",
        "image": "handprint-fish.jpg",
        "description": "We all need to take every opportunity we can to remember those tiny hands, and what better way to do it, then to make fish puppets!",
        "supplies": [
            "Popsicle sticks",
            "Cardstock",
            "Gems",
            "Googly Eyes"
        ]
    },
    {
        "id": 10,
        "name": "Hand Print Tree",
        "image": "hand-print-tree.jpeg",
        "description": "This is a fun way to get your little one into finger painting.",
        "supplies": [
            "Watercolor Paper",
            "Finger paint"
        ]
    },
    {
        "id": 11,
        "name": "Melted Bead Bowl",
        "image": "melted-bead-bowl.jpeg",
        "description": "All they need to do is shape their faviorte design, warm it up and they have a brand new bowl.",
        "supplies": [
            "Beads",
            "Bowl",
            "Parchment paper"
        ]
    },
    {
        "id": 12,
        "name": "Monster Kites",
        "image": "monster-rolls.jpg",
        "description": "Let's make those scary toilet paper rolls fly!",
        "supplies": [
            "Toilet paper rolls",
            "Paint",
            "Tissue Paper",
            "String"
        ]
    },
    {
        "id": 13,
        "name": "Pool Noodle Boats",
        "image": "noodle-boats.png",
        "description": "Let's make a boat that will actually float, due to the floating bottom of a pool noodle.",
        "supplies": [
            "Pool Noodle",
            "Straw",
            "Plastic Paper"
        ]
    },
    {
        "id": 14,
        "name": "Paper Plate Bees",
        "image": "paper-plate-bees.jpeg",
        "description": "Let's have fun with making cute little bees, or big bees actually.",
        "supplies": [
            "Paper Plate",
            "Googly Eyes",
            "Close Pins",
            "Black pom poms",
            "Yellow Paint",
            "Black Paint"
        ]
    },
    {
        "id": 15,
        "name": "Paper Plate Dinosaurs",
        "image": "paper-plate-dinosaurs.jpg",
        "description": "Who would have thought that half a paper plate would be the base of a dinosaur.",
        "supplies": [
            "Paper Plate",
            "Paint",
            "Close Pins",
            "Construction Paper"
        ]
    },
    {
        "id": 16,
        "name": "Porcupine Leafs",
        "image": "porcupine-leaf.webp",
        "description": "Let's turn an ordinary paper plate into a fun filled mask.",
        "supplies": [
            "Leafs",
            "Berries",
            "Acorns",
            "Construction Paper"
        ]
    },
    {
        "id": 17,
        "name": "Rainbow Cloud",
        "image": "rainbow-cloud.webp",
        "description": "Some cotton and color and you'll have a beautiful rainbow.",
        "supplies": [
            "Paper Plate",
            "Cotton Balls",
            "Construction Paper"
        ]
    },
    {
        "id": 18,
        "name": "Fun Shaped Crayons",
        "image": "shaped-crayons.jpg",
        "description": "Let's melt some crayons together and let them harden into fun shapes.",
        "supplies": [
            "Broken Crayons",
            "Mold"
        ]
    },
    {
        "id": 19,
        "name": "Straw Farris Wheel",
        "image": "straw-faris-wheel.jpg",
        "description": "It might be too small to ride, but this farris wheel is the most colorful of all.",
        "supplies": [
            "Multicolored straws",
            "Platform"
        ]
    },
    {
        "id": 20,
        "name": "Sunny String",
        "image": "sun-string.jpg",
        "description": "Let's practice our fine motor skills while we weave the string into a fun sun.",
        "supplies": [
            "Yellow String",
            "Paper Plate",
            "Yellow construction paper",
            "Yellow and Orange beads"
        ]
    },
    {
        "id": 21,
        "name": "Tissue Ballerinas",
        "image": "tisue-dancer.jpeg",
        "description": "These beautiful dancers will look great on display",
        "supplies": [
            "Pipe cleaner",
            "Tissue Paper",
            "Elastics"
        ]
    },
    {
        "id": 22,
        "name": "Toilet Paper Roll Animals",
        "image": "toilet-paper-animals.jpeg",
        "description": "These beautiful dancers will look great on display",
        "supplies": [
            "Toilet Paper Rolls",
            "Construction Paper",
            "Googly Eyes"
        ]
    },
    {
        "id": 23,
        "name": "Toilet Paper Butterfly",
        "image": "toilet-paper-butterfly.jpg",
        "description": "Such a sweat little flyer",
        "supplies": [
            "Toilet Paper Rolls",
            "Construction Paper",
            "Googly Eyes",
            "Buttons"
        ]
    },
    {
        "id": 24,
        "name": "Valentines Jar",
        "image": "valentines-jar.webp",
        "description": "So much hearts all in one",
        "supplies": [
            "Clay",
            "Glitter"
        ]
    }
];


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/crafts", (req, res) => {
    res.json(crafts);
});

app.post("/api/crafts", upload.single("image"), (req, res) => {
    console.log(req.body);
    const result = validateCraft(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const craft = {
        "name": req.body.name,
        "description": req.body.description,
        "supplies": req.body.supplies.split(","),
        "id": req.body.id
    };

    if (req.file) {
        craft.image = req.file.filename;
    }

    crafts.push(craft);
    res.send(craft);
});

app.put("/api/crafts/:id", upload.single("image"), (req, res) => {
    const id = parseInt(req.params.id);

    const craft = crafts.find((c) => c.id === id);

    const result = validateCraft(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    craft.name = req.body.name;
    craft.description = req.body.description;
    craft.supplies = req.body.supplies.split(",");

    if (req.file) {
        craft.image = req.file.filename;
    }

    res.send(craft);
});

app.delete("/api/crafts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const craft = crafts.find((c) => c.id === id);

    if (!craft) {
        res.status(404).send("The craft with the given id was not found");
    }

    const index = crafts.indexOf(craft);
    crafts.splice(index, 1);
    res.send(craft);
});

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