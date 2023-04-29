
const getData = async (page) => {
  const details = await page.evaluate((()=> Array.from(document.querySelectorAll('.ty-catPage-products .ty-catPage-product-list .ty-catPage-productListItem') , (e , index)=>{
    const data = e.querySelector('a .ty-productBlock-wrap .ty-productBlock .ty-productBlock-content')
    const productTitle = data.querySelector('.ty-productBlock-title h1').innerText
    const productLink = e.querySelector('a').href
    const price = data.querySelector('.ty-productBlock-price h2').innerText

    return({
      id:index+1,
      Title:productTitle,
      Price:price,
      Link:productLink,
    })

    
  })))
  return details
}

module.exports = getData;