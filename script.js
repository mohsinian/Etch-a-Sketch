//this function was called to make the color darker(start)

const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

//this part was used to make the color darker(end)

var runOnce = true;
var colorFlag=false;
function getNumber() {
    var totalBox = document.querySelector("#getNumber").value;
    const rainbow = document.querySelector("#rainbow");
    const black = document.querySelector("#black");
    rainbow.addEventListener('click',()=>{
        colorFlag=true;
        rainbow.style.background="cornflowerblue"
        black.style.background="white";
    })
    black.addEventListener('click',()=>{
        colorFlag=false;
        black.style.background="cornflowerblue";
        rainbow.style.background="white";
    })
    if(runOnce) createGrid(totalBox,colorFlag);
}

function createGrid(totalBox) {
    runOnce=false;
    if(totalBox>100) totalBox=100;
if(totalBox<1) totalBox=1;
const grid = document.querySelector(".grid");
for(let i =0;i<totalBox;i++)
{
const row = document.createElement("div");
for(let j=0;j<totalBox;j++)
{
const square = document.createElement('div');
square.className ="miniBox";
let a = Math.round(960/totalBox);
square.style.height=""+a+"px";
square.style.width=""+a+"px";
square.style.background="azure";
square.style.borderStyle="double";
square.style.borderColor="cyan"
square.style.borderWidth ="0.01em";
row.append(square);
}
grid.append(row);
}
const miniBox = document.querySelectorAll(".miniBox");
miniBox.forEach(box=>{
    box.addEventListener('mouseover',()=>{
        if(!colorFlag)
        {
            if(box.style.background==="azure")
        {
            box.style.background="rgb(150,150,150)";
        }
        else
        {
            box.style.background=pSBC(-0.1,box.style.background);
        }
        }

        else
        {
            if(box.style.background==="azure")
            {
                let a = Math.floor(Math.random()*256);
                let b = Math.floor(Math.random()*256);
                let c = Math.floor(Math.random()*256);
                box.style.background = "rgb("+a+","+b+","+c+")";
            }
            else {
                box.style.background=pSBC(-0.1,box.style.background);
            }
        }

    })
})
}

