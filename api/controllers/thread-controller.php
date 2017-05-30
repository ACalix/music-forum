<?php
	class threadCtrl{

		// Retrieves tables from the database
		public function getPosts($id){
			$sql = "SELECT UNIX_TIMESTAMP(PostDate), Content, user_id 
			FROM posts WHERE thread_id = '$id'";

			try{
				// Get DB Object
				$db = new db();
				// Connect and retrieve thread info
				$db = $db->connect();
				$stmt = $db->query($sql);	
				$posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
				$db = null;
				$usercontrol = new usersCtrl();

				for($i = 0; $i < count($posts); ++$i){
					$replaceId = $posts[$i]['user_id'];
					$posts[$i]['user_id'] = $usercontrol->getUsername($replaceId);
				}
				return json_encode($posts, JSON_NUMERIC_CHECK);
			} catch(PDOException $e){
				return array(500, $e->getMessage());
			}
		}

		// Create a new thread on a forum board
		public function makePost($content, $userId, $threadId){
			$sql = "INSERT INTO posts (user_id, Content, thread_id)
			VALUES (:user, :content, :threadId)"; 

			try {
				$db = new db();
				$db = $db->connect();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':user', $userId);
				$stmt->bindParam(':content', $content);
				$stmt->bindParam(':threadId', $threadId);

				$stmt->execute();
				$db = null;

				return true;
			} catch(PDOException $e){
				return array(500, $e->getMessage());
			}
		}
	}	