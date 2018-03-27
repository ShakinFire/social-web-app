$(function() {
    /* AUTO HEIGHT SET FOR TEXTAREA */
    $("#post-message").on("input", function() {
        const minHeight = parseInt($(this).css("min-height"));
        $(this).css("height", minHeight + "px");
        const scrollHeight = $(this).get(0).scrollHeight;
        $(this).css("height", scrollHeight + "px");
    });


    /* RANDOM BACKGROUND IMAGE */
    const images = [
        "../img/img1.jpeg",
        "../img/img2.jpg",
        "../img/img3.jpeg",
        "../img/img4.jpg",
        "../img/img5.jpeg",
        "../img/img6.jpeg"
    ];

    const randomNumber = Math.floor(Math.random() * images.length);
    const bgImg = "url(" + images[ randomNumber ] + ")";

    $(".bg-img").css({ "background-image": bgImg });

    /* ACTIVE INPUT FIELD */
    $("#active-window").focus();

    // TODO: REFACTOR THE CODE TO BE IN MODULES BEFORE IT GROWS AND KILL US
});
