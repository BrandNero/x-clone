/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];
$(() => {
  
  // create the tweets box
  const createTweetElement = function(data) {
    // Article creation

    const $tweet = `
    <article class="tweet">
      <div class="profile">
      <div class="name-handles">
      <img src="${data.user.avatars}">
          <span class="tweet-user-name">${data.user.name}</span>           
          </div>
        <span>${data.user.handle}</span>
      </div>
        <div class="tweet-content">
        ${data.content.text}
        </div>
        <footer>
          <span class="tweet-symbols">
            <i class="fas fa-heart"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-share"></i>
          </span>
        <span class="timestamp">${data.created_at}</span>
        </footer>
        </article>
        `;
    return $tweet;
  };
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweetEntry = createTweetElement(tweet);
      $('.tweets-box').prepend($tweetEntry);
    }
  };
  renderTweets(data);
  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    console.log("form submitted");
    const formData = $(this).serialize();
    console.log(formData);
  });
  
  const loadTweets = function() {
    
  };
});