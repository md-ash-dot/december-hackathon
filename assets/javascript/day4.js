// Immediately invoked function expression
// to not pollute the global scope
(function() {
    const wheel = document.querySelector('.wheel');
    const startButton = document.querySelector('.button');
    const display = document.querySelector('.display');
    
    let deg = 0;
    let zoneSize = 45; // deg
  
    // Counter clockwise
  
    var symbolSegments = {
      1: "assets/images/day4/cards/card1.png",
      2: "assets/images/day4/cards/card2.png",
      3: "assets/images/day4/cards/card3.png",
      4: "assets/images/day4/cards/card4.png",
      5: "assets/images/day4/cards/card5.png",
      6: "assets/images/day4/cards/card6.png",
      7: "assets/images/day4/cards/card7.png",
      8: "assets/images/day4/cards/card8.png",
    }
  
  
    const handleWin = (actualDeg) => {
      const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
      display.innerHTML =  '<img src="'+symbolSegments[winningSymbolNr]+'" class="card" alt="card" />' ;
    }
  
    startButton.addEventListener('click', () => {
      // Reset display
      display.innerHTML = "-";
      // Disable button during spin
      startButton.style.pointerEvents = 'none';
      // Calculate a new rotation between 5000 and 10 000
      deg = Math.floor(5000 + Math.random() * 5000);
      // Set the transition on the wheel
      wheel.style.transition = 'all 10s ease-out';
      // Rotate the wheel
      wheel.style.transform = `rotate(${deg}deg)`;
      // Apply the blur
      wheel.classList.add('blur');
    });
  
    wheel.addEventListener('transitionend', () => {
      // Remove blur
      wheel.classList.remove('blur');
      // Enable button when spin is over
      startButton.style.pointerEvents = 'auto';
      // Need to set transition to none as we want to rotate instantly
      wheel.style.transition = 'none';
      // Calculate degree on a 360 degree basis to get the "natural" real rotation
      // Important because we want to start the next spin from that one
      // Use modulus to get the rest value
      const actualDeg = deg % 360;
      // Set the real rotation instantly without animation
      wheel.style.transform = `rotate(${actualDeg}deg)`;
      // Calculate and display the winning symbol
      handleWin(actualDeg);
    });
  
    
    
  })();  