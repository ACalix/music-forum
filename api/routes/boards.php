<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	// Retrieve all threads in a forum board
	$app->get('/tendril/board/{name}', function (Request $req, Response $res) {
	    $thread = $req->getAttribute('name');

	    $getBoard = new boardCtrl();
	    $allThreads = $getBoard->getThreads($thread);

	    $res->getBody()->write($allThreads);
	    return $res;
	});

	// Post a new thread into a forum board
	$app->post('/tendril/board/{name}', function (Request $req, Response $res) {
		$type = $req->getAttribute('name');
		$userId = intval($req->getCookieParam('userid'));
		$title = $req->getParam('Title');
		$content = $req->getParam('Content');

		$getBoard = new boardCtrl();
		$usercontrol = new usersCtrl();
		$result = $getBoard->makeThread($title, $userId, $type, $content);
		$userId = $usercontrol->getUsername($userId);

		$message = '{"notify": {"success":'.json_encode($result[0]).',"username": '.json_encode($userId).',"thread_id": '.json_encode($result[1]).'}}';
		$res->getBody()->write($message);
		return $res;
	});