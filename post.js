/*bm*/

var limitBookmark = 100;
var bookmark = (function(){
list = [];

//Structure Push to Object New Item
function Item(id,name,status,type,link,img){
	this.id = id;
	this.name = name;
    this.status = status;
	this.type = type;
    this.link = link;
	this.img = img;
}

//Event Saving to Local Storage
function setBookmark(){
	localStorage.setItem('bookmark', JSON.stringify(list));
}

function loadBookmark() {
    list = JSON.parse(localStorage.getItem('bookmark'));
}

if (localStorage.getItem("bookmark") != null) {
    loadBookmark();
}

obj = {};
//Add New Item Object to Array
obj.addItemTobookmark = function(id,name,status,type,link,img) {
    var item = new Item(id,name,status,type,link,img),
    itemList = list;
    if(itemList != null){
    same = itemList.find(item =>{return item.id == id;});
    if(list.length<limitBookmark){
     if(!same){
    	list.push(item);
    	setBookmark();
      }
     }
    }else{
    	list.push(item);
    	setBookmark();
    }
}

//Remove Bookmark    
obj.removeThisItem = function(id) {
    for(var item in list) {
      if(list[item].id === id) {
        list.splice(item, 1);
        break;
      }
    }
    setBookmark();
  }
  
  return obj;
})();

$('.bookmark').each(function(event) {
const getData = JSON.parse(localStorage.getItem('bookmark'));
for(var i in getData){
	if(getData[i].id == $(this).data('id')){
     $(this).html('Bookmarked')
     $(this).addClass('bookmarked')
    }
}
  $(this).click(function(){
const list = JSON.parse(localStorage.getItem('bookmark'));
  //Retrieve Data From Post
  	const id = $(this).data('id'),
  	name = $('.info .title').text().replace('\n',''),
    link = location.protocol + '//' + location.hostname +  location.pathname,
    img = $('#info .thumb div img').attr('src'),
    status = $('.meta .status span').text().replace('\n',''),
    type = $('.meta .type span a').text().replace('\n','');
    
  //Set To Function Bookmark
if(list == null){
  if(!$(this).hasClass('bookmarked')){
    	bookmark.addItemTobookmark(id,name,status,type,link,img);
  		$(this).addClass('bookmarked')
  		$(this).html('Bookmarked')
  }else{
  	bookmark.removeThisItem(id);
  	$(this).html('Bookmark')
  	$(this).removeClass('bookmarked')
  }
}else{
  if(!$(this).hasClass('bookmarked')){
if(list.length<limitBookmark){
    	bookmark.addItemTobookmark(id,name,status,type,link,img);
  		$(this).addClass('bookmarked')
  		$(this).html('Bookmarked')
}
  }else{
  	bookmark.removeThisItem(id);
  	$(this).html('Bookmark ')
  	$(this).removeClass('bookmarked')
  }
}
displayNum();
  })
});

/*1*/

function openTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

/*2*/
document.getElementById('syn-target').appendChild(
    document.getElementById('synopsis')

/*3*/
document.getElementById('extra-target').appendChild(
    document.getElementById('extra-info')

/*play*/
(function () {
  const e = document.querySelectorAll(".DagPlayOpt");
  e.length > 0 && (e.forEach(t => {
    t.addEventListener("click", function (t) {
      const n = t.currentTarget,
        c = n.dataset.embed;
      document.querySelector("#pembed iframe").src = c, document.querySelector("#pembed iframe").contentWindow.location.replace(c), e.forEach(e => e.classList.remove("on")), n.classList.add("on");
      const o = document.querySelectorAll(".resIn");
      o.length > 0 && o.forEach(e => {
        e.id == n.dataset.id ? e.style.display = "block" : e.style.display = "none"
      })
    })
  }), e[0].click());
  const t = document.getElementById("shadow"),
    n = document.querySelector(".DagLight");
  t && n && (t.style.display = "none", n.addEventListener("click", function (e) {
    const n = e.currentTarget;
    t.style.height = document.body.scrollHeight, "none" == t.style.display ? (n.querySelector("span").innerHTML = "Turn on Light", n.classList.add("turnedOff"), t.style.display = "block") : (n.querySelector("span").innerHTML = "Turn off Light", n.classList.remove("turnedOff"), t.style.display = "none")
  }));
  const c = document.querySelector(".DagShre");
  c.addEventListener("click", function (e) {
    const t = document.querySelector(".gta-ms");
    t && t.classList.toggle("expand")
  })
})();

  function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("serverEpisode");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("serverOpen").click();
