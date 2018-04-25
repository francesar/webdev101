const getMemes = () => {
  axios.get('https://api.imgflip.com/get_memes')
    .then(res => {
      const { memes } = res.data.data;

      // imgflip api says that we get the 100 most spicy memes back
      console.log(memes);

      // Map over these bad boys
      memes.map((meme, i) => {
        if(i % 10 === 0) {
          // Build a meme and show on page for every 10th spicy boy
          buildMeme(meme);
        }
      })
    })
};

const buildMeme = meme => {
  const {name, url, id} = meme;

  // Use Jquery to build html wrapper dom elememt
  let wrapper = $('<div></div>');
  
  // Build Img tag
  let memeContainer = $('<img></img>');
  // set the imgs source to the url that imgflip gave us
  memeContainer.attr('src', url);
  memeContainer.attr('width', 250);
  memeContainer.attr('height', 250);

  // Add the id for the image (hella sus)
  let idContainer = $('<p></p>');
  idContainer.text(id);

  // Show in front end!
  idContainer.appendTo(wrapper);
  memeContainer.appendTo(wrapper);
  wrapper.appendTo('#memes');
}

const createMeme = () => {
  const text0 = $('#text0').val();
  const text1 = $('#text1').val();
  const template_id = $('#memeId').val();

  console.log(text0, text1, template_id);

  axios.post('http://localhost:8000/meme', {template_id, text0, text1})
    .then(res => {
      const { url } = res.data.data;
      console.log(url)
      let newMeme = $('<img></img>');
      newMeme.attr('src', url);
      console.log(newMeme);
      newMeme.appendTo('#generatedMeme');
      getMemes();
    })
}

$(document).ready(() => {
  getMemes();
})