// hamburgerMenu.js

export function NavbarClosing() {
    const menuCheckbox = document.getElementById("menu-checkbox");
    const navbarTop = document.querySelector(".navbar-top");
    const hamburgerBars = document.querySelector(".hamburger_bars");
  
    // Add an event listener to the document
    document.addEventListener("click", (e) => {
      // Check if the clicked element is not part of the menu
      if (
        e.target !== menuCheckbox &&
        e.target !== navbarTop &&
        !navbarTop.contains(e.target) &&
        e.target !== hamburgerBars &&
        !hamburgerBars.contains(e.target)
      ) {
        // Close the menu by unchecking the checkbox
        menuCheckbox.checked = false;
      }
    });
  }
  