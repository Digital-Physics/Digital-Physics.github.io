(function () {
    // 
    const images = [
      './img1.png',
      './img2.png',
      './img3.png',
      './img4.png',
      './img5.png',
      './img6.png',
      './img7.png',
      './img8.png',
    ];
    const doors = document.querySelectorAll('.door');
  
    document.querySelector('#spinner').addEventListener('click', spin);
    let bgDiv = document.querySelectorAll('.bg')[0]
    let fgDiv = document.querySelectorAll('.fg')[0]
    let score = 0;
  
    function init(firstInit = true, groups = 1, duration = 10) {
      for (const door of doors) {
        const boxes = door.querySelector('.boxes');
        const boxesClone = boxes.cloneNode(false);
        const pool = ['./img9.png'];
  
        if (!firstInit) {
          const arr = [];
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            arr.push(...images);
          }
          pool.push(...shuffle(arr));
  
          boxesClone.addEventListener(
            'transitionstart',
            function () {
              door.dataset.spinned = '1';
            },
            { once: true }
          );
  
          boxesClone.addEventListener(
            'transitionend',
            function () {
              this.querySelectorAll('.box').forEach((box, index) => {
                box.style.filter = 'blur(0)';
                if (index > 0) this.removeChild(box);
              });
            },
            { once: true }
          );
        }
  
        for (let i = pool.length - 1; i >= 0; i--) {
          const box = document.createElement('div');
          const img = document.createElement('img');
          box.classList.add('box');
          box.style.width = door.clientWidth + 'px';
          box.style.height = door.clientHeight + 'px';
          img.src = pool[i];
          img.style.width = '100%';
          img.style.height = '100%';
          box.appendChild(img);
          boxesClone.appendChild(box);
        }
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
        door.replaceChild(boxesClone, boxes);
      }
    }
  
    async function spin() {
        init(false, 1, 2);
        const audio = new Audio('ca_attempt.ogg');
        audio.loop = true;
        audio.play();

        score += 1000;
        bgDiv.innerText = (score).toLocaleString("en-US");
        fgDiv.innerText = (score).toLocaleString("en-US");
      
        for (const door of doors) {
          const boxes = door.querySelector('.boxes');
          const duration = parseInt(boxes.style.transitionDuration);
          boxes.style.transform = 'translateY(0)';
          await new Promise((resolve) => setTimeout(resolve, duration * 100));
        }
      
        // Add delay to ensure audio file plays all the way through
        const delay = audio.duration - 7;
        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        audio.pause();
      }
      

    function shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    }
  
    init();
  })();
  


