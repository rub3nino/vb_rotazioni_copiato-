var monkeysppp = monkeysppp || { vbRotations: {} };

monkeysppp.vbRotations.SVGMaker = function() {
  var _this = this;

  this.NS = 'http://www.w3.org/2000/svg';
  this.sroot = null;
  this.width = null;
  this.height = null;

  this.backgroundColour      = '#85d6ff';
  this.courtColour           = '#ffb591';
  this.lineColour            = 'white';
  this.playerColour          = '#efa581';
  this.playerColourHighlight = '#66dd66';
  this.rotationControlColour = 'white';
  this.rotationControlHighlightColour = '#dddddd';
  this.rotationControlBackgroundColourA = '#65b6df';
  this.rotationControlBackgroundColourB = '#4596bf';
  this.rotationControlCirleRadius = 12;
  this.tutorialColour        = '#44cc44';
  this.tutorialFade          = '#999999';

  // Player objects
  this.setter = null;
  this.oppo = null;
  this.m1 = null;
  this.m2 = null;
  this.h1 = null;
  this.h2 = null;

  this.rotationControls = null;
  this.highlightedPlayer = 0;

  // Action locks;
  this.moving = null;
  this.serveRotation = null;

  this.setterAt = 2;

  this.controlTwoRcv = null;
  this.controlTwoSrv = null;
  this.controlThreeRcv = null;
  this.controlThreeSrv = null;
  this.controlFourRcv = null;
  this.controlFourSrv = null;
  this.controlFiveRcv = null;
  this.controlFiveSrv = null;
  this.controlSixRcv = null;
  this.controlSixSrv = null;
  this.controlOneRcv = null;
  this.controlOneSrv = null;

  this.playerOffsetsBase = {
    1: {
        s:  { x: 350, y: 300 },
        h1: { x: 350, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 100, y: 50 },
        h2: { x: 100, y: 300 },
        m2: { x: 225, y: 350 },
      },
    2: {
        m2: { x: 350, y: 300 },
        s:  { x: 350, y: 50 },
        h1: { x: 225, y: 50 },
        m1: { x: 100, y: 50 },
        o:  { x: 100, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 350, y: 300 },
        m2: { x: 350, y: 50 },
        s:  { x: 225, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 100, y: 300 },
        o:  { x: 225, y: 350 },
      },
    4: {
        o:  { x: 350, y: 300 },
        h2: { x: 350, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 100, y: 50 },
        h1: { x: 100, y: 300 },
        m1: { x: 225, y: 350 },
      },
    5: {
        m1: { x: 350, y: 300 },
        o:  { x: 350, y: 50 },
        h2: { x: 225, y: 50 },
        m2: { x: 100, y: 50 },
        s:  { x: 100, y: 300 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 350, y: 300 },
        m1: { x: 350, y: 50 },
        o:  { x: 225, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 100, y: 300 },
        s:  { x: 225, y: 350 },
      },
  };

  this.playerOffsetsServeServe = {
    1: {
        s:  { x: 350, y: 475 },
        h1: { x: 290, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 160, y: 50 },
        h2: { x: 100, y: 300 },
        m2: { x: 225, y: 350 },
      },
    2: {
        m2: { x: 350, y: 475 },
        s:  { x: 290, y: 50 },
        h1: { x: 225, y: 50 },
        m1: { x: 160, y: 50 },
        o:  { x: 100, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 350, y: 475 },
        m2: { x: 290, y: 50 },
        s:  { x: 225, y: 50 },
        h1: { x: 160, y: 50 },
        m1: { x: 100, y: 300 },
        o:  { x: 225, y: 350 },
      },
    4: {
        o:  { x: 350, y: 475 },
        h2: { x: 290, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 160, y: 50 },
        h1: { x: 100, y: 300 },
        m1: { x: 225, y: 350 },
      },
    5: {
        m1: { x: 350, y: 475 },
        o:  { x: 290, y: 50 },
        h2: { x: 225, y: 50 },
        m2: { x: 160, y: 50 },
        s:  { x: 100, y: 300 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 350, y: 475 },
        m1: { x: 290, y: 50 },
        o:  { x: 225, y: 50 },
        h2: { x: 160, y: 50 },
        m2: { x: 100, y: 300 },
        s:  { x: 225, y: 350 },
      },
  };

  this.playerOffsetsSwitchServe = {
    1: {
        s:  { x: 350, y: 300 },
        h1: { x: 100, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 50 },
        h2: { x: 225, y: 350 },
        m2: { x: 100, y: 300 },
      },
    2: {
        m2: { x: 100, y: 300 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 225, y: 350 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 100, y: 300 },
        o:  { x: 350, y: 300 },
      },
    4: {
        o:  { x: 350, y: 300 },
        h2: { x: 100, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 50 },
        h1: { x: 225, y: 350 },
        m1: { x: 100, y: 300 },
      },
    5: {
        m1: { x: 100, y: 300 },
        o:  { x: 350, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 300 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 225, y: 350 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 100, y: 300 },
        s:  { x: 350, y: 300 },
      },
  };

  this.playerOffsetsSwitchReceive = {
    1: {
        s:  { x: 350, y: 300 },
        h1: { x: 350, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 100, y: 50 },
        h2: { x: 225, y: 350 },
        m2: { x: 100, y: 300 },
      },
    2: {
        m2: { x: 100, y: 300 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 225, y: 350 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 100, y: 300 },
        o:  { x: 350, y: 300 },
      },
    4: {
        o:  { x: 350, y: 300 },
        h2: { x: 100, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 50 },
        h1: { x: 225, y: 350 },
        m1: { x: 100, y: 300 },
      },
    5: {
        m1: { x: 100, y: 300 },
        o:  { x: 350, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 300 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 225, y: 350 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 100, y: 300 },
        s:  { x: 350, y: 300 },
      },
  };

  this.playerOffsetsReceiveReceive = {
    1: {
        s:  { x: 400, y: 385 },
        h1: { x: 370, y: 300 },
        m1: { x: 240, y: 140 },
        o:  { x: 50, y: 150 },
        h2: { x: 100, y: 300 },
        m2: { x: 230, y: 330 },
      },
    2: {
        m2: { x: 350, y: 300 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 300 },
        m1: { x: 20, y: 80 },
        o:  { x: 130, y: 380 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 350, y: 300 },
        m2: { x: 370, y: 100 },
        s:  { x: 300, y: 50 },
        h1: { x: 100, y: 300 },
        m1: { x: 225, y: 350 },
        o:  { x: 300, y: 380 },
      },
    4: {
        o:  { x: 380, y: 380 },
        h2: { x: 100, y: 300 },
        m2: { x: 70, y: 70 },
        s:  { x: 30, y: 30 },
        h1: { x: 225, y: 350 },
        m1: { x: 350, y: 300 },
      },
    5: {
        m1: { x: 350, y: 300 },
        o:  { x: 420, y: 50 },
        h2: { x: 100, y: 300 },
        m2: { x: 70, y: 50 },
        s:  { x: 120, y: 140 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 350, y: 300 },
        m1: { x: 350, y: 70 },
        o:  { x: 280, y: 30 },
        h2: { x: 100, y: 300 },
        m2: { x: 225, y: 350 },
        s:  { x: 255, y: 85 },
      },
  };

  this.playerOffsetsReceiveSet = {
    1: {
        s:  { x: 300, y: 50 },
        h1: { x: 450, y: 150 },
        m1: { x: 225, y: 150 },
        o:  { x: 0,   y: 150 },
        h2: { x: 225, y: 350 },
        m2: { x: 125, y: 300 },
      },
    2: {
        m2: { x: 100, y: 250 },
        s:  { x: 300, y: 50 },
        h1: { x: 0,   y: 150 },
        m1: { x: 225, y: 150 },
        o:  { x: 400, y: 250 },
        h2: { x: 225, y: 300 },
      },
    3: {
        h2: { x: 225, y: 280 },
        m2: { x: 225, y: 150 },
        s:  { x: 300, y: 50 },
        h1: { x: 0,   y: 150 },
        m1: { x: 125, y: 300 },
        o:  { x: 400, y: 250 },
      },
    4: {
        o:  { x: 400, y: 250 },
        h2: { x: 0,   y: 150 },
        m2: { x: 225, y: 150 },
        s:  { x: 300, y: 50 },
        h1: { x: 225, y: 250 },
        m1: { x: 150, y: 300 },
      },
    5: {
        m1: { x: 100, y: 250 },
        o:  { x: 450, y: 150 },
        h2: { x: 0,   y: 150 },
        m2: { x: 225, y: 150 },
        s:  { x: 300, y: 50 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 225, y: 250 },
        m1: { x: 225, y: 150 },
        o:  { x: 450, y: 150 },
        h2: { x: 0,   y: 150 },
        m2: { x: 150, y: 250 },
        s:  { x: 300, y: 50 },
      },
  };

  this.playerOffsetsReceiveHit = {
    1: {
        s:  { x: 300, y: 50 },
        h1: { x: 400, y: 50 },
        m1: { x: 225, y: 100 },
        o:  { x: 50, y: 50 },
        h2: { x: 225, y: 250 },
        m2: { x: 125, y: 200 },
      },
    2: {
        m2: { x: 100, y: 250 },
        s:  { x: 300, y: 50 },
        h1: { x: 50,  y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 420, y: 150 },
        h2: { x: 225, y: 200 },
      },
    3: {
        h2: { x: 225, y: 150 },
        m2: { x: 225,  y: 50 },
        s:  { x: 300, y: 50 },
        h1: { x: 50, y: 50 },
        m1: { x: 125, y: 300 },
        o:  { x: 400, y: 150 },
      },
    4: {
        o:  { x: 400, y: 150 },
        h2: { x: 50, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 300, y: 50 },
        h1: { x: 225, y: 150 },
        m1: { x: 150, y: 300 },
      },
    5: {
        m1: { x: 100, y: 250 },
        o:  { x: 400, y: 50 },
        h2: { x: 50,  y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 300, y: 50 },
        h1: { x: 225, y: 200 },
      },
    6: {
        h1: { x: 225, y: 200 },
        m1: { x: 225, y: 50 },
        o:  { x: 400, y: 50 },
        h2: { x: 50,  y: 50 },
        m2: { x: 150, y: 250 },
        s:  { x: 300, y: 50 },
      },
  };

  // FIPAV Defense Block at 4 (Opponent attacks from their 4, our right side)
  // Block formed by P2 & P3.
  this.playerOffsetsDefense4 = {
    1: { // P1 (Setter in 1) -> S is P1, O is P4, M1 is P6, M2 is P3, H1 is P2, H2 is P5
        h1: { x: 400, y: 50 }, // Right block
        m2: { x: 300, y: 50 }, // Center-right block
        o:  { x: 100, y: 150 }, // Left line cover
        s:  { x: 400, y: 350 }, // Deep line
        m1: { x: 225, y: 350 }, // Deep middle
        h2: { x: 80,  y: 280 }, // Deep angle
      },
    2: { // P1 is H1
        s:  { x: 400, y: 50 },
        m2: { x: 300, y: 50 },
        h1: { x: 100, y: 150 },
        o:  { x: 400, y: 350 },
        h2: { x: 225, y: 350 },
        m1: { x: 80,  y: 280 },
      },
    3: { // P1 is M2
        m2: { x: 400, y: 50 },
        s:  { x: 300, y: 50 },
        h2: { x: 100, y: 150 },
        h1: { x: 400, y: 350 },
        m1: { x: 225, y: 350 },
        o:  { x: 80,  y: 280 },
      },
    4: { // P1 is O
        h2: { x: 400, y: 50 },
        m1: { x: 300, y: 50 },
        s:  { x: 100, y: 150 },
        m2: { x: 400, y: 350 },
        o:  { x: 225, y: 350 },
        h1: { x: 80,  y: 280 },
      },
    5: { // P1 is H2
        o:  { x: 400, y: 50 },
        m1: { x: 300, y: 50 },
        h2: { x: 100, y: 150 },
        m2: { x: 400, y: 350 },
        h1: { x: 225, y: 350 },
        s:  { x: 80,  y: 280 },
      },
    6: { // P1 is M1
        m1: { x: 400, y: 50 },
        o:  { x: 300, y: 50 },
        s:  { x: 100, y: 150 },
        h1: { x: 400, y: 350 },
        h2: { x: 225, y: 350 },
        m2: { x: 80,  y: 280 },
      },
  };

  // FIPAV Defense Block at 2 (Opponent attacks from their 2, our left side)
  // Block formed by P4 & P3 
  this.playerOffsetsDefense2 = {
    1: {
        o:  { x: 50,  y: 50 }, // Left block
        m2: { x: 150, y: 50 }, // Center-left block
        h1: { x: 350, y: 150 }, // Right line cover
        s:  { x: 370, y: 280 }, // Deep angle
        m1: { x: 225, y: 350 }, // Deep middle
        h2: { x: 50,  y: 350 }, // Deep line
      },
    2: {
        h1: { x: 50,  y: 50 },
        m2: { x: 150, y: 50 },
        s:  { x: 350, y: 150 },
        o:  { x: 370, y: 280 },
        h2: { x: 225, y: 350 },
        m1: { x: 50,  y: 350 },
      },
    3: {
        h2: { x: 50,  y: 50 },
        s:  { x: 150, y: 50 },
        m2: { x: 350, y: 150 },
        h1: { x: 370, y: 280 },
        m1: { x: 225, y: 350 },
        o:  { x: 50,  y: 350 },
      },
    4: {
        s:  { x: 50,  y: 50 },
        m1: { x: 150, y: 50 },
        h2: { x: 350, y: 150 },
        m2: { x: 370, y: 280 },
        o:  { x: 225, y: 350 },
        h1: { x: 50,  y: 350 },
      },
    5: {
        h2: { x: 50,  y: 50 },
        m1: { x: 150, y: 50 },
        o:  { x: 350, y: 150 },
        m2: { x: 370, y: 280 },
        h1: { x: 225, y: 350 },
        s:  { x: 50,  y: 350 },
      },
    6: {
        s:  { x: 50,  y: 50 },
        o:  { x: 150, y: 50 },
        m1: { x: 350, y: 150 },
        h1: { x: 370, y: 280 },
        h2: { x: 225, y: 350 },
        m2: { x: 50,  y: 350 },
      },
  };

  // FIPAV Defense Block at Center (Opponent attacks from Center)
  // Block formed by P3 (Middle)
  this.playerOffsetsDefenseCenter = {
    1: {
        m2: { x: 225, y: 50 },  // Center block
        o:  { x: 75,  y: 120 }, // Left short cover
        h1: { x: 375, y: 120 }, // Right short cover
        h2: { x: 75,  y: 320 }, // Deep Left
        s:  { x: 375, y: 320 }, // Deep Right
        m1: { x: 225, y: 360 }, // Deep Center (Libero)
      },
    2: {
        m2: { x: 225, y: 50 },
        h1: { x: 75,  y: 120 },
        s:  { x: 375, y: 120 },
        m1: { x: 75,  y: 320 },
        o:  { x: 375, y: 320 },
        h2: { x: 225, y: 360 },
      },
    3: {
        s:  { x: 225, y: 50 },
        h2: { x: 75,  y: 120 },
        m2: { x: 375, y: 120 },
        o:  { x: 75,  y: 320 },
        h1: { x: 375, y: 320 },
        m1: { x: 225, y: 360 },
      },
    4: {
        m1: { x: 225, y: 50 },
        s:  { x: 75,  y: 120 },
        h2: { x: 375, y: 120 },
        h1: { x: 75,  y: 320 },
        m2: { x: 375, y: 320 },
        o:  { x: 225, y: 360 },
      },
    5: {
        m1: { x: 225, y: 50 },
        h2: { x: 75,  y: 120 },
        o:  { x: 375, y: 120 },
        s:  { x: 75,  y: 320 },
        m2: { x: 375, y: 320 },
        h1: { x: 225, y: 360 },
      },
    6: {
        o:  { x: 225, y: 50 },
        s:  { x: 75,  y: 120 },
        m1: { x: 375, y: 120 },
        m2: { x: 75,  y: 320 },
        h1: { x: 375, y: 320 },
        h2: { x: 225, y: 360 },
      },
  };

  this.tutorialData = [
    {
      boxPosition: {
        left:   250,
        right:  350,
        top:    350,
        bottom: 450,
      },
      textPosition: {
        left:   375,
        right:  685,
        top:    350,
        bottom: 450,
      },
      text: 'Questo è un giocatore.\nSi seleziona con un clic.\nS=Schiacciatore, C=Centrale,\n P=Palleggiatore, O=Opposto',
      nextPosition: {
        left: 585,
        top:  475,
      },
    },
    {
      boxPosition: {
        left:   72,
        right:  528,
        top:    48,
        bottom: 480,
      },
      textPosition: {
        left:   550,
        right:  860,
        top:    200,
        bottom: 300,
      },
      text: 'Questo è in campo con tutti e\n 6 i giocatori.\nAl clic sui bottoni, i giocatori\n si muoveranno intorno al campo',
      nextPosition: {
        left: 760,
        top:  325,
      },
    },
    {
      boxPosition: {
        left:   630,
        right:  880,
        top:    25,
        bottom: 535,
      },
      textPosition: {
        left:   288,
        right:  605,
        top:    7,
        bottom: 125,
      },
      text: "Questo ti permette di scegliere\nla formazione di partenza.\nIl clic sul cerchio cambia la rotazione.\nOgni rotazione è etichettata con la\nposizione dell'alzatore (P)",
      nextPosition: {
        left: 505,
        top:  150,
      },
    },
    {
      boxPosition: {
        left:   630,
        right:  720,
        top:    25,
        bottom: 535,
      },
      textPosition: {
        left:   295,
        right:  605,
        top:    75,
        bottom: 175,
      },
      text: 'Questo mostra la situazione in cui\nla squadra è al servizio',
      nextPosition: {
        left: 505,
        top:  200,
      },
    },
    {
      boxPosition: {
        left:   720,
        right:  810,
        top:    25,
        bottom: 535,
      },
      textPosition: {
        left:   295,
        right:  605,
        top:    125,
        bottom: 225,
      },
      text: 'Questo mostra la situazione in cui\nla squadra è in ricezione.',
      nextPosition: {
        left: 505,
        top:  250,
      },
    },
    {
      boxPosition: {
        left:   630,
        right:  810,
        top:    25,
        bottom: 535,
      },
      textPosition: {
        left:   295,
        right:  605,
        top:    175,
        bottom: 275,
      },
      text: 'Spostandosi da un cerchio ad un\nsi simulano le rotazioni come\ndurante una gara.',
      nextPosition: {
        left: 505,
        top:  300,
      },
    },
    {
      boxPosition: {
        left:   70,
        right:  538,
        top:    560,
        bottom: 755,
      },
      textPosition: {
        left:   75,
        right:  385,
        top:    440,
        bottom: 540,
      },
      text: 'Da qui si selezionano le situazioni\n di gioco.\nI giocatori si muoveranno nel campo\ndi conseguenza.',
      nextPosition: {
        left: 410,
        top:  500,
      },
    },
    {
      boxPosition: {
        left:   70,
        right:  538,
        top:    560,
        bottom: 657,
      },
      textPosition: {
        left:   100,
        right:  410,
        top:    440,
        bottom: 540,
      },
      text: 'Qui si hanno le posizioni dei\n giocatori quando la squadra\n è al servizio.',
      nextPosition: {
        left: 435,
        top:  500,
      },
    },
    {
      boxPosition: {
        left:   70,
        right:  538,
        top:    658,
        bottom: 755,
      },
      textPosition: {
        left:   125,
        right:  435,
        top:    440,
        bottom: 540,
      },
      text: 'Qui si hanno le posizioni dei\n giocatori quando la squadra\n è in ricezione.',
      nextPosition: {
        left: 460,
        top:  500,
      },
    },
  ];

  // Default methods
  var reportError = function(msg) {
    // do nothing with the error message;
  };

  // Private methods
  function errorHandler(handler) {
    _this.reportError = handler;
  }

  function getWidth(options) {
    return '100%';
  }

  function getHeight(options) {
    return '100%';
  }

  function drawCourt() {
    // Draw Court Base
    // Background
    var background = _this.sroot.rect(0, 0, getWidth(), getHeight());
    background.attr({
      fill: _this.backgroundColour,
    });

    // Court lines
    var outerLines = _this.sroot.rect(75, 50, 450, 425);
    outerLines.attr({
      fill: _this.courtColour,
      stroke: _this.lineColour,
      strokeWidth: 4,
    });

    // Centre line
    var centreLine = _this.sroot.line(60, 50, 540, 50);
    centreLine.attr({
      stroke: _this.lineColour,
      strokeWidth: 4,
    });

    // Attack line and sub lines
    var attackLine = _this.sroot.line(75, 200, 525, 200);
    attackLine.attr({
      stroke: _this.lineColour,
      strokeWidth: 4,
    });
    var leftTicks = _this.sroot.line(10, 200, 75, 200);
    leftTicks.attr({
      stroke: _this.lineColour,
      strokeWidth: 4,
      'stroke-dasharray': '9, 9',
    });
    var rightTicks = _this.sroot.line(525, 200, 590, 200);
    rightTicks.attr({
      stroke: _this.lineColour,
      strokeWidth: 4,
      'stroke-dasharray': '9, 9',
    });
  }

  function drawPlayers() {
    // Player markers
    var setterCircle = _this.sroot.circle(75, 50, 27);
    setterCircle.attr({
      stroke: '#eeeeee',
      strokeWidth: 4,
      fill: _this.playerColour,
    });
    var setterLabel = _this.sroot.text(75, 50, 'P');
    setterLabel.attr({
      fill: 'none',
      stroke: '#eeeeee',
      strokeWidth: '4',
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size':'30',
    });
    _this.setter = _this.sroot.group(setterCircle, setterLabel);
    _this.setter.attr({ cursor: 'pointer' });

    var m1Circle = _this.sroot.circle(75, 50, 27);
    m1Circle.attr({
      stroke: '#eeeeee',
      strokeWidth: 4,
      fill: _this.playerColour,
    });
    var m1Label = _this.sroot.text(75, 50, 'C2');
    m1Label.attr({
      fill: 'none',
      stroke: '#eeeeee',
      strokeWidth: '4',
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size':'30',
    });
    _this.m1 = _this.sroot.group(m1Circle, m1Label);
    _this.m1.attr({ cursor: 'pointer' });

    var h1Circle = _this.sroot.circle(75, 50, 27);
    h1Circle.attr({
      stroke: '#eeeeee',
      strokeWidth: 4,
      fill: _this.playerColour,
    });
    var h1Label = _this.sroot.text(75, 50, 'S1');
    h1Label.attr({
      fill: 'none',
      stroke: '#eeeeee',
      strokeWidth: '4',
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size':'30',
    });
    _this.h1 = _this.sroot.group(h1Circle, h1Label);
    _this.h1.attr({ cursor: 'pointer' });

    var oppoCircle = _this.sroot.circle(75, 50, 27);
    oppoCircle.attr({
      stroke: '#eeeeee',
      strokeWidth: 4,
      fill: _this.playerColour,
    });
    var oppoLabel = _this.sroot.text(75, 50, 'O');
    oppoLabel.attr({
      fill: 'none',
      stroke: '#eeeeee',
      strokeWidth: '4',
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size':'30',
    });
    _this.oppo = _this.sroot.group(oppoCircle, oppoLabel);
    _this.oppo.attr({ cursor: 'pointer' });

    var m2Circle = _this.sroot.circle(75, 50, 27);
    m2Circle.attr({
      stroke: '#eeeeee',
      strokeWidth: 4,
      fill: _this.playerColour,
    });
    var m2Label = _this.sroot.text(75, 50, 'C1');
    m2Label.attr({
      fill: 'none',
      stroke: '#eeeeee',
      strokeWidth: '4',
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size':'30',
    });
    _this.m2 = _this.sroot.group(m2Circle, m2Label);
    _this.m2.attr({ cursor: 'pointer' });

    var h2Circle = _this.sroot.circle(75, 50, 27);
    h2Circle.attr({
      stroke: '#eeeeee',
      strokeWidth: 4,
      fill: _this.playerColour,
    });
    var h2Label = _this.sroot.text(75, 50, 'S2');
    h2Label.attr({
      fill: 'none',
      stroke: '#eeeeee',
      strokeWidth: '4',
      'text-anchor':'middle',
      'dominant-baseline':'central',
      'font-family': 'Verdana',
      'font-size':'30',
    });
    _this.h2 = _this.sroot.group(h2Circle, h2Label);
    _this.h2.attr({ cursor: 'pointer' });

    _this.setter.click(function() {toggleHighlightPlayer(setterCircle);});
    _this.oppo.click(function() {toggleHighlightPlayer(oppoCircle);});
    _this.h1.click(function() {toggleHighlightPlayer(h1Circle);});
    _this.h2.click(function() {toggleHighlightPlayer(h2Circle);});
    _this.m1.click(function() {toggleHighlightPlayer(m1Circle);});
    _this.m2.click(function() {toggleHighlightPlayer(m2Circle);});
  }

  // Controls logic moved to HTML completely.

  function createSVGDocRoot(width, height) {
    _this.moving = false;
    var svgRoot = document.createElementNS(_this.NS, 'svg');
    svgRoot.setAttribute('width', width);
    svgRoot.setAttribute('height', height);
    svgRoot.setAttribute('viewBox', '0 0 600 660');
    svgRoot.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svgRoot.setAttribute('id', 'vbsvg');
    return svgRoot;
  }

  function createSVGDoc(options) {

    _this.width = getWidth(options);
    _this.height = getHeight(options);
    var svgRoot = createSVGDocRoot(_this.width, _this.height);

    return svgRoot;
  }

  function draw() {
    _this.sroot = Snap('#vbsvg');
    drawCourt();
    // drawRotationControl(); // Removed, now in HTML
    // drawActionControl(); // Removed, now in HTML
    drawPlayers();
    // drawTutorialButton(); // Removed, handled externally if needed
    initialisePlayers();
    setupPlayerNames();
  }

  function setupPlayerNames() {
    var defaultNames = {
      'P': 'P',
      'O': 'O',
      'S1': 'S1',
      'S2': 'S2',
      'C1': 'C1',
      'C2': 'C2'
    };

    var labelsMap = {
      'P': { label: _this.setter.select('text'), circle: _this.setter.select('circle') },
      'O': { label: _this.oppo.select('text'), circle: _this.oppo.select('circle') },
      'S1': { label: _this.h1.select('text'), circle: _this.h1.select('circle') },
      'S2': { label: _this.h2.select('text'), circle: _this.h2.select('circle') },
      'C1': { label: _this.m2.select('text'), circle: _this.m2.select('circle') },
      'C2': { label: _this.m1.select('text'), circle: _this.m1.select('circle') }
    };

    var inputEl = document.getElementById('inline-editor');

    var keys = ['P', 'O', 'S1', 'S2', 'C1', 'C2'];

    keys.forEach(function(key) {
      var item = labelsMap[key];
      var storedName = localStorage.getItem('vb-name-' + key);
      var currentName = storedName || defaultNames[key];
      
      // Update SVG natively all'avvio
      var updateSVGText = function(itm, text, isDefault) {
        if (isDefault) {
          itm.label.attr({ text: text, 'font-size': '30', fill: 'none', stroke: '#eeeeee', strokeWidth: '4' });
          itm.circle.attr({ r: 27 });
        } else {
          var newFontSize = '16';
          var newRadius = 27; // Base radius
          
          if (text.length > 4) { newFontSize = '14'; newRadius = 32; }
          if (text.length > 7) { newFontSize = '12'; newRadius = 38; }
          if (text.length > 10) { newFontSize = '10'; newRadius = 45; }
          
          itm.label.attr({ text: text, 'font-size': newFontSize, fill: '#ffffff', stroke: 'none', strokeWidth: '0' });
          itm.circle.attr({ r: newRadius });
        }
      };

      updateSVGText(item, currentName, currentName === defaultNames[key]);

      // Double-click to edit feature
      var groupNode = item.circle.parent(); // Get the SVG Group holding circle+text
      groupNode.dblclick(function() {
        var svgRoot = document.getElementById('vbsvg');
        var container = document.getElementById('diagram-container');
        var pt = svgRoot.createSVGPoint();
        
        // Find screen coordinates of the circle
        var bbox = item.circle.getBBox();
        pt.x = bbox.cx;
        pt.y = bbox.cy;
        var matrix = item.circle.node.getScreenCTM();
        var screenPt = pt.matrixTransform(matrix);
        
        var containerRect = container.getBoundingClientRect();
        
        // Setup input overlay
        inputEl.style.display = 'block';
        inputEl.style.width = '100px';
        inputEl.style.left = (screenPt.x - containerRect.left - 50) + 'px';
        inputEl.style.top = (screenPt.y - containerRect.top - 15) + 'px';
        
        // Grab current value
        var currentValue = localStorage.getItem('vb-name-' + key);
        inputEl.value = currentValue ? currentValue : '';
        inputEl.focus();
        
        // Cleanup routine on save
        var saveEdit = function() {
          var newName = inputEl.value.trim();
          if (newName === '') {
            updateSVGText(item, defaultNames[key], true);
            localStorage.removeItem('vb-name-' + key);
          } else {
            updateSVGText(item, newName, false);
            localStorage.setItem('vb-name-' + key, newName);
          }
          inputEl.style.display = 'none';
          
          // Remove listeners immediately so they don't fire multiple times logic
          inputEl.removeEventListener('blur', blurHandler);
          inputEl.removeEventListener('keydown', keydownHandler);
        };
        
        var blurHandler = function() { saveEdit(); };
        var keydownHandler = function(e) { if (e.key === 'Enter') saveEdit(); };
        
        inputEl.addEventListener('blur', blurHandler);
        inputEl.addEventListener('keydown', keydownHandler);
      });

      // Drag and Drop Feature
      var onmove = function (dx, dy) {
          if (!_this.moving) {
            this.attr({
                transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
            });
          }
      };

      var onstart = function () {
          if (!_this.moving) {
            this.data('origTransform', this.transform().local );
            this.attr({ cursor: "move" });
          }
      };

      var onend = function () {
          if (!_this.moving) {
            this.attr({ cursor: "pointer" });
          }
      };

      groupNode.drag(onmove, onstart, onend);
    });
  }

  function initialisePlayers() {
    _this.setterAt = 2; // Default starting rotation
    if (move(_this.playerOffsetsBase[2], 1)) {
        // Automatically selects Serve/Base layout 
    }
    _this.serveRotation = true;
    _this.currentAction = { type: 'Serve', detail: 'Base' };
  }

  this.setRotation = function(pos) {
    if (pos >= 1 && pos <= 6) {
        _this.setterAt = pos;
        _this.reapplyCurrentAction();
    }
  };

  this.setAction = function(actionType, actionDetail) {
    _this.currentAction = { type: actionType, detail: actionDetail };
    _this.reapplyCurrentAction();
  };

  this.reapplyCurrentAction = function() {
      var pos = _this.setterAt;
      var type = _this.currentAction.type; // 'Serve', 'Receive', 'Defense'
      var detail = _this.currentAction.detail;

      if (type === 'Serve') {
          if (detail === 'Base') { move(_this.playerOffsetsBase[pos], 500); }
          else if (detail === 'Serve') { move(_this.playerOffsetsServeServe[pos], 500); }
          else if (detail === 'Switch') { move(_this.playerOffsetsSwitchServe[pos], 500); }
      } else if (type === 'Receive') {
          if (detail === 'Base') { move(_this.playerOffsetsBase[pos], 500); }
          else if (detail === 'Receive') { move(_this.playerOffsetsReceiveReceive[pos], 500); }
          else if (detail === 'Set') { move(_this.playerOffsetsReceiveSet[pos], 500); }
          else if (detail === 'Hit') { move(_this.playerOffsetsReceiveHit[pos], 500); }
          else if (detail === 'Switch') { move(_this.playerOffsetsSwitchReceive[pos], 500); }
      } else if (type === 'Defense') {
          if (detail === 'Defense4') { move(_this.playerOffsetsDefense4[pos], 500); }
          else if (detail === 'Defense2') { move(_this.playerOffsetsDefense2[pos], 500); }
          else if (detail === 'DefenseCenter') { move(_this.playerOffsetsDefenseCenter[pos], 500); }
      }
  };

  function toggleHighlightPlayer(player) {
    if (_this.highlightedPlayer === 0) {
      _this.highlightedPlayer = player;
      _this.highlightedPlayer.attr({fill: _this.playerColourHighlight});
    }
    else if (_this.highlightedPlayer === player) {
      _this.highlightedPlayer = 0;
      player.attr({fill: _this.playerColour});
    }
    else {
      _this.highlightedPlayer.attr({
        fill: _this.playerColour
      });
      _this.highlightedPlayer = player;
      player.attr({fill: _this.playerColourHighlight});
    }
  }

  function move(players, time) {
    if (_this.moving) {
      return false;
    }
    _this.moving = true;

    _this.setter.animate({ transform:'translate(' + players.s.x + ', ' + players.s.y + ')'}, time, null, donemove);
    _this.oppo.animate({ transform:'translate(' + players.o.x + ', ' + players.o.y + ')'}, time, null, donemove);
    _this.m1.animate({ transform:'translate(' + players.m1.x + ', ' + players.m1.y + ')'}, time, null, donemove);
    _this.m2.animate({ transform:'translate(' + players.m2.x + ', ' + players.m2.y + ')'}, time, null, donemove);
    _this.h1.animate({ transform:'translate(' + players.h1.x + ', ' + players.h1.y + ')'}, time, null, donemove);
    _this.h2.animate({ transform:'translate(' + players.h2.x + ', ' + players.h2.y + ')'}, time, null, donemove);
    return true;
  }
//  function goback() {
//    _this.setter.animate({ transform:'translate(0, 0)'}, 1000, null, donemove);
//  }
  function donemove() {
    _this.moving = false;
  }

  // Privileged methods
  this.setErrorHandler = function(handler) {
    errorHandler.call(this, handler);
  };

  this.createSVG = function(options) {
    return createSVGDoc.call(this, options);
  };

  this.draw = function() {
    return draw.call(this);
  };
}
