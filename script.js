// Carousel functionality
let currentSlide = 0
const carousel = document.getElementById("carousel")
const slides = document.querySelectorAll(".project-card")
const totalSlides = slides.length
const dotsContainer = document.getElementById("carouselDots")

// Create dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div")
  dot.classList.add("dot")
  if (i === 0) dot.classList.add("active")
  dot.addEventListener("click", () => goToSlide(i))
  dotsContainer.appendChild(dot)
}

const dots = document.querySelectorAll(".dot")

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide)
  })
}

function moveCarousel(direction) {
  currentSlide += direction
  if (currentSlide < 0) currentSlide = totalSlides - 1
  if (currentSlide >= totalSlides) currentSlide = 0
  updateCarousel()
}

function goToSlide(index) {
  currentSlide = index
  updateCarousel()
}

// Auto-play carousel
let autoplayInterval = setInterval(() => {
  moveCarousel(1)
}, 5000)

// Pause autoplay on hover
const carouselContainer = document.querySelector(".carousel-container")
carouselContainer.addEventListener("mouseenter", () => {
  clearInterval(autoplayInterval)
})

carouselContainer.addEventListener("mouseleave", () => {
  autoplayInterval = setInterval(() => {
    moveCarousel(1)
  }, 5000)
})

// Click on project card to open link
slides.forEach((slide) => {
  slide.addEventListener("click", (e) => {
    if (!e.target.classList.contains("project-link")) {
      const url = slide.getAttribute("data-url")
      window.open(url, "_blank")
    }
  })
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section)
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Mobile navigation toggle functionality
const navToggle = document.getElementById("navToggle")
const navMenu = document.querySelector(".nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")

  // Animate hamburger icon
  const spans = navToggle.querySelectorAll("span")
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translateY(8px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translateY(-8px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

// Close mobile menu when clicking on a link
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    const spans = navToggle.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

//Botones de seleccion de plan
const plan1btn = document.querySelector(".btn1")
const plan2btn = document.querySelector(".btn2")
const plan3btn = document.querySelector(".btn3")
const planSelectedInput = document.querySelector("#message")

console.log(plan1btn.textContent)
console.log(plan2btn.textContent)
console.log(plan3btn.textContent)
console.log(planSelectedInput)

plan1btn.addEventListener("click", planSelected);
plan2btn.addEventListener("click", planSelected);
plan3btn.addEventListener("click", planSelected);

function planSelected(e) {
  planSelectedInput.textContent = `Hola! Estoy interesado en el plan ${e.target.parentElement.querySelector('h3').textContent}`;
}