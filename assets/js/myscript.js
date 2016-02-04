$(document).ready(function () {
    
    $('#TablesButton').hide();
    populateDatabaseLists();
    var sourceDB;
    var destDB;
    var sourceTable;
    var mode ;

    //asasaiaosnaoisnspiasnipsdfbasfoi;

    $(document).on('click', '#list li', function(event)
    {
        sourceDB = $(this).text();
        makeAjaxCallSDB(sourceDB);
    });

    $(document).on('click','#Tables li', function(){
        sourceTable = $(this).text();
    });    

    $(document).on('change','#myForm input', function() {
        mode = $('#myForm input ').val();
    });

    $(document).on('click', function(){
        destDB = $(this).text();
    });
    
    $(document).on('click','#SubButton',function(){
        makeCompleteAjax(sourceDB,sourceTable,mode,destDB);
    });

});

function populateDatabaseLists()
{
    var start_li = '<li><a>';
    var end_li   = '</a></li>';
    var output = "";
    $.ajax({
        url:'Databases.php',
        type: 'POST',
    }).done(function(data) {console.log(data)})
      .fail(function(data) {alert("error");})
      .success(function(data){
        var recievedData = JSON.parse(data);
        for(var i =0;i<recievedData.length;i++){
            if (recievedData[i] != "cdcol" && recievedData[i] != "information_schema" && recievedData[i] != "mysql" && recievedData[i] != "performance_schema" && recievedData[i] != "phpmyadmin" && recievedData[i] != "test" && recievedData[i] != "test" && recievedData[i] != "webauth")
            output += start_li+recievedData[i]+end_li;
        }

        $("#list ul").append(output);
        $("#list2 ul").append(output);
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