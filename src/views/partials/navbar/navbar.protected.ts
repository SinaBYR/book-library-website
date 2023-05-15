const logoutButton = document.querySelector('a#logout-button') as HTMLAnchorElement;

logoutButton.addEventListener('click', async e => {
  e.preventDefault();

  const result = await fetch('/auth/logout', {
    method: 'post'
  });

  if(result.ok) {
    document.location.href = '/';
  }
});