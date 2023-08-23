let topTextInput, bottomTextInput, imageInput, generateButton, canvas, ctx;

function init (){
    //variables
    topTextInput = document.getElementById("top-text");
    bottomTextInput = document.getElementById("bottom-text");
    imageInput = document.getElementById("image-input");
    generateButton = document.getElementById("generate-button");
    canvas = document.getElementById("meme-canvas");
    ctx = canvas.getContext("2d");

    canvas.width = canvas.height = 0;

    //button click listener
    generateButton.addEventListener("click", function (){
        
        //file reader api
        let reader = new FileReader();
        reader.onloadend = function () {
            let img = new Image;
            img.src = reader.result;
            generateMeme(img, topTextInput.value, bottomTextInput.value);
        }
        reader.readAsDataURL(imageInput.files[0]);
    });
}
init();

function generateMeme (img, topText, bottomText) {
    //size to image
    canvas.width = img.width;
    canvas.height = img.height;
   
    //clear canvas
     ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    //draw image
    ctx.drawImage(img, 0, 0);
   
    //text style
    let fontSize = canvas.width / 15;
    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = fontSize / 15;
   
    //draw top text
    ctx.textBaseline = 'top';
    topText.split('/n').reverse().forEach(function (t, i) {
    ctx.fillText(topText, canvas.width / 2, 0, canvas.width);
    ctx.strokeText(topText, canvas.width / 2, 0, canvas.width);
    });

    //draw bottom text
    ctx.textBaseline = 'bottom';
    topText.split('/n').forEach(function (t, i){
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - i * canvas.width);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - i * canvas.width);
});
};
   