/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  // create the tweets box
  const createTweetElement = function(data) {
    // Article creation
    const timeAgo = timeago.format(data.created_at);
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
        <span class="timestamp">${timeAgo}</span>
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
  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    console.log("form submitted");
    const formData = $(this).serialize();
    console.log(formData);
  });
  
  const loadTweets = function() {
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