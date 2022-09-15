
// using a data attribute instead of class as it makes working with JS easier
// as we dont have to worry about overlapping classes 
const buttons = document.querySelectorAll("[data-carousel-button]")

// loop through each button 
buttons.forEach(button => {

    // add an event listener (i.e. what happens on a click)
    button.addEventListener("click", () => {

        // access the prvious/next property set in html file 
        // if the user presses the next button then go to the next page (1)
        // otherwise return the previous page (-1)
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        
        // get the closest element that is a data carousel
        // no matter how many carousels we have, this will work as expected
        const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]")

        // sets the active slide as the slide labelled as data active
        // which is the first slide in the html file 
        const activeSlide = slides.querySelector("[data-active]")

        // find a new index, convert the slides to an array (.children)
        // get the index of the active slide, and add the offset value
        let newIndex = [...slides.children].indexOf(activeSlide) + offset

        // if we are going backwards before the first image, change the 
        // array length to the last image 
        if (newIndex < 0) newIndex = slides.children.length - 1

        // if we are going forwards after the first image, set the current 
        // index as 0 (first image)
        if (newIndex >= slides.children.length) newIndex = 0

        // adds the dataset active class to our slide  
        slides.children[newIndex].dataset.active = true

        // deletes the active data set from before
        delete activeSlide.dataset.active
    })
});