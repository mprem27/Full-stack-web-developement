<?php
// database connection
         $db = mysqli_connect("localhost","root","","myblogs");
         if($db){
              echo "success";
         }
         else{
     die("failed".mysqli_connect_error());
    }
?>