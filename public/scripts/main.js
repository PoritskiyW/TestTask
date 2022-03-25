function route(id) {
  const guest = document.getElementById('guest')
  guest.hidden = true;
  const user = document.getElementById('user').hidden = true;
  user.hidden = true;
  const supervisor = document.getElementById('supervisor').hidden = true;
  supervisor.hidden = true;
  const admin = document.getElementById('admin').hidden = true;
  admin.hidden = true;

  const active = document.getElementById(id);
  active.hidden = false;
}

function guestHandler() {
  route('guest');
}

function userHandler() {
  route('user');
}

function supervisorHandler() {
  route('supervisor');
}

function adminHandler() {
  route('admin');
}

window.onload = () => {
  document.getElementById('guestButton').addEventListener('click', guestHandler);
  document.getElementById('userButton').addEventListener('click', userHandler);
  document.getElementById('supervisorButton').addEventListener('click', supervisorHandler);
  document.getElementById('adminButton').addEventListener('click', adminHandler);
  route('guest');
}
