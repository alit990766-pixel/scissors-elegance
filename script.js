// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Fetch Products from JSON Database
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        const grid = document.getElementById('product-grid');
        
        grid.innerHTML = ''; // Clear container

        products.forEach(item => {
            const card = `
                
                    
                        
                        ${item.badge}
                    
                    
                        ${item.category}
                        ${item.name}
                        ${item.finish}
                        Request Quote
                    
                
            `;
            grid.innerHTML += card;
        });
    } catch (error) {
        console.error("Database loading error:", error);
    }
}

// 2. Setup GSAP Scrollytelling Sequence
function setupScrollytelling() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#scrollytelling",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });

    // Phase 1: Card 1 enters
    tl.to("#card-1", { opacity: 1, y: -20, duration: 1 })
      .to("#tool-visual", { scale: 1.1, rotate: 45, duration: 1 }, "<")
      .to("#card-1", { opacity: 0, y: -40, duration: 1 }, "+=1")

    // Phase 2: Card 2 enters & Instrument rotates
      .to("#card-2", { opacity: 1, y: -20, duration: 1 })
      .to("#tool-visual", { scale: 1.25, rotate: 180, duration: 1 }, "<")
      .to("#card-2", { opacity: 0, y: -40, duration: 1 }, "+=1")

    // Phase 3: Card 3 enters & Instrument resets/zooms
      .to("#card-3", { opacity: 1, y: -20, duration: 1 })
      .to("#tool-visual", { scale: 1, rotate: 360, duration: 1 }, "<");
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    setupScrollytelling();
});
