const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(element => {
    sum += element.likes
  });
  return sum

}
const favoriteBlog = (blogs) => {
  let mx = -1
  blogs.forEach(element => {
    
    if(mx === -1 || mx < element.likes)
      mx = element.likes
  });
  let ret = -1
  blogs.forEach(element => {
    if(mx === element.likes){
      console.log("max ", mx, element.likes)
      ret =
        {
          title: element.title,
          author: element.author,
          likes: element.likes
        }
      
    }
  });
  return ret
}
module.exports = {
  totalLikes,
  dummy,
  favoriteBlog
}