var effectActive = 0;
var YTPlayer;
window.onload = () => {
  const now = new Date();
  if(now.getDate() == 21 && now.getMonth() == 5) { // 21 junio, invierno
    startEventEffectInvierno();
  }
  if(now.getDate() == 20 && now.getMonth() == 2) { // 20 marzo, otoño
    startEventEffectOtono();
  }
  if(now.getDate() == 21 && now.getMonth() == 11) { // 21 diciembre, verano
    startEventEffectVerano();
  }
  if(now.getDate() == 21 && now.getMonth() == 8) { // 21 septiembre, primavera
    startEventEffectPrimavera();
  }
  if(now.getDate() == 25 && now.getMonth() == 7) { // 25 agosto, cumpleaños
    startEventEffectRegalo();
  }
};
function startEventEffect() {
  if (effectActive <= 0) {
    snowStorm.snowStick = false;
    snowStorm.flakesMax = 64;
    snowStorm.flakesMaxActive = snowStorm.flakesMax/2;
    setTimeout(() => {
      this.stopEff();
    }, 9000);
    if(effectActive == -1) {
      snowStorm.show(['assets/eess/star.png']);
      snowStorm.resume();
    } else {
      snowStorm.start(true, ['assets/eess/star.png']);
    }
    effectActive = 1;
  }
}
function startEventEffectInvierno() {
  if (effectActive <= 0) {
    setTimeout(() => {
      this.stopEff();
    }, 9000);
    if(effectActive == -1) {
      snowStorm.show();
      snowStorm.resume();
    } else {
      snowStorm.start(true);
    }
    effectActive = 1;
  }
}
function startEventEffectOtono() {
  if (effectActive <= 0) {
    snowStorm.flakesMax = 50;
    snowStorm.flakesMaxActive = snowStorm.flakesMax/2;
    snowStorm.animationInterval = 50;
    snowStorm.vMaxX = 4;
    snowStorm.vMaxY = 2;
    snowStorm.followMouse = false;
    snowStorm.snowStick = false;
    setTimeout(() => {
      this.stopEff();
    }, 9000);
    if(effectActive == -1) {
      snowStorm.show(['assets/eess/otono.png', 'assets/eess/otono2.png', 'assets/eess/otono3.png']);
      snowStorm.resume();
    } else {
      snowStorm.start(true, ['assets/eess/otono.png', 'assets/eess/otono2.png', 'assets/eess/otono3.png']);
    }
    effectActive = 1;
  }
}
function startEventEffectVerano() {
  if (effectActive <= 0) {
    snowStorm.flakesMax = 50;
    snowStorm.flakesMaxActive = snowStorm.flakesMax/2;
    snowStorm.animationInterval = 50;
    snowStorm.vMaxX = 4;
    snowStorm.vMaxY = 2;
    snowStorm.followMouse = false;
    snowStorm.snowStick = false;
    setTimeout(() => {
      this.stopEff();
    }, 9000);
    if(effectActive == -1) {
      snowStorm.show(['assets/eess/verano.png']);
      snowStorm.resume();
    } else {
      snowStorm.start(true, 'assets/eess/verano.png');
    }
    effectActive = 1;
  }
}
function startEventEffectPrimavera() {
  if (effectActive <= 0) {
    snowStorm.flakesMax = 50;
    snowStorm.flakesMaxActive = snowStorm.flakesMax/2;
    snowStorm.animationInterval = 50;
    snowStorm.vMaxX = 4;
    snowStorm.vMaxY = 2;
    snowStorm.followMouse = false;
    snowStorm.snowStick = false;
    setTimeout(() => {
      this.stopEff();
    }, 9000);
    if(effectActive == -1) {
      snowStorm.show(['assets/eess/primavera.png','assets/eess/primavera2.png','assets/eess/primavera3.png']);
      snowStorm.resume();
    } else {
      snowStorm.start(true, ['assets/eess/primavera.png','assets/eess/primavera2.png','assets/eess/primavera3.png']);
    }
    effectActive = 1;
  }
}
function startEventEffectMeteor() {
  if (effectActive <= 0) {
    snowStorm.flakesMax = 50;
    snowStorm.flakesMaxActive = snowStorm.flakesMax/2;
    snowStorm.animationInterval = 50;
    snowStorm.vMaxX = 1;
    snowStorm.vMaxY = 10;
    snowStorm.followMouse = false;
    snowStorm.snowStick = false;
    setTimeout(() => {
      this.stopEff();
    }, 9000);
    if(effectActive == -1) {
      snowStorm.show(['assets/eess/meteor.webp']);
      snowStorm.resume();
    } else {
      snowStorm.start(true, ['assets/eess/meteor.webp']);
    }
    effectActive = 1;
  }
}
function stopEff() {
  if (effectActive > 0) {
    snowStorm.stop();
    snowStorm.freeze();
    effectActive = -1;
  }
  stopBarkitoEff();
}
function startEventEffectRegalo() {
  if (effectActive <= 0) {
    snowStorm.flakesMax = 50;
    snowStorm.flakesMaxActive = snowStorm.flakesMax/2;
    snowStorm.animationInterval = 50;
    snowStorm.vMaxX = 1;
    snowStorm.vMaxY = 1;
    snowStorm.followMouse = false;
    snowStorm.snowStick = false;
    setTimeout(() => {
      this.stopEff();
    }, 9000);
    if(effectActive == -1) {
      snowStorm.show([
        'assets/eess/cumple.png',
        'assets/eess/cumple2.png',
        'assets/eess/cumple3.png',
        'assets/eess/cumple4.png',
        'assets/eess/cumple5.png',
        'assets/eess/cumple6.png',
        'assets/eess/cumple7.png',
        'assets/eess/cumple8.png',
        'assets/eess/cumple9.png',
        'assets/eess/cumple10.png']);
      snowStorm.resume();
    } else {
      snowStorm.start(true, [
        'assets/eess/cumple.png',
        'assets/eess/cumple2.png',
        'assets/eess/cumple3.png',
        'assets/eess/cumple4.png',
        'assets/eess/cumple5.png',
        'assets/eess/cumple6.png',
        'assets/eess/cumple7.png',
        'assets/eess/cumple8.png',
        'assets/eess/cumple9.png',
        'assets/eess/cumple10.png']);
    }
    effectActive = 1;
  }
}
