<?php
	class boardCtrl{

		// Retrieves tables from the database
		public function getThreads($type){
			$sql = "SELECT UNIX_TIMESTAMP(Date), ThreadId, UserId, Title 
			FROM board WHERE Type = '$type'";

			try{
				// Get DB Object
				$db = new db();
				// Connect and retrieve thread info
				$db = $db->connect();
				$stmt = $db->query($sql);	
				$threads = $stmt->fetchAll(PDO::FETCH_ASSOC);
				$db = null;
				$usercontrol = new usersCtrl();

				for($i = 0; $i < count($threads); ++$i){
					$replaceId = $threads[$i]['UserId'];
					$threads[$i]['UserId'] = $usercontrol->getUsername($replaceId);
				}
				return json_encode($threads, JSON_NUMERIC_CHECK);
			} catch(PDOException $e){
				return array(500, $e->getMessage());
			}
		}

		// Create a new thread on a forum board
		public function makeThread($title, $userId, $type){
			$sql = "INSERT INTO board (UserId, Title, Type)
			VALUES (:user, :title, :boardName)"; 

			try {
				$db = new db();
				$db = $db->connect();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':user', $userId);
				$stmt->bindParam(':title', $title);
				$stmt->bindParam(':boardName', $type);

				$stmt->execute();
				$db = null;

				return true;
			} catch(PDOException $e){
				return array(500, $e->getMessage());
			}
		}
	}	