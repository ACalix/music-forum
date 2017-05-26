<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	require 'vendor/autoload.php';
	require 'config/db.php';

	$app = new \Slim\App;

	$app->get('/', function (Request $request, Response $response) {
	    $file = '../index.html';
	    if (file_exists($file)) {
	        return $response->write(file_get_contents($file));
	    } else {
	        throw new \Slim\Exception\NotFoundException($request, $response);
	    }
	});

	$app->get('/hello/{name}', function (Request $request, Response $response) {
	    $name = $request->getAttribute('name');
	    $response->getBody()->write("Hello" . $name);

	    return $response;
	});

	// User Routes
	require 'routes/users.php';
	require 'routes/boards.php';

	// Controllers
	require 'controllers/users-controller.php';
	require 'controllers/board-controller.php';

	$app->run();