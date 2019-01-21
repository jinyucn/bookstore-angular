var itemsArray=[{id:1,title:"item1",price:100},{id:2,title:"item2",price:200}]

function updateView()
{
  var root=document.getElementById("root");
  root.innerHTML="";
  var prefab=document.getElementById("itemPrefab");
  var index=0;
  for(var item in itemsArray)
  {
    var newItem=prefab.cloneNode(true);
    newItem.style.display="block";
    var itemInfo=itemsArray[index];
    document.getElementsByName("title")[index].value=itemInfo.title;
    document.getElementsByName("price")[index].value=itemInfo.price;
    document.getElementsByName("imageShow")[index].src=itemInfo.picFilename;
    document.getElementsByName("id")[index].src=itemInfo.id;
    document.getElementsByName("shopId")[index].src=itemInfo.shopId;
    document.getElementsByName("picFilename")[index].src=itemInfo.picFilename;
    index++;
    root.append(newItem);
  }

}

function getItemIndex(targetItem)
{
  var items=document.getElementsByName("item");
  for(var i=0;i<items.length;i++)
  {
    if(items[i]==targetItem)
    {
      alert("index is:"+i);
      return i;
    }
  }
}
function changeItemEditState(targetItem,state)
{
  var divs= targetItem.getElementsByTagName("DIV");
  var titleNode=divs[0].getElementsByTagName("INPUT")[0];
  titleNode.readOnly=!state;
  var priceNode=divs[1].getElementsByTagName("INPUT")[0];
  priceNode.readOnly=!state;
  var fileNode=divs[2];
  fileNode.style.display=state?"block":"none";
  var modifyBtn=divs[3].getElementsByTagName("BUTTON")[0];
  modifyBtn.innerHTML=state?"Submit":"Modify";
}

function onModifyBtnClick(btn)
{
  var item=btn.parentNode.parentNode;
  var innerHtml=btn.innerHTML;
  var canSubmit=innerHtml.trim()=="Submit".trim();
  if(!canSubmit)
    changeItemEditState(item,true);
  else
  {
    changeItemEditState(item,false);
    //进行提交处理
    var divs= item.getElementsByTagName("DIV");
    var titleNode=divs[0].getElementsByTagName("INPUT")[0];
    var titleVal=titleNode.value;
    var priceNode=divs[1].getElementsByTagName("INPUT")[0];
    var priceVal=priceNode.value;
    var idNode=divs[4].getElementsByTagName("INPUT")[0];
    var idVal=idNode.value;
    var picFilenameNode=divs[4].getElementsByTagName("INPUT")[1];
    var picFilenameVal=picFilenameNode.value;

    alert("onModifyClick"+idVal+"-"+titleVal+"-"+priceVal+"-"+picFilenameVal);
    document.getElementById("mark_id").value=idVal;
    document.getElementById("mark_title").value=titleVal;
    document.getElementById("mark_price").value=priceVal;
    document.getElementById("mark_picFilename").value=picFilenameVal;
    document.getElementById("mark_modify").click();
  }
}
function onDeleteBtnClick(btn)
{
  var root=document.getElementById("root");
  var item=btn.parentNode.parentNode;
  root.removeChild(item);
}
function parseResData()
{
  var val=document.getElementById("resData").value;
  var itemVals=val.split('-');
  itemsArray=[];
  for(var i=0;i<itemVals.length-1;i++)
  {
    var attribVals=itemVals[i].split(',');
    var item={id:attribVals[0],shopId:attribVals[1],title:attribVals[2],price:attribVals[3],picFilename:attribVals[4]};
    itemsArray.push(item);
  }
  updateView();
}
