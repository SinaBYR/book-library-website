const bioText = document.querySelector('.bio-text') as HTMLDivElement;
const expanderFade = document.querySelector('.bio-text-expander-fade') as HTMLDivElement;
const expanderBtn = document.querySelector('.bio-text-expander-button')! as HTMLAnchorElement;

window.addEventListener('load', () => {
  const paragraph = bioText.querySelector('p') as HTMLParagraphElement;
  if(+paragraph.clientHeight < 90) {
    expanderFade.style.display = 'none';
    bioText.style.height = 'auto';
    expanderBtn.style.display = 'none';
  }
});

expanderBtn.addEventListener('click', e => {
  e.preventDefault();

  if(bioText.classList.contains('is-expanded')) {
    bioText.classList.remove('is-expanded');
    bioText.style.height = '100px';
    expanderFade.style.display = 'block';
    expanderBtn.innerHTML = '<i class="fa fa-angle-down"></i> <span>Read more</span>';
  } else {
    bioText.classList.add('is-expanded');
    bioText.style.height = 'auto';
    expanderFade.style.display = 'none';
    expanderBtn.innerHTML = '<i class="fa fa-angle-up"></i> <span>Read less</span>';
  }
});