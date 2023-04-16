Create Table FaceIt.Accounts 
(user_id int IDENTITY (1,1) PRIMARY KEY,
user_email VARCHAR(100) NOT NULL,
user_password VARCHAR(100) NOT NULL,
privilege_level int NOT NULL,
forename VARCHAR(80),
surname VARCHAR (80)) 