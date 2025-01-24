const authEle = {
  loginForm: document.querySelector("#login"),
  nameInput: document.querySelector("#name"),
  passwordInput: document.querySelector("#password"),
  nameArea: document.querySelector(".name-warning"),
  passArea: document.querySelector(".pass-warning"),
};

const mainEle = {
  tweetsArea: document.querySelector(".tweets-area"),
  logoutBtn: document.querySelector("#logout-btn"),
  userInfo: document.querySelector(".user-info"),
  main: document.querySelector("main"),
};

// Tweet içeriğindeki media'yı renderlayan fonksiyon

const getMedia = (media) => {
  // Fotoğraf

  if (media.photo) {
    return `<img src='${media.photo[0].media_url_https}' />`;
  }

  // Video
  if (media.video) {
    const filtredVideo = media.video[0].variants.filter(
      (item) => item.content_type === "video/mp4"
    );

    return `<video src='${filtredVideo[0].url} '></video>`;
  }

  // Ne fotoğraf ne video ise
  return "";
};

// Kullanıcı Tweetlerine göre renderlama yapan fonksiyon
const renderTimeline = (tweets, outlet, user) => {
  // Tweeet dizisini dön ve html oluştur
  let timelineHtml = tweets
    .map(
      (tweet) => `<div class="tweet">
          <div class="body">
            <div class="user">
              <img class="user-image" src="${user.avatar}" />
              <div class="info">
                <h3>${user.name}</h3>
                <p>@${user.profile}</p>
                <p class='tweet-time'>${moment(tweet.created_at).fromNow()} </p>
              </div>
              <i class="bi bi-three-dots"></i>
            </div>
            <a href='?status/${user.profile}#${tweet.tweet_id}' class="content">
              <p>
               ${tweet.text}
              </p>
             ${getMedia(tweet.media)}
            </a>
            <div class="buttons">
              <button><i class="bi bi-chat"></i><span>${
                tweet.replies
              }</span></button>
              <button><i class="bi bi-recycle"></i><span>${
                tweet.retweets
              }</span></button>
              <button><i class="bi bi-heart"></i><span>${
                tweet.favorites
              }</span></button>
              <button><i class="bi bi-bookmark"></i><span>${
                tweet.bookmarks
              }</span></button>
            </div>
          </div>
        </div>`
    )
    .join("");

  // Oluşturulan Html'i arayüze aktar
  outlet.innerHTML = timelineHtml;
};

// Kullanıcı verileri kısmını dinamik şekilde renderlayan fonskiyon
const renderUserInfo = (user) => {
  mainEle.userInfo.innerHTML = `  <img
          src="${user.avatar}"
          alt="user-image"
          id="user-img"
        />
        <div>
          <p id="user-name">${user.name}</p>
          <p id="user-tagname">@${user.profile}</p>
          <button id="logout-btn">
            <i class="bi bi-door-open-fill"></i>
            <span>Çıkış yap</span>
          </button>
        </div>`;
};

// Tweet detay sayfasını renderlayan fonksiyon

const renderInfo = (info, userName) => {
  console.log(info);
  console.log(userName);

  const html = `
  
  <div class='info-area'>
  
  <div class='top'>
   <i class="bi bi-arrow-left-short"></i>
   <h3>Gönderi</h3>
  </div>


  <div class='tweet-info'>
  <div class='user'>
  
  <div class='info'>
  <img src='${info.author.image}'/>

  <h3>${info.author.name}</h3>
  <p>@${info.author.screen_name}</p>
  </div>

  <button>Abone Ol</button>
  
  </div>

  <div class='content'>
  <p>${info.text}</p>
  </div>

  <div class='data'>
  
  <p>
   <span class='count'>${info.retweets}</span>
   <span>Yeniden Gönderi</span>
  </p>

    <p>
   <span class='count'>${info.quotes}</span>
   <span>Alıntılar</span>
  </p>

    <p>
   <span class='count'>${info.likes}</span>
   <span>Beğeni</span>
  </p>


    <p>
   <span class='count'>${info.bookmarks}</span>
   <span>Yer İşareti</span>
  </p>
  
  
  </div>

 <div class="buttons">


              <button><i class="bi bi-chat"></i><span>${info.quotes}</span></button>
              <button><i class="bi bi-recycle"></i><span>${info.retweets}</span></button>
              <button><i class="bi bi-heart"></i><span>${info.likes}</span></button>
              <button><i class="bi bi-bookmark"></i><span>${info.bookmarks}</span></button>
   </div>


  
  
  </div>
  </div>
  
  
  `;

  mainEle.main.innerHTML = html;
};

export { authEle, mainEle, renderTimeline, renderUserInfo, renderInfo };
