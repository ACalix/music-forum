<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	// Create a new user if it doesn't already exist.
	$app->post('/tendril/user/new', function(Request $req, Response $res){
		$user = $req->getParam('username');
		$pass = $req->getParam('password');

		$newUser = new usersCtrl();
		$result = $newUser->registerUser($user, $pass);

		if(gettype($result) == 'string'){
			$res->getBody()->write($result);
			return $res;
		}

		if ($result[0]){
				$cookie = urlencode('userid').'='.
					urlencode($result[1]).'; expire=0; path=/; httponly';
				$res = $res->withAddedHeader('Set-Cookie', $cookie);
				$body = $res->getBody();
				$message = '{"notify": {"success": true}}';
				$body->write($message);
				return $res;
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
		if (gettype($result) == 'array'){
			if($result[0]){
				$cookie = urlencode('userid').'='.
					urlencode($result[1]).'; expire=0; path=/; httponly';
				$res = $res->withAddedHeader('Set-Cookie', $cookie);
				$body = $res->getBody();
				$message = '{"notify": {"success": true}}';
				$body->write($message);
				return $res;
			} else {
				echo $result[1];
			}
		} else {
			$newResponse = $res->withStatus($result[0]);
			$body = $newResponse->getBody();
			$body->write(Json_encode($result[1]));
			return $newResponse;
		}
	});

	$app->get('/tendril/user/logout', function(Request $req, Response $res){
		$cookie = urlencode('userid').'='.
			urlencode('deleted').'; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; httponly';
		$res = $res->withAddedHeader('Set-Cookie', $cookie);
		$res->getBody()->write('{"notify": {"success": true}}');
		return $res;
	});

	// Send the current state of the user (logged in or not)
	$app->get('/tendril/user', function(Request $req, Response $res){
		$state = $req->getCookieParam('userid');
		if (gettype($state) == 'string'){
			echo '{"notify": {"success": true}}';
		} else {
			echo '{"notify": {"success": false}}';
		}
	});