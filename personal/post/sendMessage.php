<?php 
$sender = $_REQUEST['sender'] ;
$message = $_REQUEST['msg'] ;
$subject = $_REQUEST['subject'];
if (!isset($sender))
	$sender = "jesus" ;
if (!isset($message))
	$message = "hello";
if (!isset($subject))
	$subject = "me";
mail("joshin85@gmail.com", $subject,"From : " . $sender . " Message : " . $message);
echo "Message Sent";
?>
