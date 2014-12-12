<?php
  $type = $_POST['type'];
  $text = $_POST['newText'];
  $dir = getcwd()."/test.html";
   
 if( $type == "write" ){
  $handle = fopen($dir, "w"); 
  
  $text = str_replace("\\\"", "\"", $text);
  $text = str_replace("\\'", "'", $text);
  $text = str_replace("\\\\", "\\", $text);
  
    for( $written = 0; $written < strlen($text); $written+= $fwrite ){
    	$fwrite = fwrite($handle, $text);
			if( $fwrite == false ){  return $written; }
	}
	
  fclose($handle);
  print("File has been successfully updated");
  
 }else if( $type == "read" ){

  if( file_exists($dir) ){
  	$handle = fopen($dir, "r");
	  if( filesize($dir) > 0 ){
		  $contents = fread($handle, filesize($dir));
  	  		print($contents);  
  		fclose($handle);
 		}else{
 		 print("Write your code here");	
		}
  }else{
  	$handle = fopen($dir, "w");
	print("Write your code here");	
  } 
  
 }else{
  print("Invalid Request");	
 }

?>