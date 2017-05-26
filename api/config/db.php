<?php
	class db{
		// Properties
		private $dbhost = 'mysql';
		private $dbuser = 'root';
		private $dbpass = 'password';
		private $dbname = 'music_forum';

		// Connect to DB
		public function connect(){
			$mysql_connect_str = "mysql:host=$this->dbhost;dbname=$this->dbname";
			$dbConnection = new PDO($mysql_connect_str, $this->dbuser, $this->dbpass);
			$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			return $dbConnection;
		}
	}