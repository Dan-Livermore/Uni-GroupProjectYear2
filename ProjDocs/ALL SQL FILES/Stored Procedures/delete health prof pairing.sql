SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [FaceIt].[delete_health_prof_user]
    @prof_id int,
    @user_email nvarchar(100)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @user_id int;

    -- Obtain the user_id for the provided user_email
    SELECT @user_id = user_id FROM FaceIt.Accounts WHERE user_email = @user_email;

    -- Delete an existing record from the HealthProfUsers table with the obtained user_id and provided prof_id
    DELETE FROM FaceIt.HealthProfUsers WHERE user_id = @user_id AND prof_id = @prof_id;

END
GO
