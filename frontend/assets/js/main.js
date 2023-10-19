const menuBurger = document.querySelector('#menu-burger')
const menuLinks = document.querySelector('.links-responsive')

menuBurger.addEventListener('click', () => {
    menuLinks.classList.toggle('active')
})
