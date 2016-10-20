<?php
if ($_POST["text"] && $_POST["id"] && $_POST["from"]) {
	$id = $_POST["id"];
	$text = $_POST["text"];
	$from = $_POST["from"];
	$xml = simplexml_load_file("chatstore.xml");

	$time = time();

	$xpath = $xml->xpath("/chats/chat[@id=$id]")[0];
	$xpath["date"] = $xpath["date"]+1;

	$child = $xpath->addChild("text", $text);
	$child->addAttribute("from", $from);
	$child->addAttribute("date", $time);

	$xml->saveXML("chatstore.xml");
}

/**
 * Created by PhpStorm.
 * User: Jakub
 * Date: 19. 10. 2016
 * Time: 20:48
 */