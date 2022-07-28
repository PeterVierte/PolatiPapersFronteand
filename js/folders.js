const area = document.querySelector('#area');
const newList = document.querySelector('#newList');
const usersListBlock = document.querySelector('#usersListBlock');
const newListUserBlock = document.querySelector('.newListUsers__block');
const usersBlock = document.querySelector('#usersBlock');
const save = document.querySelector('#save');
const reset = document.querySelector('#reset');
const close = document.querySelector('#close');
const modal = document.querySelector('#modal');
const modalItems = document.querySelector('.modal__items');
const modalTitle= document.querySelector('.modal__title');
const checkboxes = document.querySelectorAll('.paper');

let names;
let company;


newList.addEventListener('click', (e) => {
    e.preventDefault();
    names = area.value.split('\n');
    names.forEach((user, index) => {
        if(user.length > 0) {
            const element = document.createElement('div');
            element.classList.add('userItem');
            element.textContent = `${index + 1}. ${user}`;
            usersListBlock.appendChild(element);
        }
    })
    newListUserBlock.classList.add('hide');
    usersBlock.classList.remove('hide');
  })

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', (e) => {
        if(checkbox.checked) {
            save.removeAttribute('disabled');
            company = checkbox.value;
        }
    })
})

reset.addEventListener('click', (e) => {
    e.preventDefault();
    location.href = 'folders.html';
})

save.addEventListener('click', (e) => {
    e.preventDefault();
    let allFullNames = [];
    names.forEach(name => {
        if(name.length > 0) {
            allFullNames.push(name);
        }
    })
    axios.post('http://localhost:8000/createFolders', {
          names: allFullNames,
          company: company
      }).then(res => {
          
          const missingPapers = res.data;
          
          if(missingPapers.length > 0) {
                missingPapers.forEach((paper, index) => {
                    let element = document.createElement('div');
                    element.classList.add('modal__item');
                    element.textContent = `${index + 1}. ${paper}`;
                    modalItems.appendChild(element);
            })
          } else {
              modalTitle.textContent = 'Все удостоверения обработаны!';
              modalTitle.classList.add('blue');
          }

          modal.classList.remove('hide');
          save.setAttribute('disabled', 'disabled');
      }).catch(err => {
          console.log(err)
      })
})

close.addEventListener('click', () => {
    modal.classList.add('hide')
})