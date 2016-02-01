$(document).ready(function () {
    $('#TablesButton').hide();
    var sourceDB;
    var destDB;
    var sourceTable;
    var mode = 'over';

    $('#list li').on('click', function(){
    sourceDB = $(this).text();
    makeAjaxCallSDB(sourceDB);
    });

    $('#Tables').on('click','li', function(){
    sourceTable = $(this).text();
    });    

    $('#myForm input').on('change', function() {
        mode = $('#myForm input ').val(); 
            alert(sourceDB+" "+sourceTable+" "+mode);
    });
    $('#list2 li').on('click', function(){
    destDB = $(this).text();
    });

});
	


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