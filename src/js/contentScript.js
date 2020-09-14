const skinViewer = null;
const skinViewerWalk = null;
const profileUuid = document.body.querySelector("main.container").querySelector(".row").querySelector("div.col-lg-8").querySelector("div").querySelector(".card-body").childNodes[3].childNodes[5].childNodes[0].innerText;

// Checks the users profile
fetch("https://minecraftcapes.net/profile/" + profileUuid).then(function(response) {
    return response.json();
}).then(function(body) {
    createSkinview();

    if(body.textures.ears != null) {
        userHasFeature("ears");
        this.skinViewer.loadEars("https://minecraftcapes.net/profile/" + profileUuid + "/ears")
    }

    if(body.textures.cape != null) {
        userHasFeature("cape");
        this.skinViewer.loadCustomCape("https://minecraftcapes.net/profile/" + profileUuid + "/cape")
    }

    createSkinEvents();
    createCapeEvents();
});
/**
 * Creates an element for the user if they actually have a cape/ears
 * @param String type
 */
function userHasFeature(type) {
    //Create the parent div
    let featureDiv = document.createElement("div");
    featureDiv.id = "minecraftcapes-" + type;
    featureDiv.className = "card mb-3";

    //Add the title
    let featureTitle = document.createElement("strong");
    featureTitle.className = "card-header py-1";
    featureTitle.innerHTML = "<strong><a href=\"https://minecraftcapes.net\" target=\"_blank\" rel=\"nofollow noopener noreferrer\">MinecraftCapes " + capitalizeFirstLetter(type)  + "</a></strong>";
    featureDiv.appendChild(featureTitle);

    //Add the body
    let featureBody = document.createElement("div");
    featureBody.className = "card-body text-center";
    featureDiv.appendChild(featureBody);

    //Add the image
    let featureImage = document.createElement("img");
    let featureImageStyles = "image-rendering: optimizeSpeed; image-rendering: -moz-crisp-edges; image-rendering: -o-crisp-edges; image-rendering: -webkit-optimize-contrast; image-rendering: optimize-contrast; image-rendering: pixelated; -ms-interpolation-mode: nearest-neighbor;"
    featureImage.setAttribute("style", featureImageStyles)
    if(type == "cape") {
        featureImage.style.width = "100%";
        featureImage.src = "https://minecraftcapes.net/profile/" + profileUuid + "/cape"; //for /map in the future

        featureImage.addEventListener('mouseover', (event) => {
            this.skinViewer.loadCustomCape(event.target.src);
        })
    } else {
        featureImage.style.width = "25%";
        featureImage.src = "https://minecraftcapes.net/profile/" + profileUuid + "/ears";
    }

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

/**
 * Capitalizes the first letter
 * @param String string
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Creates the skin viewer
 */
function createSkinview() {
    // Skin
    let featureDiv = document.createElement("div");
    featureDiv.id = "minecraftcapes-skin";
    featureDiv.className = "card mb-3";

    // Add a button for animation
    let featureAnimateButton = document.createElement("button");
    featureAnimateButton.className = "btn btn-secondary play-pause-btn position-absolute top-0 left-0 m-2 p-0";
    featureAnimateButton.style.cssText = "width:32px;height:32px;z-index:1;";
    featureAnimateButton.addEventListener('click', (event) => {
        toggleCustomAnimation(event.target);
    })
    let featureButtonIcon = document.createElement("i")
    featureButtonIcon.className = "fas fa-play";
    featureAnimateButton.appendChild(featureButtonIcon);
    featureDiv.appendChild(featureAnimateButton);

    // Add a button for Elytra
    let featureElytraButton = document.createElement("button");
    featureElytraButton.innerHTML = "Show Elytra"
    featureElytraButton.className = "btn btn-secondary play-pause-btn position-absolute top-0 right-0 m-2 p-0";
    featureElytraButton.style.cssText  = "height:32px;padding:0px 10px !important;z-index:1;";
    featureElytraButton.addEventListener('click', (event) => {
        this.skinViewer.toggleElytra();
        if(this.skinViewer.playerObject.cape.visible) {
            featureElytraButton.innerHTML = "Show Elytra"
        } else {
            featureElytraButton.innerHTML = "Show Cape"
        }
    })
    featureDiv.appendChild(featureElytraButton);

    // Add the body
    let featureBody = document.createElement("div");
    featureBody.className = "card-body text-center";

    if(document.getElementsByClassName("skin-3d")[0].parentNode.classList.contains("checkered-dark")) {
        featureBody.classList.add("checkered-dark");
    } else {
        featureBody.classList.add("checkered-light");
    }
    featureDiv.appendChild(featureBody);

    // Add the canvas
    let featureCanvas = document.createElement("canvas");
    featureCanvas.id = "skin_container"
    featureBody.appendChild(featureCanvas);

    //Insert the div
    let profileLeft = document.body.querySelector("main.container").querySelector(".row").querySelector("div.col-lg-4");
    profileLeft.insertBefore(featureDiv, profileLeft.childNodes[5]);

    //Get skin
    let skinHash = profileLeft.childNodes[6].childNodes[3].children[0].children[0].getAttribute("data-skin-hash")
    let skinUrl = "https://texture.namemc.com/" + skinHash.substring(0, 2) + "/" + skinHash.substring(2, 4) + "/" + skinHash + ".png";

    this.skinViewer = new skinview3d.SkinViewer({
        canvas: document.getElementById("skin_container"),
        width: 300,
        height: 400,
        skin: skinUrl,
        cape: this.finalCape,
        ears: this.finalEars
    });

    // Control objects with your mouse!
    let control = skinview3d.createOrbitControls(this.skinViewer);
    control.enableRotate = true;
    control.enableZoom = false;
    control.enablePan = false;

    this.skinViewerWalk = this.skinViewer.animations.add(skinview3d.WalkingAnimation);
    this.skinViewerWalk.paused = true;

    this.skinViewer.camera.position.x = -31.589169778419507
    this.skinViewer.camera.position.y = 14.678110751095684
    this.skinViewer.camera.position.z = 43.47876216571102

    this.skinViewer.camera.rotation.x = -0.5503518828580268
    this.skinViewer.camera.rotation.y = -0.5544622181239638
    this.skinViewer.camera.rotation.z = -0.312463891485422

    //Set style
    document.getElementById("skin_container").style.filter = "drop-shadow(-5px 5px 7px rgba(0, 0, 0, 0.4))"
    document.getElementById("skin_container").style.outline = "none"

    //Delete the normal one
    profileLeft.childNodes[1].remove();
}

/**
 * Creates the skin events
 */
function createSkinEvents() {
    let skinChildren = document.getElementsByClassName("skin-2d")
    for (var i = 0; i < skinChildren.length; i++) {
        skinChildren[i].addEventListener('mouseover', (event) => {
            if(event.target != undefined) {
                let skinHash = event.target.getAttribute("data-skin-hash")
                let skinUrl = "https://texture.namemc.com/" + skinHash.substring(0, 2) + "/" + skinHash.substring(2, 4) + "/" + skinHash + ".png";
                this.skinViewer.loadSkin(skinUrl)
            }
        })
    }
}

/**
 * Creates the cape events
 */
function createCapeEvents() {
    let capeChildren = document.getElementsByClassName("cape-2d")
    for (var i = 0; i < capeChildren.length; i++) {
        capeChildren[i].addEventListener('mouseover', (event) => {
            if(event.target != undefined) {
                let capeHash = event.target.getAttribute("data-cape-hash")
                let capeUrl = "https://texture.namemc.com/" + capeHash.substring(0, 2) + "/" + capeHash.substring(2, 4) + "/" + capeHash + ".png";
                console.log(capeUrl);
                this.skinViewer.loadCape(capeUrl)
            }
        })
    }
}

/**
 * Toggles the animation
 */
function toggleCustomAnimation(eventTarget) {
    this.skinViewerWalk.paused = !this.skinViewerWalk.paused;
}