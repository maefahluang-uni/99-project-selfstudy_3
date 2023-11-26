var consolealert = document.getElementById('alertsubconsole');

function justSubmitIT(FormID){
    var formid = document.getElementById(FormID);
    formid.submit();
}

consolealert.addEventListener('onsubmit', function(){
    console.log("Form submitted!");
});