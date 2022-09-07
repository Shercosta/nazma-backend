//function to open image from the image holder mouse click listener
function openImage(picLink) {
    window.open(picLink);
}

//listening which div that contains image is clicked
$(".imageHolder").click(function(){
    var image = $(this).css('background-image'); //get the div's background image
    var imageLength = image.length; //get background image number of string
    var link = image.slice(5,(imageLength-2)); //remove > url('') <
    openImage(link);
});