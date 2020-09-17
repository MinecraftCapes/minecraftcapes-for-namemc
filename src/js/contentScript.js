const skinViewer = null;
const skinViewerWalk = null;
const profileUuid = document.body.querySelector("main.container").querySelector(".row").querySelector("div.col-lg-8").querySelector("div").querySelector(".card-body").childNodes[3].childNodes[5].childNodes[0].innerText;

// Checks the users profile
fetch("https://minecraftcapes.net/profile/" + profileUuid).then(function(response) {
    return response.json();
}).then(function(body) {
    createSkinViewer();

    if(body.textures.ears != null) {
        createEarsCard();
        this.skinViewer.loadEars("https://minecraftcapes.net/profile/" + profileUuid + "/ears")
    }

    if(body.textures.cape != null) {
        createCapeCard();
        this.skinViewer.loadCustomCape("https://minecraftcapes.net/profile/" + profileUuid + "/cape")
    }

    createSkinEvents();
    createCapeEvents();
});

/**
 * Creates the cape card
 */
function createCapeCard() {
    //Create the parent div
    let featureDiv = document.createElement("div");
    featureDiv.id = "minecraftcapes-cape";
    featureDiv.className = "card mb-3";

    //Add the title
    let featureTitle = document.createElement("strong");
    featureTitle.className = "card-header py-1";
    featureTitle.innerHTML = "<strong><a href=\"https://minecraftcapes.net\" target=\"_blank\" rel=\"nofollow noopener noreferrer\">MinecraftCapes</a> Cape</strong>";
    featureDiv.appendChild(featureTitle);

    //Add the body
    let featureBody = document.createElement("div");
    featureBody.className = "card-body text-center";
    featureBody.style.padding = "3px"
    featureDiv.appendChild(featureBody);

    //Remove the cape highlight
    let capeChildren = document.getElementsByClassName("cape-2d")
    for (var i = 0; i < capeChildren.length; i++) {
        capeChildren[i].classList.remove("skin-button-selected");
    }

    //Add the image
    let capeCanvas = document.createElement("canvas");
    capeCanvas.className = "cape-2d align-top skin-button skin-button-selected";
    capeCanvas.width = 40;
    capeCanvas.height = 64;

    capeImage = new Image();
    capeImage.src = "https://minecraftcapes.net/profile/" + profileUuid + "/cape";
    capeImage.onload = function() {
        const ctx = capeCanvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        capeScale = capeImage.width / 64;
        ctx.drawImage(capeImage, 1 * capeScale, 1 * capeScale, 10 * capeScale, 16 * capeScale, 0, 0, capeCanvas.width, capeCanvas.height)
        let frame = 0;
        let doAnimation = setInterval(function() {
            const offset = (frame * (capeImage.width / 2))
            ctx.drawImage(capeImage, 1 * capeScale, offset + (1 * capeScale), 10 * capeScale, 16 * capeScale, 0, 0, capeCanvas.width, capeCanvas.height)
            frame = frame + 1 > (capeImage.height / (capeImage.width / 2)) - 1 ? 0 : frame + 1;
        }, 110);

        if(capeImage.height == capeImage.width / 2) {
            clearInterval(doAnimation);
        }
    }

    //Puts the image in a href
    let featureImageHref = document.createElement("a");
    featureImageHref.href = "https://minecraftcapes.net/profile/" + profileUuid + "/cape";
    featureImageHref.target = "_blank";
    featureImageHref.appendChild(capeCanvas);
    featureBody.appendChild(featureImageHref);

    //Insert the div
    let profileLeft = document.body.querySelector("main.container").querySelector(".row").querySelector("div.col-lg-4");
    profileLeft.insertBefore(featureDiv, profileLeft.childNodes[7]);
}

/**
 * Creates the ears card
 */
function createEarsCard() {
    //Create the parent div
    let featureDiv = document.createElement("div");
    featureDiv.id = "minecraftcapes-ears";
    featureDiv.className = "card mb-3";

    //Add the title
    let featureTitle = document.createElement("strong");
    featureTitle.className = "card-header py-1";
    featureTitle.innerHTML = "<strong><a href=\"https://minecraftcapes.net\" target=\"_blank\" rel=\"nofollow noopener noreferrer\">MinecraftCapes</a> Ears</strong>";
    featureDiv.appendChild(featureTitle);

    //Add the body
    let featureBody = document.createElement("div");
    featureBody.className = "card-body text-center";
    featureDiv.appendChild(featureBody);

    //Add the image
    let featureImage = document.createElement("img");
    let featureImageStyles = "image-rendering: optimizeSpeed; image-rendering: -moz-crisp-edges; image-rendering: -o-crisp-edges; image-rendering: -webkit-optimize-contrast; image-rendering: optimize-contrast; image-rendering: pixelated; -ms-interpolation-mode: nearest-neighbor;"
    featureImage.setAttribute("style", featureImageStyles)
    featureImage.style.width = "25%";
    featureImage.src = "https://minecraftcapes.net/profile/" + profileUuid + "/ears";

    //Puts the image in a href
    let featureImageHref = document.createElement("a");
    featureImageHref.href = "https://minecraftcapes.net/profile/" + profileUuid + "/ears";
    featureImageHref.target = "_blank";
    featureImageHref.appendChild(featureImage);
    featureBody.appendChild(featureImageHref);

    //Insert the div
    let profileLeft = document.body.querySelector("main.container").querySelector(".row").querySelector("div.col-lg-4");
    profileLeft.insertBefore(featureDiv, profileLeft.childNodes[7]);
}

/**
 * Creates the skin viewer
 */
function createSkinViewer() {
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

    // Copy the friend button if it exist
    let friendForm = document.getElementById("add-friend-form");
    if(friendForm != null) {
        friendForm = friendForm.cloneNode(true);
        friendForm.children[2].style.zIndex = "1"
        document.getElementById("add-friend-form").remove();
        featureDiv.appendChild(friendForm);
    }

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

    this.skinViewer.loadCustomCape("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgBAMAAABQs2O3AAAAKlBMVEUAAABOTk6NjY2Hh4d7e3tzc3NsbGxZWVlKSkpVVVVoaGiEhIR/f39jY2OSVXT6AAAAAXRSTlMAQObYZgAAAKdJREFUOMtjQAOMgsbGxgz4gCADISDYKCiIX0GHoKAAPgWMQAWClClobBQsx69AYnp5Ah4FnB2SM2vxKphZXj5rAR4F7NOnl6cFYJU6AKHm3kpLC8anYFXaslRnrAoMYAqyQp3xmbA01MUlGqsCBQgV4uri4oRPAatLaIgRVgUboApCXHx24zOBx8ZYSQmfAgYj603YFQTAFChpG+NVwGwEtGIUUBsAADaTIwwcJYk6AAAAAElFTkSuQmCC");

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
            for (var i = 0; i < capeChildren.length; i++) {
                capeChildren[i].classList.remove("skin-button-selected");
            }

            event.target.classList.add("skin-button-selected");
            let capeHash = event.target.getAttribute("data-cape-hash")
            if(capeHash != undefined) {
                let capeUrl = "https://texture.namemc.com/" + capeHash.substring(0, 2) + "/" + capeHash.substring(2, 4) + "/" + capeHash + ".png";
                this.skinViewer.loadCustomCape(capeUrl)
            } else {
                this.skinViewer.loadCustomCape("https://minecraftcapes.net/profile/" + profileUuid + "/cape")
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