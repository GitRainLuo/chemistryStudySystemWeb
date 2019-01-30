<template>
    <div>
        <Button @click="test">test</Button>
    </div>
</template>

<script>
    import {ajax} from "../http/ajax"
    export default{
        name:"Home",
        data () {
            return {msg: '这个是首页'}
        },
        mounted(){
//              this.test()
          let param = {
              openId:"wx13256",
              cardType:"beforeShare"
          }
          let enCode = window.btoa(JSON.stringify(param))
          let deCode = window.atob(enCode)
          console.log("加密:"+enCode+"-------"+"解密:"+JSON.stringify(deCode))
//          let Base64 = {
//            encode(str) {
//              // first we use encodeURIComponent to get percent-encoded UTF-8,
//              // then we convert the percent encodings into raw bytes which
//              // can be fed into btoa.
//              return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
//                function toSolidBytes(match, p1) {
//                  return String.fromCharCode('0x' + p1);
//                }));
//            },
//            decode(str) {
//              // Going backwards: from bytestream, to percent-encoding, to original string.
//              return decodeURIComponent(atob(str).split('').map(function (c) {
//                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//              }).join(''));
//            }
//          };
//
//          let encoded = Base64.encode(JSON.stringify(param));
//          let decoded = Base64.decode(encoded); //
//          alert("加密后:"+encoded)
//          alert("解密后:"+JSON.stringify(decoded))
        },
        methods:{
            test(){
//                let xl=new XMLHttpRequest();
//                xl.open("GET","http://127.0.0.1:8080/findAll",true);
//                xl.onreadystatechange=function () {
//                  if(xl.readyState==4 && xl.status==200){
//                      console.log(xl.responseText);
//                  }
//                }
//                xl.send()
//                return;
                  ajax.get("/helloWord").then((res)=>{
                    alert("success")
                    alert(JSON.stringify(res))
                  }).catch((error)=>{
                    alert("error")
                    alert(JSON.stringify(error))
                  })
            }
        }
    }
</script>

<style>
    body {

    }
</style>
