let kzzsStarted = false;

class KzzsEffect {
  cantidadKzzs = 50;
  kzzs = [];

  createEffect() {
    kzzsStarted = true;
    for(let i = 0; i<this.cantidadKzzs; i++) {
      const elem = document.createElement('img');
      elem.src = 'assets/emotes/kiss.png';
      elem.style.top = '-150px';
      elem.style.width = '100px';
      elem.style.position = 'fixed';
      this.kzzs.push(elem);
      document.body.appendChild(elem);
    }
    this.initialPositionKzzs();
  }

  initialPositionKzzs() {
    const maxY = window.innerHeight - 100;
    const maxX = window.innerWidth - 100;
    let time = 150;
    let removes = 0;
    this.kzzs.forEach(kzz => {
      setTimeout(() => {
        const posY = this.getRandomInt(maxY);
        const posX = this.getRandomInt(maxX);
        kzz.style.top = posY + 'px';
        kzz.style.left = posX + 'px';
        kzz.classList.add('kzzsEff');
        setTimeout(() => {
          kzz.remove();
          removes++;
          if(removes == this.cantidadKzzs) {
            kzzsStarted = false;
          }
        }, 1500);
      }, time);
      time += 75;
    });
  }

  getRandomInt(max, min) {
    min = min ? min : 0;
    return Math.floor(Math.random() * (max - min)) + min;
  }

}

function startEventEffectKz2s() {
  if(kzzsStarted) return;
  const ceff = new KzzsEffect();
  ceff.createEffect();
}
