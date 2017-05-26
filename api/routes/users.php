<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	// Create a new user if it doesn't already exist.
	$app->post('/tendril/user/new', function(Request $req, Response $res){
		$user = $req->getParam('username');
		$pass = $req->getParam('password');

		$newUser = new usersCtrl();
		$result = $newUser->registerUser($user, $pass);
		if (gettype($result) == 'string'){
			echo $result;
		} else {
			$newResponse = $res->withStatus($result[0]);
			$body = $newResponse->getBody();
			$body->write(Json_encode($result[1]));
			return $newResponse;
		}
	});

	//
	$app->post('/tendril/user/login', function(Request $req, Response $res){
		$user = $req->getParam('username');
		$pass = $req->getParam('password');

		$newUser = new usersCtrl();
		$result = $newUser->signIn($user, $pass);
		if (gettype($result) == 'string'){
			echo $result;
		} else {
			$newResponse = $res->withStatus($result[0]);
			$body = $newResponse->getBody();
			$body->write(Json_encode($result[1]));
			return $newResponse;
		}
	});