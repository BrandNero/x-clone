/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
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
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweetEntry = createTweetElement(tweet);
      $("#tweets-box").prepend($tweetEntry);
    }
  };
  // create the tweets box
  const createTweetElement = function(tweet) {
    // Article creation
    const $tweet = (`
    <section class="tweets-box">
    <article class="tweet">
    <div class="profile">
    <div class="name-handles">
    <img src="${tweet.user.avatars}">
    <span class="tweet-user-name">${tweet.user.name}</span>           
    </div>
    <span>${tweet.user.handle}</span>
    </div>
    <div class="tweet-content">
    ${tweet.content.text}
        </div>
        <footer>
        <span class="tweet-symbols">
        <i class="fas fa-heart"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-share"></i>
        </span>
        <span class="timestamp">${tweet.created_at}</span>
        </footer>
        </article>
        </section>
        `);
    return $tweet;
  };
  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    console.log("form submitted");
    const formData = $(this).serialize();
    console.log(formData);
  });
  renderTweets(data);
});