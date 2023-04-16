SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [FaceIt].[Id_By_Email_and_Password] 
    @email VARCHAR(100),
    @pass VARCHAR(100)
AS
BEGIN
    IF EXISTS (SELECT * FROM FaceIt.Accounts WHERE user_email = @email)
    AND EXISTS (SELECT * from FaceIt.Accounts WHERE user_password=@pass)
    BEGIN
        SELECT user_id
        FROM FaceIt.Accounts
        WHERE user_email = @email;
    END
END
GO
