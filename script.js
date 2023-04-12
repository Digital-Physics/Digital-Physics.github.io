(function () {
    // 
    const images = [
      './images/img1.png',
      './images/img2.png',
      './images/img3.png',
      './images/img4.png',
      './images/img5.png',
      './images/img6.png',
      './images/img7.png',
      './images/img8.png',
    ];
    const doors = document.querySelectorAll('.door');
  
    // document.querySelector('#spinner').addEventListener('click', spin);
    document.querySelector('#spinner').addEventListener('click', runFunctionsInOrder);
    let bgDiv = document.querySelectorAll('.bg')[0]
    let fgDiv = document.querySelectorAll('.fg')[0]
    let score = 42;
  
    function init(firstInit = true, groups = 1, duration = 10) {
      const line_characters = [];
      for (const door of doors) {
        const boxes = door.querySelector('.boxes');
        const boxesClone = boxes.cloneNode(false);
        const pool = ['./images/img9.png'];
  
        if (!firstInit) {
          const arr = [];
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            // console.log("time", n)
            arr.push(...images);
          }
          pool.push(...shuffle(arr));
          line_characters.push(pool[pool.length - 1])
  
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
      return line_characters
    }

    async function spin() {
      const line_characters = init(false, 1, 2);

      const updateSection = document.querySelector('#update-row');
      updateSection.hidden = true;
      if (isOn) {
        const switch_audio = new Audio('./audio/switch.wav');
        switch_audio.play();
        isOn = false;
        toggleImage.src = "./images/cash_out_big.png";
      };

      let payout_delay = 100;
      const audio = new Audio('./audio/ca_attempt.wav');
      const coin_audio = new Audio('./audio/smb_coin.wav');
      audio.loop = true;
      audio.play();

      audio.addEventListener('ended', function() {
        audio.pause();
      });

      score -= 1;
      let binary = (score).toString(2);
      // console.log("conversion correct?", score, binary)
      // let formattedBinary = binary.split('').reverse().join('').replace(/(\d{3}(?!$))/g, "$1,").split('').reverse().join('');
      bgDiv.innerText = binary;
      fgDiv.innerText = binary;
    
      for (const door of doors) {
        const boxes = door.querySelector('.boxes');
        const duration = parseInt(boxes.style.transitionDuration);
        boxes.style.transform = 'translateY(0)';
        await new Promise(resolve => setTimeout(resolve, duration * 100));
      }
    
      // Add delay to ensure audio file plays all the way through
      const delay = audio.duration - 7;
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
      audio.pause();

      // check for payout
      let allSame = line_characters.every((element) => element === line_characters[0]);
      let twoMatch = line_characters.filter((element) => element === line_characters[0] && element === line_characters[2]).length === 2;
      // line_characters.filter((element) => element === line_characters[1]).length === 2;
      // console.log("before check and increment")
      if (allSame) {
        // console.log("all match!!!!")
        // payout (the for loop has an async setTimeout function for delay effect; the promises make us wait for those before running the score comparison)
        const promises = [];
        for (let i = 0; i < 300; i++) {
          const promise = new Promise(resolve => {
            setTimeout(() => {
                score += 1;
                let binary = (score).toString(2);
                // console.log("conversion correct?", score, binary)
                // let formattedBinary = binary.split('').reverse().join('').replace(/(\d{3}(?!$))/g, "$1,").split('').reverse().join('');
                bgDiv.innerText = binary;
                fgDiv.innerText = binary;
                // coin_audio.loop = true;
                coin_audio.play();
                resolve();
            }, payout_delay * i);
          });
          promises.push(promise);
        };  
        await Promise.all(promises);
        coin_audio.pause();
      } else if (twoMatch) {
        // console.log("two match!!!")
        // payout 
        const promises = [];
        for (let i = 0; i < 30; i++) {
          const promise = new Promise(resolve => {
            setTimeout(() => {
                score += 1;
                let binary = (score).toString(2);
                // console.log("conversion correct?", score, binary)
                bgDiv.innerText = binary;
                fgDiv.innerText = binary;
                // coin_audio.loop = true;
                coin_audio.play();
                resolve();
            }, payout_delay * i);
          });
          promises.push(promise);
        };
        await Promise.all(promises);
        coin_audio.pause();
      }
    }

    function updateLeaderboard() {
      // update leaderboard check
      const third_score = parseInt(document.getElementById('third_score').textContent, 2);
      // console.log("third score", score, third_score);
    }
    
    async function runFunctionsInOrder() {
      await spin();
      updateLeaderboard();
    }
      
    function shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    }

    cashOutBtn.onclick = function () {
      const updateSection = document.querySelector('#update-row');
      updateSection.hidden = !updateSection.hidden;

      const switch_audio = new Audio('./audio/switch.wav');
      switch_audio.play();

      isOn = !isOn;
      // Update the src of the image based on the current state of the flag variable
      if (isOn) {
        toggleImage.src = "./images/cash_out_big_on.png";
      } else {
        toggleImage.src = "./images/cash_out_big.png";
      }

      const third_score = parseInt(document.getElementById('third_score').textContent, 2);

      if (score > third_score && !updateSection.hidden) {  
        const success_audio = new Audio('./audio/success.wav');
        success_audio.play();
      }
    }

    updateBtn.onclick = function () {
      const updateSection = document.querySelector('#update-row');
      updateSection.hidden = true;

      const switch_audio = new Audio('./audio/switch.wav');
      switch_audio.play();

      isOn = !isOn;
      // Update the src of the image based on the current state of the flag variable
      if (isOn) {
        toggleImage.src = "./images/cash_out_big_on.png";
      } else {
        toggleImage.src = "./images/cash_out_big.png";
      }

      const binary = (score).toString(2);
      const updateNameInput = document.querySelector('#name-input');
      
      // fetch('https://arcade-backend-jdk4.onrender.com:10000/updateLeaderboard', {
      fetch('https://arcade-backend-jdk4.onrender.com/updateLeaderboard', {
          method: 'PATCH',
          headers: {
              'Content-type': 'application/json'
          },
          mode: 'cors', // suggested by ChatGPT
          body: JSON.stringify({
              name: updateNameInput.value,
              score: binary,
              score_int: score
          })
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              const success_audio = new Audio('./audio/success.wav');
              success_audio.play();
              setTimeout(function() {
                location.reload();
              }, 500);
              // location.reload();
              // console.log("reload skip");
          }
      });
  }
  init();
})();
