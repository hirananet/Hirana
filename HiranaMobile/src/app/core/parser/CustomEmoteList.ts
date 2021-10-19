
declare var startEventEffect: any;
declare var startEventEffectRegalo: any;
declare var startEventEffectMeteor: any;
declare var startEventEffectCabritas: any;
declare var startEventEffectPrimavera: any;
declare var startEventEffectVerano: any;
declare var startEventEffectOtono: any;
declare var startEventEffectKz2s: any;
declare var startEventEffectGatosPerros: any;
declare var startEventEffectBarkito: any;
declare var addBarkitoEffect: any;

export class CustomEmoteList {

  public static readonly emotes = [
    'aaa',
    'abrazo',
    'agua',
    'agua1',
    'amigos',
    'amor',
    'aplauso',
    'arcoiris',
    'b612',
    'banana',
    'barco',
    'baskerville',
    'batalla',
    'batido',
    'bicho',
    'birra',
    'break',
    'brindis',
    'bruja',
    'buttcoin',
    'cabrita',
    'cafe',
    'cafe1',
    'caniche',
    'caramelo',
    'cascada',
    'celtic',
    'chaky',
    'chicocabra',
    'cigarro',
    'cigarro2',
    'coca',
    'comer',
    'comida',
    'cortado',
    'cronometro',
    'cumple',
    'cumple2',
    'circulomag',
    'demonio',
    'desafio',
    'duende',
    'durazno',
    'editorial',
    'ehh',
    'enojo',
    'escoba',
    'estrella',
    'fantasma',
    'fantasma1',
    'fap',
    'feliz',
    'fenix',
    'fffpf',
    'fresas',
    'fu',
    'fuego',
    'fugaz',
    'furia',
    'gato',
    'gaviota',
    'genius',
    'gnomo',
    'goat',
    'gotitas',
    'guerrero',
    'hacker',
    'hamburguesa',
    'hechizado',
    'hechizo',
    'helado',
    'hira',
    'hirana',
    'hmmm',
    'hpm',
    'invierno',
    'invitado',
    'jiji',
    'kiss',
    'kiwi',
    'kz2',
    'laugh',
    'leche',
    'leprechaun',
    'libromagico',
    'listado',
    'llorando',
    'llorar',
    'LOL',
    'madremia',
    'magia',
    'magichat',
    'mago',
    'mandarina',
    'manzana',
    'manzana1',
    'mate',
    'medalla',
    'mendikus',
    'miranda',
    'mog',
    'morido',
    'mujeragua',
    'musical',
    'muyhechizado',
    'naranja',
    'netsplit',
    'no',
    'notbad',
    'oka',
    'olitas',
    'ooo',
    'otono',
    'paleta',
    'pera',
    'pizza',
    'pocion',
    'podium',
    'polsaker',
    'porsiempre',
    'primavera',
    'principito',
    'prohibido',
    'puente',
    'regalos',
    'resucitado',
    'rosa',
    'sandia',
    'servicio',
    'silbando',
    'silencio',
    'silencioUC',
    'siuu',
    'sonrisa',
    'stalker',
    'tarta',
    'te',
    'tos',
    'triste',
    'troll',
    'trollface',
    'true',
    'underc0de',
    'varita',
    'varita2',
    'veneno',
    'verano',
    'vicximus',
    'vientomag',
    'vientomagico1',
    'vino',
    'vinobot',
    'visitante',
    'vudu',
    'whisky',
    'why',
    'xane',
    'yao',
    'zombie',
    'zorro',
    'zumo',
  ];

  public static readonly specialFaces: {[key:string]: string[]} = {
    'Gabriela-': [
      'regla',
      'magico',
      'stamp'
    ],
    Alex: [
      'stamp'
    ]
  };

  public static _effectChecker(name: string, author: string) {
    if (author === 'Gabriela-') {
      if (name === 'magia') {
        startEventEffect();
      }
      if (name === 'primavera') {
        startEventEffectPrimavera();
      }
      if (name === 'verano') {
        startEventEffectVerano();
      }
      if (name === 'otono') {
        startEventEffectOtono();
      }
      if (name === 'cabritas') {
        startEventEffectCabritas();
      }
      if (name === 'regalos') {
        startEventEffectRegalo();
      }
      if (name === 'lluvia') {
        startEventEffectMeteor();
      }
      if (name === 'gotitas') {
        // RainEvent.rainShow.emit(true);
      }
      if (name === 'kz2') {
        startEventEffectKz2s();
      }
      if (name === 'olitas') {
        startEventEffectBarkito();
      }
      if (name === 'batalla') {
        startEventEffectGatosPerros();
      }
    } else if (author === 'Alex' || author === 'Tulkalex' || author === 'Tulkalen') {
      if (name === 'kz2') {
        startEventEffectKz2s(); // Probando
      }
      if (name === 'olitas') {
        startEventEffectBarkito();
      }
    }
    if(name === 'barco') {
      addBarkitoEffect(author);
    }
  }

  public static effectChecker(text: string, author: string) {
    const faces = text.match(/:([a-zA-Z0-9]+):/g);
    if (faces) {
      faces.forEach(face => {
        const realName = face.replace(':', '').replace(':', '');
        this._effectChecker(realName, author);
      })
    }
  }

  private static getFace(name: string, author: string): string {
    if(this.emotes.find(n => n == name)) {
      return 'assets/emotes/' + name + '.png';
    } else {
      if(this.specialFaces[author]?.find(n => n == name)) {
        return 'assets/misc-emotes/' + name + '.png';
      }
    }
    return null;
  }

  public static parseEmotes(text: string, author: string, preloaded: boolean): string {
    const faces = text.match(/:([a-zA-Z0-9]+):/g);
    if (faces) {
      faces.forEach(face => {
        const realName = face.replace(':', '').replace(':', '');
        const realLocation = this.getFace(realName, author);
        if (realLocation) {
          text = text.replace(face, '<img src="' + realLocation + '" class="faceEmote ' + realName + '" data-name="' +
                                          realName + '" title=":' + realName + '" alt=":' + realName + '"/>');
        }
      });
    }
    return text;
  }

}
