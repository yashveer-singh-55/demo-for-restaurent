/* =========================================
   ZAIKA INTERACTION ENGINE
========================================= */

document.addEventListener("DOMContentLoaded", () => {


/* =========================================
   PRELOADER
========================================= */

const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {

    setTimeout(() => {

        if(preloader){
            preloader.classList.add("hide");
        }

    },700);

});


/* =========================================
   NAVBAR
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(!navbar) return;

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if(menuToggle && mobileNav){

    menuToggle.addEventListener("click", () => {

        mobileNav.classList.toggle("open");

    });


    mobileNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("open");

        });

    });

}


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

if(cursor && follower && window.innerWidth > 800){

    let mouseX = 0;
    let mouseY = 0;

    let followerX = 0;
    let followerY = 0;


    window.addEventListener("mousemove", e => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";

    });


    function cursorAnimation(){

        followerX += (mouseX - followerX) * .12;
        followerY += (mouseY - followerY) * .12;

        follower.style.left = followerX + "px";
        follower.style.top = followerY + "px";

        requestAnimationFrame(cursorAnimation);

    }

    cursorAnimation();


    document.querySelectorAll(
        "a,button,.dish-card,.deck-card,.gallery-item,.tilt"
    ).forEach(element => {

        element.addEventListener("mouseenter", () => {

            follower.classList.add("hover");

        });


        element.addEventListener("mouseleave", () => {

            follower.classList.remove("hover");

        });

    });

}


/* =========================================
   3D TILT
========================================= */

document.querySelectorAll(".tilt").forEach(card => {

    card.addEventListener("mousemove", e => {

        if(window.innerWidth < 800) return;

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -5;

        const rotateY =
            ((x - centerX) / centerX) * 5;


        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});


/* =========================================
   MOUSE PARALLAX HERO
========================================= */

const hero = document.querySelector(".hero");
const heroDish = document.querySelector(".hero-dish");

if(hero && heroDish && window.innerWidth > 800){

    hero.addEventListener("mousemove", e => {

        const x =
            (e.clientX / window.innerWidth - .5) * 2;

        const y =
            (e.clientY / window.innerHeight - .5) * 2;


        heroDish.style.transform =
            `translate(${x * 15}px,calc(-50% + ${y * 10}px))`;

    });


    hero.addEventListener("mouseleave", () => {

        heroDish.style.transform =
            "translateY(-50%)";

    });

}


/* =========================================
   SCROLL REVEALS
========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal-left,.reveal-right"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add("revealed");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold:.15
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   COUNTERS
========================================= */

const counters =
    document.querySelectorAll("[data-counter]");


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if(!entry.isIntersecting) return;

                const counter = entry.target;

                const target =
                    parseInt(
                        counter.dataset.counter
                    );


                let current = 0;

                const duration = 1500;

                const start =
                    performance.now();


                function update(now){

                    const progress =
                        Math.min(
                            (now - start) / duration,
                            1
                        );


                    const eased =
                        1 - Math.pow(
                            1 - progress,
                            3
                        );


                    current =
                        Math.floor(
                            eased * target
                        );


                    counter.textContent =
                        current.toLocaleString();


                    if(progress < 1){

                        requestAnimationFrame(update);

                    }

                }


                requestAnimationFrame(update);

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold:.7
        }
    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================
   MENU CATEGORY FILTER
========================================= */

const categories =
    document.querySelectorAll(".category");

const menuItems =
    document.querySelectorAll(".menu-item");


categories.forEach(category => {

    category.addEventListener("click", () => {

        categories.forEach(c =>
            c.classList.remove("active")
        );

        category.classList.add("active");

        const filter =
            category.dataset.filter;


        menuItems.forEach(item => {

            const itemCategory =
                item.dataset.category;


            if(
                filter === "all" ||
                itemCategory === filter
            ){

                item.style.display = "grid";

                setTimeout(() => {

                    item.style.opacity = "1";
                    item.style.transform = "translateX(0)";

                },20);

            }else{

                item.style.opacity = "0";
                item.style.transform = "translateX(-15px)";

                setTimeout(() => {

                    item.style.display = "none";

                },250);

            }

        });

    });

});


/* =========================================
   SPIRAL CARD DECK
========================================= */

const deck =
    document.querySelector("#dishDeck");


if(deck){

    const cards =
        Array.from(
            deck.querySelectorAll(".deck-card")
        );


    const nextButton =
        document.querySelector("#deckNext");


    const prevButton =
        document.querySelector("#deckPrev");


    const progress =
        document.querySelectorAll(
            ".deck-progress span"
        );


    let currentIndex = 0;


    function renderDeck(){

        cards.forEach((card,index) => {

            let position =
                (index - currentIndex + cards.length)
                % cards.length;


            if(position > 4){

                position = 5;

            }


            const rotate =
                (position - 2) * 8;


            const x =
                (position - 2) * 35;


            const y =
                Math.abs(position - 2) * 8;


            const scale =
                1 - Math.abs(position - 2) * .045;


            const opacity =
                position === 5 ? 0 : 1;


            const zIndex =
                20 - position;


            card.style.transform =
                `translateX(${x}px)
                 translateY(${y}px)
                 rotate(${rotate}deg)
                 scale(${scale})`;


            card.style.opacity = opacity;

            card.style.zIndex = zIndex;

            card.style.pointerEvents =
                position === 0 ? "auto" : "none";

        });


        progress.forEach((dot,index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex %
                    progress.length
            );

        });

    }


    function next(){

        currentIndex =
            (currentIndex + 1) % cards.length;

        renderDeck();

    }


    function previous(){

        currentIndex =
            (currentIndex - 1 + cards.length)
            % cards.length;

        renderDeck();

    }


    if(nextButton)
        nextButton.addEventListener("click",next);


    if(prevButton)
        prevButton.addEventListener(
            "click",
            previous
        );


    /* click current card */

    cards.forEach((card,index) => {

        card.addEventListener("click", () => {

            if(index === currentIndex){

                openDishModal(card);

            }

        });

    });


    /* touch swipe */

    let startX = 0;

    deck.addEventListener("touchstart", e => {

        startX =
            e.touches[0].clientX;

    });


    deck.addEventListener("touchend", e => {

        const endX =
            e.changedTouches[0].clientX;


        if(startX - endX > 50){

            next();

        }else if(endX - startX > 50){

            previous();

        }

    });


    /* mouse wheel */

    deck.addEventListener("wheel", e => {

        if(Math.abs(e.deltaY) > 20){

            if(e.deltaY > 0){

                next();

            }else{

                previous();

            }

        }

    });


    renderDeck();

}


/* =========================================
   DISH MODAL
========================================= */

const modal =
    document.querySelector(".dish-modal");


const modalImage =
    document.querySelector("#modalImage");


const modalName =
    document.querySelector("#modalName");


const modalPrice =
    document.querySelector("#modalPrice");


const modalDescription =
    document.querySelector("#modalDescription");


const modalCategory =
    document.querySelector("#modalCategory");


function openDishModal(card){

    if(!modal) return;


    const image =
        card.querySelector("img");


    const title =
        card.dataset.name;


    const price =
        card.dataset.price;


    const description =
        card.dataset.description;


    const category =
        card.querySelector(".deck-info span")
            ?.textContent || "ZAika SPECIAL";


    if(modalImage)
        modalImage.src = image.src;


    if(modalName)
        modalName.textContent = title;


    if(modalPrice)
        modalPrice.textContent = price;


    if(modalDescription)
        modalDescription.textContent =
            description;


    if(modalCategory)
        modalCategory.textContent =
            category;


    modal.classList.add("open");

    document.body.classList.add("modal-open");

}


const modalClose =
    document.querySelector(".modal-close");


if(modalClose){

    modalClose.addEventListener("click", () => {

        modal.classList.remove("open");

        document.body.classList.remove(
            "modal-open"
        );

    });

}


if(modal){

    modal.addEventListener("click", e => {

        if(e.target === modal){

            modal.classList.remove("open");

            document.body.classList.remove(
                "modal-open"
            );

        }

    });

}


document.addEventListener("keydown", e => {

    if(e.key === "Escape" && modal){

        modal.classList.remove("open");

        document.body.classList.remove(
            "modal-open"
        );

    }

});


/* =========================================
   GALLERY LIGHTBOX
========================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");


const lightbox =
    document.querySelector(".lightbox");


const lightboxImage =
    document.querySelector(".lightbox img");


galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const image =
            item.querySelector("img");


        if(!lightbox || !lightboxImage)
            return;


        lightboxImage.src =
            image.src;


        lightbox.classList.add("open");

        document.body.classList.add(
            "modal-open"
        );

    });

});


const lightboxClose =
    document.querySelector(".lightbox-close");


if(lightboxClose){

    lightboxClose.addEventListener("click", () => {

        lightbox.classList.remove("open");

        document.body.classList.remove(
            "modal-open"
        );

    });

}


if(lightbox){

    lightbox.addEventListener("click", e => {

        if(e.target === lightbox){

            lightbox.classList.remove("open");

            document.body.classList.remove(
                "modal-open"
            );

        }

    });

}


/* =========================================
   BOOKING FORM
========================================= */

const bookingForm =
    document.querySelector("#bookingForm");


if(bookingForm){

    bookingForm.addEventListener("submit", e => {

        e.preventDefault();


        const formData =
            new FormData(bookingForm);


        const name =
            formData.get("name");


        const phone =
            formData.get("phone");


        const date =
            formData.get("date");


        const time =
            formData.get("time");


        const guests =
            formData.get("guests");


        const message =
            formData.get("message");


        const whatsappMessage =

            `Hello Zaika!%0A%0A` +

            `I would like to reserve a table.%0A%0A` +

            `Name: ${name}%0A` +

            `Phone: ${phone}%0A` +

            `Date: ${date}%0A` +

            `Time: ${time}%0A` +

            `Guests: ${guests}%0A` +

            `Request: ${message || "None"}`;


        const whatsappURL =
            `https://wa.me/911234567890?text=${whatsappMessage}`;


        window.open(
            whatsappURL,
            "_blank"
        );


        bookingForm.reset();

    });

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.querySelector(".contact-form");


if(contactForm){

    contactForm.addEventListener(
        "submit",
        e => {

            e.preventDefault();


            const button =
                contactForm.querySelector(
                    "button"
                );


            const original =
                button.innerHTML;


            button.innerHTML =
                `<i class="fa-solid fa-check"></i>
                 Message Sent`;


            button.style.background =
                "#27ae60";


            setTimeout(() => {

                button.innerHTML =
                    original;

                button.style.background =
                    "";

                contactForm.reset();

            },2500);

        }
    );

}


/* =========================================
   MAGNETIC BUTTONS
========================================= */

document.querySelectorAll(
    ".magnetic"
).forEach(button => {

    button.addEventListener(
        "mousemove",
        e => {

            if(window.innerWidth < 800)
                return;


            const rect =
                button.getBoundingClientRect();


            const x =
                e.clientX -
                rect.left -
                rect.width / 2;


            const y =
                e.clientY -
                rect.top -
                rect.height / 2;


            button.style.transform =
                `translate(${x * .12}px,
                 ${y * .12}px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "";

        }
    );

});


/* =========================================
   PARALLAX BACKGROUNDS
========================================= */

window.addEventListener("scroll", () => {

    const scrollY =
        window.scrollY;


    const quoteBg =
        document.querySelector(".quote-bg");


    if(quoteBg){

        quoteBg.style.transform =
            `translateY(${scrollY * .03}px)`;

    }

});


/* =========================================
   REVIEW ROTATION
========================================= */

const reviews =
    document.querySelectorAll(".review-card");


if(reviews.length > 1){

    let reviewIndex = 0;


    setInterval(() => {

        reviews.forEach(review =>
            review.classList.remove("active")
        );


        reviewIndex =
            (reviewIndex + 1)
            % reviews.length;


        reviews[reviewIndex]
            .classList.add("active");


    },4000);

}


/* =========================================
   RIPPLE EFFECT
========================================= */

document.querySelectorAll(
    ".gold-btn,.outline-btn,.category"
).forEach(button => {

    button.addEventListener("click", e => {

        const ripple =
            document.createElement("span");


        ripple.style.position =
            "absolute";


        ripple.style.borderRadius =
            "50%";


        ripple.style.background =
            "rgba(255,255,255,.25)";


        ripple.style.width =
            "10px";


        ripple.style.height =
            "10px";


        ripple.style.left =
            e.offsetX + "px";


        ripple.style.top =
            e.offsetY + "px";


        ripple.style.transform =
            "translate(-50%,-50%)";


        ripple.style.pointerEvents =
            "none";


        ripple.style.animation =
            "ripple .6s ease-out";


        button.style.position =
            "relative";


        button.style.overflow =
            "hidden";


        button.appendChild(ripple);


        setTimeout(
            () => ripple.remove(),
            600
        );

    });

});


/* =========================================
   IMAGE LAZY LOAD
========================================= */

document.querySelectorAll("img").forEach(img => {

    img.loading = "lazy";

});


});
