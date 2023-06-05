const bioText = document.querySelector('.bio-text') as HTMLDivElement;
const bioTextExpanderFade = document.querySelector('.bio-text-expander-fade') as HTMLDivElement;
const bioTextExpanderBtn = document.querySelector('.bio-text-expander-button')! as HTMLAnchorElement;
const subjects = document.querySelector('.subjects') as HTMLDivElement;
const subjectsExpanderFade = document.querySelector('.subjects-expander-fade') as HTMLDivElement;
const subjectsExpanderBtn = document.querySelector('.subjects-expander-button')! as HTMLAnchorElement;

window.addEventListener('load', () => {
  const paragraph = bioText.querySelector('p') as HTMLParagraphElement;

  if(+paragraph.clientHeight < 90) {
    bioTextExpanderFade.style.display = 'none';
    bioText.style.height = 'auto';
    bioTextExpanderBtn.style.display = 'none';
  }

	const subjectsWrapper = subjects.querySelector('.subjects-wrapper') as HTMLDivElement;
	
	if(+subjectsWrapper.clientHeight < 90) {
    subjectsExpanderFade.style.display = 'none';
    subjectsWrapper.style.height = 'auto';
    subjectsExpanderBtn.style.display = 'none';
  }
});

subjectsExpanderBtn.addEventListener('click', e => {
  e.preventDefault();

  if(subjects.classList.contains('is-expanded')) {
    subjects.classList.remove('is-expanded');
    subjects.style.height = '100px';
    subjectsExpanderFade.style.display = 'block';
    subjectsExpanderBtn.innerHTML = '<i class="fa fa-angle-down"></i> <span>Expand</span>';
  } else {
    subjects.classList.add('is-expanded');
    subjects.style.height = 'auto';
    subjectsExpanderFade.style.display = 'none';
    subjectsExpanderBtn.innerHTML = '<i class="fa fa-angle-up"></i> <span>Collapse</span>';
  }
});

bioTextExpanderBtn.addEventListener('click', e => {
  e.preventDefault();

  if(bioText.classList.contains('is-expanded')) {
    bioText.classList.remove('is-expanded');
    bioText.style.height = '100px';
    bioTextExpanderFade.style.display = 'block';
    bioTextExpanderBtn.innerHTML = '<i class="fa fa-angle-down"></i> <span>Read more</span>';
  } else {
    bioText.classList.add('is-expanded');
    bioText.style.height = 'auto';
    bioTextExpanderFade.style.display = 'none';
    bioTextExpanderBtn.innerHTML = '<i class="fa fa-angle-up"></i> <span>Read less</span>';
  }
});
