var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCat');
var productDesc = document.getElementById('productDesc');
var AddBtn = document.getElementById('AddBtn')
var updateBtn = document.getElementById('updateBtn')

var productsList;

if(localStorage.getItem('products') === null){
    productsList = [];
}else{
    productsList = JSON.parse(localStorage.getItem('products'));
    displayProducts(productsList);
}


function addToLocalStorage(){
    localStorage.setItem("products" , JSON.stringify(productsList));
}


class Product {
    constructor(name, price, category, Desc) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.Desc = Desc;
    }
}

function AddProduct(){
  

    if(ValidateNameInput() && ValidatePriceInput() && ValidateCategoryInput() && ValidateDescriptionInput()){

        // var product = {
        //     name : productName.value ,
        //     price : productPrice.value ,
        //     category : productCategory.value ,
        //     Desc : productDesc.value ,
        // }

        let product = new Product(productName.value,productPrice.value,productCategory.value , productDesc.value)
        productsList.push(product);
        // localStorage.setItem("products" , JSON.stringify(productsList));
        addToLocalStorage()
        displayProducts(productsList);
        // ClearForm();
        updateFormValues();
    }

   

};


function displayProducts(list){
    var cartona = '';

    for(var i = 0 ; i<list.length ; i++){
        cartona += `<tr>
                        <td>${i+1}</td>
                        <td>${list[i].name}</td>
                        <td>${list[i].price}</td>
                        <td>${list[i].category}</td>
                        <td>${list[i].Desc}</td>
                        <td><button class="btn btn-warning btn-sm " onclick="getProdectToUpdate(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                        <td><button class="btn btn-danger  btn-sm " onclick="DeleteProduct(${i})"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>`
    }


    document.getElementById('body').innerHTML=cartona;
};


// function ClearForm(){
//     productName.value="";
//     productPrice.value="";
//     productCategory.value="";
//     productDesc.value="";

// };


function DeleteProduct(index){

    productsList.splice(index,1);
    // localStorage.setItem("products",JSON.stringify(productsList));
    addToLocalStorage();
    displayProducts(productsList);
};


function SearchProduct(searchWord){

    var foundedItems = [];
    for(var i = 0 ; i<productsList.length ; i++){
        if(productsList[i].name.toLowerCase().startsWith(searchWord.toLowerCase())){
            foundedItems.push(productsList[i])
        }
    }

    displayProducts(foundedItems)
}


var index ;
function getProdectToUpdate(indexOf){
   AddBtn.classList.replace('d-block' ,'d-none');
   updateBtn.classList.replace('d-none' ,'d-block'); 
   
   index = indexOf ; 
//    productName.value = productsList[indexOf].name;
//    productPrice.value = productsList[indexOf].price;
//    productCategory.value = productsList[indexOf].category;
//    productDesc.value = productsList[indexOf].Desc
   
   updateFormValues(productsList[indexOf]); 
}


function updateFormValues(flag){

    productName.value = flag? flag.name : "";
    productPrice.value = flag? flag.price : "";
    productCategory.value = flag? flag.category : "";
    productDesc.value = flag? flag.Desc : "";


}





function updateProduct(){
    updateBtn.classList.replace('d-block' ,'d-none');
    AddBtn.classList.replace('d-none' ,'d-block'); 

    productsList[index].name =  productName.value ;
    productsList[index].price = productPrice.value ;
    productsList[index].category = productCategory.value ;
    productsList[index].Desc = productDesc.value ; 

    productsList.splice(index , 1 , productsList[index])
    // localStorage.setItem("products" , JSON.stringify(productsList))
    addToLocalStorage();
    // ClearForm();
    updateFormValues();
    displayProducts(productsList);
}

function ValidateNameInput(){
    var regex = /^[A-Za-z]{1,20}[0-9]{0,5}$/;

    if(regex.test(productName.value) == true ){
        console.log('name true')
        document.getElementById('nameAlert').classList.replace('d-block' , 'd-none')
        return true ;
        

    }else{
        console.log('name false')

        document.getElementById('nameAlert').classList.replace('d-none' , 'd-block')
        return false ;
       
    }

    // return regex.test(productName.value) ;
}




function ValidatePriceInput(){
    var regex = /^[1-9][0-9]{3,5}$/
    
    if(regex.test(productPrice.value) == true){
        console.log('price true')

        document.getElementById('priceAlert').classList.replace('d-block' , 'd-none')
        return true ;
       

    }else{
        console.log('price false')

        document.getElementById('priceAlert').classList.replace('d-none' , 'd-block')
        return false ;
       

    }

}


function ValidateCategoryInput(){
    var regex = /mobile|tv|laptop/i

    if(regex.test(productCategory.value) == true){
        console.log('Cats true')

        document.getElementById('catsAlert').classList.replace('d-block' , 'd-none')

        return true
    }else{
        console.log('Cats false')

        document.getElementById('catsAlert').classList.replace('d-none' , 'd-block')

        return false
    }
}


function ValidateDescriptionInput(){
    var regex = /[a-zA-Z]{1,250}/

    if (regex.test(productDesc.value) == true){
        console.log('Desc true')

        document.getElementById('DescAlert').classList.replace('d-block' , 'd-none')

        return true ;
    }else{
        console.log('Desc false')

        document.getElementById('DescAlert').classList.replace('d-none' , 'd-block')

        return false ;
    }
}
