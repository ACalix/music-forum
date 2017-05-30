<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	// Retrieve all threads in a forum board
	$app->get('/tendril/thread/{id}', function (Request $req, Response $res) {
	    $thread = $req->getAttribute('id');

	    $getThread = new threadCtrl();
	    $allThreads = $getThread->getPosts($thread);

	    $res->getBody()->write($allThreads);
	    return $res;
	});

	// Post a new thread into a forum board
	$app->post('/tendril/thread/{id}', function (Request $req, Response $res) {
		$threadId = $req->getAttribute('id');
		$userId = intval($req->getCookieParam('userid'));
		$content = $req->getParam('Content');

		$getThread = new threadCtrl();
		$usercontrol = new usersCtrl();
		$result = $getThread->makePost($content, $userId, $threadId);
		$userId = $usercontrol->getUsername($userId);

		$message = '{"notify": {"success":'.$result.',"username": '.json_encode($userId).'}}';
		$res->getBody()->write($message);
		return $res;
	});