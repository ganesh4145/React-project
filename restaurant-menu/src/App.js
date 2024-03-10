import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';

function App() {
  const menuList=[
    {id:1, item:"Idli or idly", description:"Idli or idly is a type of savoury rice cake, originating from South India, popular as a breakfast food in Southern India and in Sri Lanka. The cakes are made by steaming a batter consisting of fermented black lentils and rice", categoty:"Main Course",availability : {BreakFast:"Yes",Lunch:"No",Dinner:"Yes"}, imagesrc:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {id:2, item:"Dosa", description:"A dosa is a thin savory crepe in South Indian cuisine made from a fermented batter of ground black gram and rice. Dosas are served hot, often with chutney and sambar. Dosas are popular in South Asia as well as around the world", categoty:"Main Course",availability : {BreakFast:"Yes",Lunch:"Yes",Dinner:"Yes"}, imagesrc:"https://t3.ftcdn.net/jpg/01/86/33/72/240_F_186337209_9rbcMLu3wGCDNaEoK1jO0aNzb0pv7Xs7.jpg"},
    {id:3, item:"Medu Vada", description:"Medu vada is a South Indian breakfast snack made from Vigna mungo. It is usually made in a doughnut shape, with a crispy exterior and soft interior. A popular food item in South Indian cuisine it is generally eaten as a breakfast or a snack", categoty:"Snack",availability : {BreakFast:"Yes",Lunch:"No",Dinner:"No"}, imagesrc:"https://www.shutterstock.com/image-photo/vada-medu-vadai-sambar-popular-260nw-400811605.jpg"},
    {id:4, item:"Ven Pongal", description:"Pongal is a South Indian and Sri Lankan dish of rice cooked in boiling milk. Its preparation is the main custom associated with the Pongal festival. It is also eaten as a breakfast food. A part of Tamil cuisine, varieties include venn pongal, sakkarai pongal, kozhi pongal, and sanyasi pongal", categoty:"Main Course",availability : {BreakFast:"Yes",Lunch:"No",Dinner:"No"}, imagesrc:"https://t4.ftcdn.net/jpg/04/79/98/13/240_F_479981398_SoHMuDID5KW1giunWjNwlg1QSS3R5n0F.jpg"},
    {id:5, item:"Meals", description:"South Indian meals feature aromatic rice, served with sambar (lentil stew) and rasam (tangy soup). Coconut chutney accompanies dishes like idli and dosa. Curries, often coconut-based, add rich flavors. Sweets like Mysore pak and payasam are enjoyed. Buttermilk aids digestion. The cuisine reflects a diverse and vibrant culinary tradition.",categoty:"Main Course",availability : {BreakFast:"No",Lunch:"Yes",Dinner:"No"}, imagesrc:"https://5.imimg.com/data5/MG/PO/GLADMIN-28873754/full-plate-meals-500x500.png"}
  ]
    return (
    <div>
      
      <Home menuList={menuList}/>
    </div>
  );
}

export default App;
