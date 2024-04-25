/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const escapeHTML = function(str) {
    // Uses the replace method on the string to search for special HTML characters
    // The /[&<>"']/g is a regular expression that matches characters that need escaping in HTML
    return str.replace(/[&<>"']/g, function(match) {

      switch (match) { // will replace character with it's HTML equivalent
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return match;
      }
    });
  };
  // create the tweets box
  const createTweetElement = function(data) {
    // Article creation
    const timeAgo = timeago.format(data.created_at);
    const $tweet = $(`
    <article class="tweet">
      <div class="profile">
      <div class="name-handles">
      <img src="${escapeHTML(data.user.avatars)}">
          <span class="tweet-user-name">${escapeHTML(data.user.name)}</span>           
          </div>
        <span>${escapeHTML(data.user.handle)}</span>
      </div>
        <div class="tweet-content">
        ${escapeHTML(data.content.text)}
        </div>
        <footer>
          <span class="tweet-symbols">
            <i class="fas fa-heart"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-share"></i>
          </span>
        <span class="timestamp">${timeAgo}</span>
        </footer>
        </article>
        `);
    return $tweet;
  };
  const $tweetJQueryObject = $($tweet);
  $tweetJQueryObject.find('.tweet-handle').text(data.user.handle);
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweetEntry = createTweetElement(tweet);
      $('.tweets-box').prepend($tweetEntry);
    }
  };
  const isTweetValid = (tweetText) => {
    if (tweetText.length === 0) {
      error.text('No content submitted');
      return false;
    } else if (tweetText.length > 140) {
      error.text('Tweet is too long');
      return false;
    }
    return true;
  };
  
  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const tweetText = $(this).find("textarea").val().trim();
    if (isTweetValid(tweetText)) {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: formData,
        success: () => {
          $(this).find("textarea").val('');
          $(this).find(".counter").text(140);
          loadTweets();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  });
  
  const loadTweets = function() {
    $('.tweets-box').empty();
    $.ajax({
      method: "get",
      url: "/tweets",
      success: function(data) {
        renderTweets(data);
        console.log('Tweet loading!',data);
      },
      error: function(error) {
        console.log('error', error);
      }
    });
  };
  loadTweets();
});
