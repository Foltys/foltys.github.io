<?php
if ($_GET["text"] && $_GET["id"] && $_GET["from"]) {
	$id = $_GET["id"];
	$text = $_GET["text"];
	$from = $_GET["from"];
	$xml = simplexml_load_file("chatstore.xml");

	$time = time();

	$xpath = $xml->xpath("/chats/chat[@id=$id]")[0];
	$xpath["date"] = $xpath["date"]++;

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