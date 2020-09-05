//Get UUID
let profileUuid = document.body.querySelector("main.container").querySelector(".row").querySelector("div.col-lg-8").querySelector("div").querySelector(".card-body").childNodes[3].childNodes[5].childNodes[0].innerText;

//Check if they have a cape
fetch("https://minecraftcapes.net/profile/" + profileUuid).then(function(response) {
    return response.json();
}).then(function(body) {
    if(body.textures.ears != null) {
        userHasFeature("ears");
    }

    if(body.textures.cape != null) {
        userHasFeature("cape");
    }
});

function userHasFeature(type) {
    //Create the parent div
    let featureDiv = document.createElement("div");
    featureDiv.id = "minecraftcapes-" + type;
    featureDiv.classList.add("card");
    featureDiv.classList.add("mb-3");

    //Add the title
    let featureTitle = document.createElement("strong");
    featureTitle.classList.add("card-header");
    featureTitle.classList.add("py-1");
    featureTitle.innerHTML = "<strong><a href=\"https://minecraftcapes.net\" target=\"_blank\" rel=\"nofollow noopener noreferrer\">MinecraftCapes " + capitalizeFirstLetter(type)  + "</a></strong>";
    featureDiv.appendChild(featureTitle);

    //Add the body
    let featureBody = document.createElement("div");
    featureBody.classList.add("card-body");
    featureBody.classList.add("text-center");
    featureDiv.appendChild(featureBody);

    //Add the image
    let featureImage = document.createElement("img");
    featureImage.src = "https://minecraftcapes.net/profile/" + profileUuid + "/" + type;
    featureImage.classList.add("img-fluid");

    //Puts the image in a href
    let featureImageHref = document.createElement("a");
    featureImageHref.href = "https://minecraftcapes.net/user/" + profileUuid + "/" + type;
    featureImageHref.target = "_blank";
    featureImageHref.appendChild(featureImage);
    featureBody.appendChild(featureImageHref);

    //Insert the div
    let profileLeft = document.body.querySelector("main.container").querySelector(".row").querySelector("div.col-lg-4");
    profileLeft.insertBefore(featureDiv, profileLeft.childNodes[7]);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}