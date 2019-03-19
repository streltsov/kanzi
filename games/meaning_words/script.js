browser.storage.local.get().then(storage => {

  const used = [];

  const choices = document.querySelectorAll('label');
  const question = document.querySelector('.question');

  function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  function load(dict) {
    choices.forEach(el => el.textContent = randomItem(Object.keys(dict)))
    question.textContent = dict[randomItem(choices).textContent].meaning;
  }

  function check() {
    const choice = document.querySelector('.choice:checked').labels[0].textContent;
    storage.dictionary[choice].meaning == question.textContent ? console.log("You're right!") : console.log('Try again!')
  }

  choices.forEach(choice => choice.control.addEventListener('click', check));

  load(storage.dictionary)

});
