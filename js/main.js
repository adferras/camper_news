$(document).ready(function() {
  daysOfPosts();

  //get stories
  var storiesUrl = 'http://www.freecodecamp.com/news/hot';
  $.get(storiesUrl, function(stories) {
    stories.forEach(function(story) {
      var headline = story.headline;
      var timePosted = 'Posted on: ' + (new Date(story.timePosted).toUTCString().substring(0, 14));
      var link = story.link;
      var metaDescription = story.metaDescription;
      var description = story.description;
      var rank = story.rank;
      var authorAvatar = story.author.picture;
      var authorName = story.author.username;
      var storyLink = story.storyLink;

      assembleStory(headline, timePosted, link, rank, authorAvatar, authorName, storyLink);
    });
  });

  //assemble stories
  function assembleStory(headline, timePosted, link, rank, authorAvatar, authorName, storyLink) {
    var baseUrl = 'http://www.freecodecamp.com/';
    var authorLink = baseUrl + authorName;
    var discussionLink = baseUrl + 'news/'+ storyLink.replace(/\s/g,'-');

    //create new elements for the story
    var divPost = document.createElement('div');
    divPost.className = 'post';

    var divAuthor = document.createElement('div');
    divAuthor.className = 'author';

    var imgAuthor = document.createElement('img');
    imgAuthor.className = 'authorAvatar';
    imgAuthor.setAttribute('src', authorAvatar);

    var aStory = document.createElement('a');
      aStory.setAttribute('href', link);

    var divPostDesc = document.createElement('div');
    divPostDesc.className = 'post-description';

    var divHeadline = document.createElement('div');
    divHeadline.className = 'headline';

    var pHeadline = document.createElement('p');
    pHeadline.className = "text-left";

    var aHeadlineLink = document.createElement('a');
    aHeadlineLink.setAttribute('href', link);
    aHeadlineLink.className = 'headline-text';
    aHeadlineLink.appendChild(document.createTextNode(headline.substring(0,30) + '...'));

    var pAuthorName = document.createElement('p');
    pAuthorName.className = "text-left";

    var aAuthorLink = document.createElement('a');
    aAuthorLink.setAttribute('href', authorLink);
    aAuthorLink.appendChild(document.createTextNode('by - ' + authorName));

    var divInfo = document.createElement('div');
    divInfo.className = 'info';

    var divInfoLinks = document.createElement('div');
    divInfoLinks.className = 'info-links';

    var pUpvotes = document.createElement('p');
    pUpvotes.className = 'text-left fa fa-heart';
    pUpvotes.appendChild(document.createTextNode(' ' + rank));

    var aDiscuss = document.createElement('a');
    aDiscuss.setAttribute('href', discussionLink);
    aDiscuss.className = 'text-right btn btn-info btn-xs';
    aDiscuss.appendChild(document.createTextNode('Discuss'));

    var pPosted = document.createElement('p');
    pPosted.appendChild(document.createTextNode(timePosted));
    pPosted.className = 'text-left date-posted';

    //append the new elements
    divPost.appendChild(divAuthor);
      divAuthor.appendChild(aStory);
        aStory.appendChild(imgAuthor);

    divPost.appendChild(divPostDesc);
      divPostDesc.appendChild(divHeadline);
        divHeadline.appendChild(pHeadline);
          pHeadline.appendChild(aHeadlineLink);
        divHeadline.appendChild(pAuthorName);
          pAuthorName.appendChild(aAuthorLink);
      divPostDesc.appendChild(divInfo);
        divInfo.appendChild(pUpvotes);
        divInfo.appendChild(aDiscuss);
      divPostDesc.appendChild(pPosted);

    //add the elements to the html
    $("#posts").append(divPost);
  }

  //calculate how many days of posts
  function daysOfPosts() {
    console.log('calcing days');
    var createdAt = new Date('12/21/2015');
    var today = new Date();

    var days = Math.round((today-createdAt)/(1000*60*60*24));

    $('#postedSince').append('<p>Created ' + days + ' days ago since ' + createdAt.toString().slice(0, 15) + '</p>');
  }
})
