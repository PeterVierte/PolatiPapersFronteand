let upload = document.querySelector("#file-input");
let canvas = document.querySelector("#canvas");
let cropper;
const save = document.querySelector('#save');
const download = document.querySelector('#download');
const newList = document.querySelector('#newList');
const userListBlock = document.querySelector('#userListBlock');
const userListParent = document.querySelector('#userListParent');
const papers = document.querySelectorAll('.paper');
const userItems = document.querySelectorAll('.userItem');
const newListUserBlock = document.querySelector('.newListUsers__block');
const croppBlock = document.querySelector('.croppBlock');
let paperName = '';
let userName = '';
const area = document.querySelector('#area');

papers.forEach(paper => {
  paper.addEventListener('change', () => {
      paperName = paper.getAttribute('value');
      console.log(paperName)
  })
})


upload.addEventListener("change", (e) => {
    if (e.target.files.length) {
      // start file reader
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target.result) {
          let img = document.createElement("img");
          img.id = "image";
          img.classList.add('canvas__img')
          img.src = e.target.result;
          
          canvas.innerHTML = '';

          canvas.appendChild(img)

          cropper = new Cropper(img, {
            autoCrop: false
          })
          
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });

  save.addEventListener('click', (e) => {
      e.preventDefault();
      let fileBase64 = cropper.getCroppedCanvas().toDataURL();
      axios.post('http://localhost:8000/sendfile', {
          file: fileBase64,
          fileName: `${paperName} - ${userName}.jpg`
      }).then(res => {
          location.href = 'http://localhost:8000/download'
      }).catch(err => {
          console.log(err)
      })
      
  })

  newList.addEventListener('click', (e) => {
    e.preventDefault();
    const usersArr = area.value.split('\n');
    usersArr.forEach(user => {
      const element = document.createElement('option');
      element.classList.add('userItem');
      element.text = user;
      element.setAttribute('value', user);
      userListBlock.appendChild(element);
    })

    newListUserBlock.classList.add('hide');
    croppBlock.classList.remove('hide');
    userName = usersArr[0];
    

  })


  userListBlock.addEventListener('change', (e) => {
      userName = e.target.value;
  })

