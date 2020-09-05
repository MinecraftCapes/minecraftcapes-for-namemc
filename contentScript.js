//Get UUID
let profileUuid = document.body.querySelector("main.container").querySelector(".row").querySelector("div.col-lg-8").querySelector("div").querySelector(".card-body").childNodes[3].childNodes[5].childNodes[0].innerText;

//Check if they have a cape
fetch("https://minecraftcapes.net/profile/" + profileUuid).then(function(response) {
    return response.json();
}).then(function(body) {
    console.log(body);
    if(body.textures.cape != null) {
        userHasCape();
    }

    if(body.textures.ears != null) {
        userHasEars();
    }
});

function userHasCape() {
    //Create the parent div
    let capeDiv = document.createElement("div");
    capeDiv.id = "minecraftcapes";
    capeDiv.classList.add("card");
    capeDiv.classList.add("mb-3");

    //Add the title
    let capeTitle = document.createElement("strong");
    capeTitle.classList.add("card-header");
    capeTitle.classList.add("py-1");
    capeTitle.innerHTML = "<strong><a href=\"https://minecraftcapes.net\" target=\"_blank\" rel=\"nofollow noopener noreferrer\">MinecraftCapes Cape</a></strong>";
    capeDiv.appendChild(capeTitle);

    //Add the body
    let capeBody = document.createElement("div");
    capeBody.classList.add("card-body");
    capeBody.classList.add("text-center");
    capeDiv.appendChild(capeBody);

    //Add the image
    let capeImage = document.createElement("img");
    capeImage.src = "https://minecraftcapes.net/profile/" + profileUuid + "/cape";
    capeImage.classList.add("img-fluid");

    //Puts the image in a href
    let capeImageHref = document.createElement("a");
    capeImageHref.href = "https://minecraftcapes.net/user/" + profileUuid + "/cape";
    capeImageHref.target = "_blank";
    capeImageHref.appendChild(capeImage);
    capeBody.appendChild(capeImageHref);

    //Insert the div
    let profileLeft = document.body.querySelector("main.container").querySelector(".row").querySelector("div.col-lg-4");
    profileLeft.insertBefore(capeDiv, profileLeft.childNodes[7]);
}

function userHasEars() {
    //Create the parent div
    let capeDiv = document.createElement("div");
    capeDiv.id = "minecraftcapes";
    capeDiv.classList.add("card");
    capeDiv.classList.add("mb-3");

    //Add the title
    let capeTitle = document.createElement("strong");
    capeTitle.classList.add("card-header");
    capeTitle.classList.add("py-1");
    capeTitle.innerHTML = "<strong><a href=\"https://minecraftcapes.net\" target=\"_blank\" rel=\"nofollow noopener noreferrer\">MinecraftCapes Ears</a></strong>";
    capeDiv.appendChild(capeTitle);

    //Add the body
    let capeBody = document.createElement("div");
    capeBody.classList.add("card-body");
    capeBody.classList.add("text-center");
    capeDiv.appendChild(capeBody);

    //Add the image
    let capeImage = document.createElement("img");
    capeImage.src = "https://minecraftcapes.net/profile/" + profileUuid + "/ears";
    capeImage.classList.add("img-fluid");

    //Puts the image in a href
    let capeImageHref = document.createElement("a");
    capeImageHref.href = "https://minecraftcapes.net/user/" + profileUuid + "/ears";
    capeImageHref.target = "_blank";
    capeImageHref.appendChild(capeImage);
    capeBody.appendChild(capeImageHref);

    //Insert the div
    let profileLeft = document.body.querySelector("main.container").querySelector(".row").querySelector("div.col-lg-4");
    profileLeft.insertBefore(capeDiv, profileLeft.childNodes[7]);
}