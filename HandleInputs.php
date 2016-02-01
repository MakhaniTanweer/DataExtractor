<?php
if(isset($_POST['source_db']) && isset($_POST['source_table']) && isset($_POST['method']) && isset($_POST['dest_db']))
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "fastiandevloper";
    $dbname = $_POST['source_db'];
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
    $quer = "DESCRIBE ".$_POST['source_table'];
    $respone = "";
    $result = $conn->query($quer);
    $num_rows_source = $result->num_rows;
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $keys = array_keys($row);
        $respone = $respone.$row[$keys[1]];
        $respone = $respone.(" ");
        
    }


    $conn1= new mysqli($dbhost, $dbuser, $dbpass, $_POST['dest_db']);
    $quer1 = "Show Tables"; 
    $result1 = $conn1->query($quer1);

}
}
else if (isset($_POST['source']))
{	
	$dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "fastiandevloper";
    $dbname = $_POST['source'];
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
    $quer = "Show Tables";
    $respone = "";
    $result = $conn->query($quer);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $keys = array_keys($row);
        $respone = $respone.$row[$keys[0]];
        $respone = $respone.(" ");
        
        }
    echo $respone;
    }
}

?>