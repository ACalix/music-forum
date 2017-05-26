<?php
	class boardCtrl{
		// Properties

		// Retrieves tables from the database
		public function getThreads($type){
			$sql = "SELECT UNIX_TIMESTAMP(Date), ThreadId, UserId, Title 
			FROM board WHERE Type = '$type'";

			try{
				// Get DB Object
				$db = new db();
				// Connect
				$db = $db->connect();

				$stmt = $db->query($sql);	
				$threads = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				return json_encode($threads, JSON_NUMERIC_CHECK);
			} catch(PDOException $e){
				return array(500, $e->getMessage());
			}
		}

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

				return '{"notify": {"success": true}}';
			} catch(PDOException $e){
				return array(500, $e->getMessage());
			}
		}
	}	