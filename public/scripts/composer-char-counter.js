$(document).ready(() => {
  const maxChar = 140;

  $("#tweet-text").on("input", function() {
    // Number of characters
    const charsLength = this.value.length;
    // gets current characters in text
    const characters = maxChar - charsLength;

    // Find the counter element in html side
    const counterRef = $(this).closest("form").find(".counter");
    counterRef.text(characters);

    //turn red when going over 140 charachters
    if (characters < 0) {
      counterRef.addClass('overCount');
    } else {
      counterRef.removeClass('overCount');
    }
  });
});