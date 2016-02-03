$(document).ready(function () {
    
    $('#TablesButton').hide();
    populateDatabaseLists('#list');
    populateDatabaseLists('#list2');
    var sourceDB;
    var destDB;
    var sourceTable;
    var mode ;

    $('#list li').on('click', function(){
        sourceDB = $(this).text();
        makeAjaxCallSDB(sourceDB);
    });

    $('#Tables').on('click','li', function(){
        sourceTable = $(this).text();
    });    

    $('#myForm input').on('change', function() {
        mode = $('#myForm input ').val();
    });
    
    $('#list2 li').on('click', function(){
        destDB = $(this).text();
    });
    
    $('#SubButton').on('click',function(){
        makeCompleteAjax(sourceDB,sourceTable,mode,destDB);
    });

});

function populateDatabaseLists(ids)
{
    $.ajax({
        url:'Databases.php',
        type: 'POST',
    }).done(function(data) {console.log(data)})
      .fail(function(data) {alert("error");})
      .success(function(data){
        var stringtext = "";
        alert();
        for(var i =0;i<DBs.length;i++){
            alert(data[i]);
        }
        $("#list ul").append(stringtext);
        $("#list2 ul").append(stringtext);
      })
        
}

function makeCompleteAjax(sDB,sTable,md,dDB)
{
    //Establish connection to php script
    $.ajax({
        url: 'extract.php',
        type: 'POST',
        data: {
            sourceDB    : sDB,
            sourceTable : sTable,
            mode        : md,
            destDB      : dDB
            }
    }).done(function(data) { console.log(data); })
        .fail(function() { alert("error");})
        .always(function(data)
        {
            var image;
            image = document.createElement("img");

            if (data == "Success")
            {
                image.src = "assets/img/success.png";
                alert(data);
            }
            else
            {
                image.src = "assets/img/failure.png";
                alert(data);
            }
            var src = document.getElementById("imgparent");
            src.appendChild(image);

            $('html, body').animate({
                scrollTop: $("#lastContainer").offset().top
            }, 1000);
        }
        );
}


function makeAjaxCallSDB(sourceDB)
{
	$.post("HandleInputs.php",{source : sourceDB},function(data){
        var start_li = '<li><a>'
        var end_li   = '</a></li>';
        var opts = data.split(' ');
        var stringout = "";
        for(var i= 0;i<opts.length;i++)
        {
        	stringout += start_li + opts[i] + end_li;

        }
        $("#Table ul").append(stringout);
    });
 	$('#TablesButton').show();   
}