
 // Alternar menu

 var show = true
 var menu = document.querySelector('.menu_section')
 var btn = document.querySelector('.toggle')
 var ul = document.getElementById('ul_menu')

 btn.addEventListener('click', () =>{
    document.body.style.overflow = show ? "hidden" : "initial"
    menu.classList.toggle('on', show)
    show = !show
 })
for (var li = 0; li < ul.children.length; li++){
    ul.children[li].addEventListener('click', () =>{
        document.body.style.overflow = "initial"
        menu.setAttribute('class', "menu_section")
        show = !show
    })
}

// Animação

const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  
  const target = document.querySelectorAll('[data-anime]');
  const animationClass = 'animate';
  
  function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
    target.forEach(function(element) {
      if((windowTop) > element.offsetTop) {
        element.classList.add(animationClass);
      } else {
        element.classList.remove(animationClass);
      }
    })
  }
  
  animeScroll();
  
  if(target.length) {
    window.addEventListener('scroll', debounce(function() {
      animeScroll();
    }, 200));
  }



  //rodar
  const elementos = document.querySelectorAll(".rodar");
  let ang = 0;
  function girar() {
  ang += 0.20;
  elementos.forEach(el => {
    el.style.transform = `rotate(${ang}deg)`;
  });
  requestAnimationFrame(girar);
  }
  girar();
