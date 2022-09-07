function rewardHoverEffect(defaultID) { //Gives "opacity 50% effect to the reward div OTHER THAN the one hovered by mouse" with the ID "reward{1 to 6}"
    for (let i = 1; i <= 6; i++) {
        if (("#reward" + i) != defaultID){
            change = ("#reward" + i) //the variable "change" is never apropriately declared. This line is the declaration
            $(change).css("transition", "300ms") //Gives smoother transition 0.3s
            $(change).css("opacity", "0.5")
        }
    }
}

function rewardHoverEffectLeave(defaultID) { //Removes the "opacity 50%" effect after you done hovering above the reward element ID.
    for (let i = 1; i <= 6; i++) {
        if (("#reward" + i) != defaultID){
            change = ("#reward" + i)
            $(change).css("opacity", "1")
        }
    }
}

$(".achievementCol").mouseenter(function() { //calls the mentioned function when mouse hovered above the element which has the class of "achievementCol"
    currentID = ("#" + this.id)
    rewardHoverEffect(currentID)
})
$(".achievementCol").mouseleave(function() { //calls the mentioned function when mouse NO LONGER hovered above the element which has the class of "achievementCol"
    currentID = ("#" + this.id)
    rewardHoverEffectLeave(currentID)
})

$(".achievementCol").mouseenter(function() { //changes the thropy color of FontAwesome when mouse hovered above the element which has the class of "achievementCol"
    $(".fa-trophy").css("transition", "300ms")
    $(".fa-trophy").css("color", "#040404")
})
$(".achievementCol").mouseleave(function() { //changes the thropy color of FontAwesome when mouse NO LONGER hovered above the element which has the class of "achievementCol"
    $(".fa-trophy").css("color", "#30318B")
})

//alert for new pages
// alert("Halaman Layanan sudah dibuat. Silahkan klik Layanan pada Navigation Bar")