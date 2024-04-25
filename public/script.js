let src = "https://csce242-assignment18-iqe2.onrender.com/";
//let src = "localhost:3000/"
let crafts = [];
let mode = "";

class Craft {
    constructor(name, img, description, supplies, id) {
        this.name = name;
        this.img = img;
        this.description = description;
        this.supplies = supplies;
        this.id = id;
    }


    get details() {

        const expandedSection = document.createElement("section");
        expandedSection.id = "more-details";
        const text = document.createElement("div");
        text.id = "text";

        const picture = document.createElement("div");
        picture.id = "picture";

        const site_image = document.createElement("img");
        site_image.src = "crafts/" + this.img;

        const name_and_options = document.createElement("div");
        name_and_options.id = "name-and-options";

        const site_name = document.createElement("h2");
        site_name.innerText = this.name;

        const edit = document.createElement("p");
        edit.id = "edit";
        edit.innerHTML = "&#9998;";
        edit.onclick = () => editCraft(this);

        const del = document.createElement("p");
        del.id = "delete";
        del.innerHTML = "&#10006;";
        del.onclick = () => delCraft(this);

        name_and_options.append(site_name);
        name_and_options.append(edit);
        name_and_options.append(del);

        const site_description = document.createElement("p");
        site_description.innerText = this.description;

        const site_supplies_title = document.createElement("h3");
        site_supplies_title.innerText = "Supplies:"
        const site_supplies = document.createElement("ul");
        for (let i = 0; i < this.supplies.length; i++) {
            const supply_item = document.createElement("li");
            supply_item.innerText = this.supplies[i];
            site_supplies.append(supply_item);
        }

        picture.append(site_image);
        expandedSection.append(picture);
        
        text.append(name_and_options);
        text.append(site_description);
        text.append(site_supplies_title);
        text.append(site_supplies);
        expandedSection.append(text);

        return expandedSection;
    }

    get getCraftItem() {
        return this;
    }
}

const showCrafts = async () => {
    let craftJSON = await getJSON();
    if (craftJSON == "") {
        return;
    }
    console.log(craftJSON);

    let craftDiv = document.getElementById("crafts-list");
    craftDiv.innerHTML = "";

    let craftCol1 = document.createElement("div");
    craftCol1.classList.add("column");
    craftDiv.append(craftCol1);

    let craftCol2 = document.createElement("div");
    craftCol2.classList.add("column");
    craftDiv.append(craftCol2);

    let craftCol3 = document.createElement("div");
    craftCol3.classList.add("column");
    craftDiv.append(craftCol3);

    let craftCol4 = document.createElement("div");
    craftCol4.classList.add("column");
    craftDiv.append(craftCol4);

    let a = 0;
    craftJSON.forEach(craft => {
        let craftImg = document.createElement("img");
        craftImg.classList.add("craft-item");
        let val = crafts.length;
        crafts.push(new Craft(craft.name, craft.image, craft.description, craft.supplies, craft.id));

        craftImg.src = "crafts/" + crafts[val].img;
        craftImg.onclick = () => changeModal(crafts[val]);
        if (a == 0) {
            craftCol1.append(craftImg);
            a++;
        } else if (a == 1) {
            craftCol2.append(craftImg);
            a++;
        } else if (a == 2) {
            craftCol3.append(craftImg);
            a++;
        } else if (a == 3) {
            craftCol4.append(craftImg);
            a = 0;
        }
        
    });

};

const getJSON = async () => {
    try {
        let response = await fetch(src + "api/crafts");
        return await response.json();
    } catch(error) {
        console.log("error retrieving JSON");
        return "";
    }
};

const changeModal = (craft)  => {
    const modal = document.getElementById("id01");
    const site_section = document.getElementById("more-details");
    site_section.replaceWith(craft.details);
    modal.style.display = "block";
    console.log(craft.id);
    return;
}

const addItem = (e) => {
    e.preventDefault();
    document.getElementById('id02').style.display = "block";
    mode = "add";
    document.getElementById("upload_image").src = "crafts/blank.gif";
    console.log(mode);
}

const resetNewCraft = () => {
    const form = document.getElementById("make-changes");
    form.reset();
    const suppliesList = document.getElementById("supplies-list");
    suppliesList.innerHTML = "";
    const addBox = document.getElementById("id02");
    addBox.style.display = "none";
}

const addNewCraft = async (craft) => {
    craft.preventDefault();
    const form = document.getElementById("make-changes");
    const formData = new FormData(form);
    formData.append("supplies", getSupplies());
    let response;
    if (mode == "add") {
        formData.set("id", crafts.length);
        response = await fetch("/api/crafts", {
            method: "POST",
            body: formData
        });

        if(response.status != 200) {
            console.log("Error contacting server");
            return;
        }
    }
    if (mode == "edit") {
        response = await fetch(`/api/crafts/${form.id.value}`, {
            method: "PUT",
            body: formData
        });
    }
    
    showCrafts();
    resetNewCraft();
    return;
}

const getSupplies = () => {
    const inputs = document.querySelectorAll("#supplies-list input");
    const supplies = [];

    inputs.forEach((input) => {
        supplies.push(input.value);
    });

    return supplies;
}

const addSupplies = (supply) => {
    supply.preventDefault();
    const suppliesList = document.getElementById("supplies-list");
    const input = document.createElement("input");
    input.type = "text";
    suppliesList.append(input);
}

const uploadImage = (e) => {
    const image = document.getElementById("upload_image");
    image.src = URL.createObjectURL(e.target.files[0]);
}

const editCraft = (e) => {
    const modal2 = document.getElementById("id02");
    modal2.style.display = "block";
    const modal1 = document.getElementById("id01");
    modal1.style.display = "none";
    mode = "edit";
    popEdit(e);
    console.log(mode + e.id);
}

const popEdit = (e) => {
    const form = document.getElementById("make-changes");
    const formImage = document.getElementById("upload_image");
    formImage.src = "crafts/" + e.img;
    form.image.src = e.img;
    form.name.value = e.name;
    form.description.value = e.description;
    form.id.value = e.id;
    //supplies
    popSupplies(e.supplies);

}

const popSupplies = (s) => {
    const section = document.getElementById("supplies-list");
    s.forEach((supply) => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = supply;
        section.append(input);
    });
}

const delCraft = (e) => {
    if (confirm("Are you sure you wish to delete this?")) {
        txt = "Yes"
        permDelete(e);
        document.getElementById("id01").style.display = "none";
    } else {
        txt = "No"
    }
}

const confirmDelete = () => {

}

const permDelete = async (e) => {
    console.log(`Deleting ${e.name} Permanantly`);
    let response = await fetch(`/api/crafts/${e.id}`, {
        method:"DELETE",
        headers: {
            "Content-Type":"application/json;charset=utf-8"
        }
    });

    if (response.status != 200) {
        console.log("Error Deleting");
        return;
    }

    let result = await response.json();
    showCrafts();
}

window.onload = () => {
    showCrafts();
    document.getElementById("make-changes").onsubmit = addNewCraft;
    document.getElementById("make-changes").onreset = resetNewCraft;
    document.getElementById("add-supplies").onclick = addSupplies;
    document.getElementById("image").onchange = uploadImage;
    document.getElementById("add-item").onclick = addItem;
    document.getElementById("delete").onclick = delCraft;
};