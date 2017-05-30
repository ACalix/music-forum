<?php
	class usersCtrl{

		// Add a new user to DB
		public function registerUser($userid, $pw){
			$sql = "SELECT * FROM users WHERE username = '$userid'";

			// If the username is taken, return unavailable. Otherwise, push the username and password to the database.
			try{
				// Get DB Object
				$db = new db();
				// Connect
				$db = $db->connect();

				$stmt = $db->query($sql);	
				$users = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				if (empty($users)){
					return $this->pushUser($userid, $pw);
				} else {
					return '{"notify": {"success": false, "reason": "username taken"}}';
				}
			} catch(PDOException $e){
				return array(500, $e->getMessage());
			}
		}

		// Validate login with specified credentials
		public function signIn($userid, $pw){
			$sql = "SELECT password, id FROM users WHERE username = '$userid'";

			// If the username is taken, return unavailable. Otherwise, store the username and password in the database.
			try{
				// Get DB Object
				$db = new db();
				// Connect
				$db = $db->connect();

				$stmt = $db->query($sql);	
				$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
				$db = null;
				if (!empty($users)){
					if ($pw == $users[0]['password']){
						return array(
							true,
							$users[0]['id']
						);
					} else {
						return array(
							false,
							'{"notify": {"success": false, "reason": "incorrect password"}}'
						);
					}
				} else {
					return array(
						false,
						'{"notify": {"success": false, "reason": "unrecognized username"}}'
					);
				}
			} catch(PDOException $e){
				return array(500, $e->getMessage());
			}
		}
		// Push the new account credentials to the database.
		private function pushUser($userid, $pw){
			try {
				$sql = "INSERT INTO users (username, password) VALUES (:user, :pass)";
				$db = new db();
				$db = $db->connect();
				$stmt = $db->prepare($sql);

				$stmt->bindParam(':user', $userid);
				$stmt->bindParam(':pass', $pw);

				$stmt->execute();
				$db = null;

				return $this->signIn($userid, $pw);
			} catch(PDOException $e){
				return array(500, $e->getMessage());
			}
		}

		// Take as input a user id and return the corresponding username
		public function getUsername($matchId){
			$sql = "SELECT ID, username FROM users";

			try {
				$db = new db();
				$db = $db->connect();
				$stmt = $db->query($sql);
				$userId = $stmt->fetchAll(PDO::FETCH_ASSOC);
				$db = null;

				$uname = null;
				for($j = 0; $j < count($userId); ++$j){
					if (($userId[$j]['ID']) == $matchId){
						return ($userId[$j]['username']);
					}
				}
			} catch(PDOException $e){
				return array(500, $e->getMessage());
			}
		}
	}	